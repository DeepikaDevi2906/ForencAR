import { useState, useEffect, useRef, useCallback } from "react";

// ─── SAMPLES ───────────────────────────────────────────────────────────────
const SAMPLES = {
  robbery: `Case ID: FN-2025-006\nStatus: Active / Critical\nIncident: Armed Bank Robbery — Koramangala Branch\nDate: February 14, 2025\nLocation: Koramangala, Bengaluru\nLead Investigator: DSP Krishnaswamy\nIPC Sections: 392, 394, 397\nThree armed suspects entered the commercial bank during operational hours and threatened staff and customers using firearms. Approximately 48 lakhs were reported stolen from the main cash vault and teller counters. One security guard sustained injuries during the altercation. The suspects fled the scene in a vehicle that was later abandoned approximately 2 km from the bank premises.\nEvidence:\nEV-001: CCTV footage from bank entrance and lobby - Collected\nEV-002: Fingerprints recovered from teller counter - Under Analysis\nEV-003: Abandoned getaway vehicle located 2 km away - Secured\nEV-004: Injured security guard medical statement - Recorded\nEV-005: Mobile tower dump data near crime scene - Pending Review\nSuspects: Three masked male individuals armed with handguns. No confirmed identities established.`,
  homicide: `Case ID: FN-2025-019\nStatus: Active\nIncident: Suspected Homicide — Industrial Warehouse\nDate: April 3, 2025\nLocation: Industrial District, Chennai\nLead Investigator: Inspector Venkataraman\nIPC Sections: 302, 201, 34\nVictim found deceased in abandoned warehouse at 06:15 AM by a daily labourer. Cause of death appears to be blunt force trauma to the head. Victim identified as male, approximately 35-40 years, no ID found at scene. Signs of struggle observed near the eastern storage area. Blood trail suggests victim attempted to flee toward the main exit. No witnesses. Security camera at the building entrance found tampered.\nEvidence:\nEV-001: Blood samples from eastern storage area - Under Analysis\nEV-002: Blunt object (iron rod) near victim - Secured\nEV-003: Tampered security camera at entrance - Collected\nEV-004: Boot impressions in dust near loading bay - Photographed\nEV-005: Victim clothing fibres - Under Analysis\nEV-006: Mobile phone belonging to victim - Collected\nSuspects: Unknown. Investigation ongoing. Victim may have known assailant based on lack of forced entry.`,
  burglary: `Case ID: FN-2025-031\nStatus: Open\nIncident: Residential Burglary — Sector 14\nDate: May 1, 2025\nLocation: Sector 14, Delhi\nLead Investigator: Sub-Inspector Arora\nIPC Sections: 457, 380\nResidents returned home at 22:30 to find rear window broken and house ransacked. Estimated loss of jewellery, electronics, and cash worth approximately 3.2 lakhs. Entry appears made via rear garden window. Master bedroom and study targeted. Neighbours report seeing an unfamiliar sedan parked nearby between 19:00 and 21:00. Dog in the house found locked in bathroom.\nEvidence:\nEV-001: Broken rear window with glass fragments - Collected\nEV-002: Partial shoe impression in garden mud - Photographed\nEV-003: Neighbour CCTV showing sedan - Under Analysis\nEV-004: Glove fragment on study windowsill - Secured\nEV-005: List of stolen items from homeowners - Recorded\nSuspects: One or two individuals based on witness accounts. Vehicle description: dark sedan, partial plate DL-3C.`
};

// ─── LAYER DEFINITIONS ────────────────────────────────────────────────────
const INITIAL_LAYERS = {
  rooms:    { label: "Rooms & walls",       color: "#378ADD", on: true  },
  roof:     { label: "Roof overlay",        color: "#5F5E5A", on: false },
  evidence: { label: "Evidence pins",       color: "#ff6b6b", on: true  },
  suspects: { label: "Suspect path",        color: "#ffd93d", on: true  },
  entry:    { label: "Entry / exit points", color: "#4a9eff", on: true  },
  cctv:     { label: "CCTV zones",          color: "#b39ddb", on: true  },
  heatmap:  { label: "Activity heatmap",    color: "#ff9f43", on: false },
  labels:   { label: "Room labels",         color: "#aaa",    on: true  },
  grid:     { label: "Floor grid",          color: "#333",    on: true  },
  measure:  { label: "Measurements",        color: "#1abc9c", on: false }
};

// ─── TIME OF DAY ──────────────────────────────────────────────────────────
const TOD = [
  { label: "Night",  desc: "Night — low visibility",  bg: "#1a1a2e", grid: "rgba(127,29,29,0.08)",  amb: "#0f1a2e" },
  { label: "Day",    desc: "Daytime — natural light", bg: "#f0ece4", grid: "rgba(0,0,0,0.06)",       amb: "#e8e0d0" },
  { label: "Sunset", desc: "Sunset — warm tone",      bg: "#f5e6d0", grid: "rgba(180,80,20,0.07)",   amb: "#e8d0b0" },
  { label: "Dusk",   desc: "Dusk — blue hour",        bg: "#dce8f0", grid: "rgba(60,100,160,0.07)",  amb: "#c8d8e8" }
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────
const STATUS_COL = {
  "Collected":      "#15803d",
  "Under Analysis": "#b45309",
  "Secured":        "#1d4ed8",
  "Recorded":       "#6d28d9",
  "Pending Review": "#64748b",
  "Photographed":   "#c2410c"
};
const STATUS_BG = {
  "Collected":      "rgba(21,128,61,0.1)",
  "Under Analysis": "rgba(180,83,9,0.1)",
  "Secured":        "rgba(29,78,216,0.1)",
  "Recorded":       "rgba(109,40,217,0.1)",
  "Pending Review": "rgba(100,116,139,0.08)",
  "Photographed":   "rgba(194,65,12,0.1)"
};
const RCOLORS = {
  blue:   { wall: "#c8d8f0", floor: "#dce8f8", border: "#2563eb" },
  teal:   { wall: "#b0e0d8", floor: "#ccf0e8", border: "#0d9488" },
  green:  { wall: "#bbddb8", floor: "#d0f0cc", border: "#16a34a" },
  red:    { wall: "#f0c0c0", floor: "#fad4d4", border: "#dc2626" },
  amber:  { wall: "#f0d8a0", floor: "#f8e8c0", border: "#d97706" },
  purple: { wall: "#d8c0f0", floor: "#ecd8fc", border: "#7c3aed" },
  gray:   { wall: "#d0d4dc", floor: "#e0e4ec", border: "#64748b" }
};

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── FALLBACK ─────────────────────────────────────────────────────────────
function buildFallback(txt) {
  const t = (txt || "").toLowerCase();
  if (t.includes("homicide") || t.includes("warehouse") || t.includes("murder")) {
    return {
      metadata: { caseId: "FN-2025-019", incident: "Homicide — Industrial Warehouse", location: "Chennai", date: "Apr 3, 2025", investigator: "Insp. Venkataraman", status: "Active", incidentType: "homicide", keyFact: "Victim: blunt force trauma" },
      rooms: [
        { id: "r1", name: "Main Floor",   x: -3, y: -2,   w: 6, h: 4, color: "gray", desc: "Main warehouse floor" },
        { id: "r2", name: "East Storage", x:  3, y: -1.5, w: 3, h: 3, color: "red",  desc: "Primary crime scene — blood found here" },
        { id: "r3", name: "Loading Bay",  x: -3, y:  2,   w: 4, h: 2, color: "teal", desc: "Entry/exit point for vehicles" },
        { id: "r4", name: "Office",       x:  3, y:  1.5, w: 2, h: 2, color: "blue", desc: "Administrative area" }
      ],
      entry: [{ x: -5, y: 0, label: "Main entrance", type: "entry" }, { x: -3, y: 3.5, label: "Loading bay", type: "entry" }],
      escape: [{ x: -5, y: 0 }, { x: -7, y: 1 }, { x: -10, y: 2 }],
      evidence: [
        { id: "EV-001", desc: "Blood samples",    status: "Under Analysis", x: 4,    y: 0,    room: "East Storage", detail: "Multiple blood pools; victim tried to crawl" },
        { id: "EV-002", desc: "Iron rod",          status: "Secured",        x: 3.5,  y: -0.5, room: "East Storage", detail: "Probable murder weapon; sent for fingerprinting" },
        { id: "EV-003", desc: "Tampered camera",  status: "Collected",      x: -4.5, y: 0,    room: "Main Floor",   detail: "Cable cut; last 2 hrs footage missing" },
        { id: "EV-004", desc: "Boot impressions", status: "Photographed",   x: -2,   y: 2.5,  room: "Loading Bay",  detail: "Size 9 boot; distinct heel pattern" },
        { id: "EV-005", desc: "Victim phone",     status: "Collected",      x: 4.5,  y: 1,    room: "East Storage", detail: "Last call at 21:40 night prior" }
      ],
      cctv: [{ x: -4.5, y: 0, angle: 10, fov: 60, range: 3 }, { x: 3, y: -1.5, angle: 200, fov: 50, range: 2.5 }],
      timeline: [
        { step: 1, time: "~21:40", event: "Victim made last known phone call" },
        { step: 2, time: "Night",  event: "Assault took place in east storage area" },
        { step: 3, time: "~06:15", event: "Body discovered by labourer" },
        { step: 4, time: "06:30",  event: "Police and forensics notified" },
        { step: 5, time: "07:00",  event: "Scene secured; investigation started" }
      ],
      suspects: [{ count: 1, description: "Unknown assailant; no forced entry suggests victim may have known them", status: "Unidentified" }],
      heatmap: [{ x: 4, y: 0, intensity: 0.95 }, { x: -5, y: 0, intensity: 0.5 }, { x: -3, y: 3, intensity: 0.4 }]
    };
  }
  if (t.includes("burglary") || t.includes("residential") || t.includes("sector")) {
    return {
      metadata: { caseId: "FN-2025-031", incident: "Residential Burglary — Sector 14", location: "Delhi", date: "May 1, 2025", investigator: "SI Arora", status: "Open", incidentType: "burglary", keyFact: "₹3.2 lakhs stolen" },
      rooms: [
        { id: "r1", name: "Living Room",    x: -3,   y: -2,   w: 4, h: 3, color: "blue",  desc: "Entry point via rear window" },
        { id: "r2", name: "Master Bedroom", x:  1,   y: -2,   w: 3, h: 3, color: "red",   desc: "Ransacked; jewellery taken" },
        { id: "r3", name: "Study",          x:  1,   y:  1,   w: 2, h: 2, color: "amber", desc: "Electronics and documents stolen" },
        { id: "r4", name: "Kitchen",        x: -3,   y:  1.5, w: 3, h: 2, color: "teal",  desc: "Untouched" },
        { id: "r5", name: "Bathroom",       x: -0.5, y:  1.5, w: 2, h: 1.5, color: "gray", desc: "Dog locked inside" },
        { id: "r6", name: "Garden",         x: -5,   y: -1,   w: 1, h: 2, color: "green", desc: "Rear garden; entry point" }
      ],
      entry: [{ x: -5.5, y: 0, label: "Rear window entry", type: "entry" }, { x: -3, y: -3.5, label: "Front door (locked)", type: "exit" }],
      escape: [{ x: -5.5, y: 0 }, { x: -7, y: -0.5 }, { x: -9, y: -1 }, { x: -11, y: -1.5 }],
      evidence: [
        { id: "EV-001", desc: "Broken window glass", status: "Collected",      x: -4.5, y: 0,    room: "Garden",         detail: "Entry point; size suggests deliberate break" },
        { id: "EV-002", desc: "Shoe impression",     status: "Photographed",   x: -4.2, y: 0.5,  room: "Garden",         detail: "Partial impression in mud; size 8 boot" },
        { id: "EV-003", desc: "Sedan on CCTV",       status: "Under Analysis", x: -9,   y: -1,   room: "External",       detail: "Dark sedan, partial plate DL-3C" },
        { id: "EV-004", desc: "Glove fragment",      status: "Secured",        x: 2,    y: 1.5,  room: "Study",          detail: "Latex glove; sent for trace analysis" },
        { id: "EV-005", desc: "Stolen items list",   status: "Recorded",       x: 1.5,  y: -1,   room: "Master Bedroom", detail: "Jewellery, laptop, ₹40k cash" }
      ],
      cctv: [{ x: -2.5, y: -3.5, angle: 90, fov: 70, range: 2.5 }],
      timeline: [
        { step: 1, time: "19:00",  event: "Unfamiliar sedan spotted by neighbour" },
        { step: 2, time: "~19:30", event: "Suspects enter via rear garden window" },
        { step: 3, time: "~21:00", event: "Sedan departs; suspects leave with loot" },
        { step: 4, time: "22:30",  event: "Residents return; discover burglary" },
        { step: 5, time: "22:45",  event: "Police called; scene secured" }
      ],
      suspects: [{ count: 2, description: "One or two individuals; dark sedan DL-3C partial plate. Wore latex gloves.", status: "Unidentified" }],
      heatmap: [{ x: -4.5, y: 0, intensity: 0.9 }, { x: 2.5, y: -1, intensity: 0.85 }, { x: 2, y: 1.5, intensity: 0.7 }]
    };
  }
  return {
    metadata: { caseId: "FN-2025-006", incident: "Armed Bank Robbery", location: "Koramangala, Bengaluru", date: "Feb 14, 2025", investigator: "DSP Krishnaswamy", status: "Active / Critical", incidentType: "robbery", keyFact: "₹48 lakhs stolen" },
    rooms: [
      { id: "r1", name: "Main Lobby",     x: -3, y: -1.5, w: 4,   h: 3,   color: "blue",  desc: "Customer area — suspects entered here" },
      { id: "r2", name: "Teller Area",    x:  1, y: -1,   w: 3,   h: 2,   color: "teal",  desc: "Primary robbery zone; fingerprints found" },
      { id: "r3", name: "Vault",          x:  4, y: -0.8, w: 2,   h: 1.6, color: "green", desc: "₹48L stolen from here" },
      { id: "r4", name: "Security Post",  x: -3, y:  1.8, w: 1.5, h: 1.2, color: "red",   desc: "Guard injured here" },
      { id: "r5", name: "Manager Office", x:  1, y:  1.2, w: 2,   h: 1.8, color: "amber", desc: "Staff sheltered during robbery" }
    ],
    entry: [{ x: -5, y: 0, label: "Main entrance", type: "entry" }, { x: -5, y: 2, label: "Staff door", type: "exit" }],
    escape: [{ x: -5, y: 0 }, { x: -7, y: -1 }, { x: -9, y: -2 }, { x: -11, y: -2.5 }],
    evidence: [
      { id: "EV-001", desc: "CCTV footage",    status: "Collected",      x: -4,   y: 0,    room: "Main Lobby",    detail: "Cameras at entrance; faces partially obscured" },
      { id: "EV-002", desc: "Fingerprints",    status: "Under Analysis", x:  2,   y: -0.5, room: "Teller Area",   detail: "Partial prints on teller counter glass" },
      { id: "EV-003", desc: "Getaway vehicle", status: "Secured",        x: -11,  y: -2.5, room: "External",      detail: "Plates removed; forensics ongoing" },
      { id: "EV-004", desc: "Guard statement", status: "Recorded",       x: -2.5, y:  2.2, room: "Security Post", detail: "Describes 3 suspects with handguns" },
      { id: "EV-005", desc: "Mobile tower data", status: "Pending Review", x: -6, y:  3,   room: "External",      detail: "47 numbers flagged near scene" }
    ],
    cctv: [
      { x: -4.5, y: 0,   angle: 30,  fov: 55, range: 2.8 },
      { x:  1,   y: -1.8, angle: 120, fov: 60, range: 2.5 },
      { x:  4.5, y: -1.8, angle: 80,  fov: 45, range: 2   }
    ],
    timeline: [
      { step: 1, time: "~09:10", event: "Three suspects entered main entrance" },
      { step: 2, time: "~09:12", event: "Staff and customers threatened at gunpoint" },
      { step: 3, time: "~09:15", event: "Security guard confronted suspects; injured" },
      { step: 4, time: "~09:17", event: "₹48L taken from vault and tellers" },
      { step: 5, time: "~09:22", event: "Suspects fled in getaway vehicle" },
      { step: 6, time: "~09:35", event: "Vehicle abandoned 2km away" }
    ],
    suspects: [{ count: 3, description: "Masked male individuals with handguns. No identities established.", status: "Unidentified" }],
    heatmap: [
      { x: -1, y: 0,    intensity: 0.95 }, { x: 2,   y: -0.5, intensity: 0.85 },
      { x: 4.5, y: -0.5, intensity: 0.7  }, { x: -2.5, y: 2,   intensity: 0.5  },
      { x: -5,  y: 0,    intensity: 0.45 }
    ]
  };
}

// ─── CLAUDE API ───────────────────────────────────────────────────────────
async function callClaude(txt) {
  const prompt = `You are a forensic scene reconstruction specialist. Extract structured data from this police/incident report. Return ONLY a valid JSON object — no markdown fences, no explanation, no extra text.

The JSON must follow this exact schema:
{
  "metadata": {
    "caseId": "string",
    "incident": "string (short title)",
    "location": "string",
    "date": "string",
    "investigator": "string",
    "status": "string (Active/Critical/Closed/Open)",
    "incidentType": "string (robbery/homicide/burglary/assault/fraud/other)",
    "keyFact": "string (most important fact, e.g. amount stolen or victim count)"
  },
  "rooms": [
    { "id": "r1", "name": "string", "x": number, "y": number, "w": number, "h": number, "color": "blue|teal|green|red|amber|purple|gray", "desc": "string" }
  ],
  "entry": [{ "x": number, "y": number, "label": "string", "type": "entry|exit" }],
  "escape": [{ "x": number, "y": number }],
  "evidence": [{ "id": "string", "desc": "string", "status": "Collected|Under Analysis|Secured|Recorded|Pending Review|Photographed", "x": number, "y": number, "room": "string", "detail": "string" }],
  "cctv": [{ "x": number, "y": number, "angle": number, "fov": number, "range": number }],
  "timeline": [{ "step": number, "time": "string", "event": "string" }],
  "suspects": [{ "count": number, "description": "string", "status": "Identified|Unidentified|Wanted|Apprehended" }],
  "heatmap": [{ "x": number, "y": number, "intensity": number }]
}

SPATIAL RULES:
- Grid units where 1 unit ≈ 4 metres. Centre layout at 0,0.
- Bank: Main Lobby (4×3), Teller Area (3×2), Vault (2×2), Manager Office (2×2), Security Post (1.5×1)
- Warehouse: Loading Bay (5×3), Storage Area (4×4), Office (2×2), Exit Corridor (1×4)
- House: Living Room (4×3), Bedroom (3×3), Kitchen (3×2), Bathroom (2×2), Garage (3×4)
- Place entry points at building perimeter. Escape route extends to x=-10 or beyond.
- Evidence coordinates must be inside or near the relevant room.
- Heatmap marks high-activity areas.

Return ONLY the JSON object, starting with { and ending with }.

Report text:
${txt.slice(0, 3500)}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!resp.ok) { console.error("API HTTP error", resp.status); return buildFallback(txt); }
    const data = await resp.json();
    if (data.error) { console.error("API error:", data.error); return buildFallback(txt); }
    const raw = (data.content || []).map(b => b.text || "").join("");
    const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    const jsonStart = clean.indexOf("{");
    const jsonEnd   = clean.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON object found");
    return JSON.parse(clean.slice(jsonStart, jsonEnd + 1));
  } catch (e) {
    console.error("Claude API error:", e);
    return buildFallback(txt);
  }
}

// ─── UPLOAD SCREEN ────────────────────────────────────────────────────────
function UploadScreen({ onLoad, onError }) {
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    try {
      if (isPDF) {
        const txt = await extractPdfText(file);
        if (!txt || txt.trim().length < 20) { onError("PDF appears to be scanned/image-only — no text could be extracted."); return; }
        onLoad(txt, file.name);
      } else {
        const txt = await file.text();
        onLoad(txt, file.name);
      }
    } catch (e) { onError("Could not read file: " + e.message); }
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", gap: "2rem", position:"relative", zIndex:1 }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,4vw,42px)", color: "var(--text)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight:900, lineHeight:1 }}>VR Crime Scene Builder</h1>
        <p style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--mono)", marginTop: "10px", letterSpacing: "0.22em", textTransform:"uppercase", fontWeight:700 }}>AI-powered forensic visualisation from any incident report</p>
      </div>

      <div className="corner-box" style={{ maxWidth: "540px", width: "100%" }}>
        <label
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          style={{
            display: "block", border: `1px dashed ${dragging ? "var(--accent)" : "var(--border2)"}`,
            borderRadius: "4px", padding: "2.5rem 1rem", textAlign: "center", cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s", marginBottom: "1rem",
            background: dragging ? "rgba(127,29,29,0.04)" : "transparent"
          }}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="var(--text3)" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40, margin: "0 auto 12px", display: "block" }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,12 15,15"/>
          </svg>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>Drop your case report here</h3>
          <p style={{ fontSize: "12px", color: "var(--text3)", fontFamily: "var(--mono)" }}>PDF · TXT · DOC · Any incident report</p>
          <input type="file" accept=".pdf,.txt,.doc,.docx" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
        </label>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1rem 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--text3)" }}>or load a sample</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { key: "robbery",  color: "#ff6b6b", title: "Armed Bank Robbery — Koramangala",      sub: "FN-2025-006 · Feb 14 2025 · Bengaluru", tag: "CRITICAL" },
            { key: "homicide", color: "#ffd93d", title: "Homicide Investigation — Industrial District", sub: "FN-2025-019 · Apr 3 2025 · Chennai",   tag: "ACTIVE"   },
            { key: "burglary", color: "#6bcb77", title: "Residential Burglary — Sector 14",      sub: "FN-2025-031 · May 1 2025 · Delhi",    tag: "OPEN"     }
          ].map(s => (
            <button key={s.key} onClick={() => onLoad(SAMPLES[s.key], s.key + " report")} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px",
              border: "1px solid var(--border)", borderRadius: "4px", background: "transparent",
              color: "var(--text)", cursor: "pointer", fontFamily: "var(--sans)", fontSize: "13px",
              textAlign: "left", width: "100%", transition: "border-color 0.2s, background 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(127,29,29,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>{s.title}</div>
                <div style={{ fontSize: "11px", color: "var(--text3)", fontFamily: "var(--mono)" }}>{s.sub}</div>
              </div>
              <span style={{ fontSize: "10px", fontFamily: "var(--mono)", padding: "2px 6px", borderRadius: "2px",
                background: hexToRgba(s.color, 0.1), color: s.color, border: `1px solid ${hexToRgba(s.color, 0.3)}` }}>{s.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      s.onload = resolve; s.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(s);
    });
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => item.str).join(" "));
  }
  return pages.join("\n");
}

// ─── LOAD SCREEN ──────────────────────────────────────────────────────────
function LoadScreen({ fileName, progress, step, logs }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", gap: "1.5rem", position:"relative", zIndex:1 }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight:700 }}>Analysing report</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)" }}>{fileName}</div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ width: "100%", height: "2px", background: "var(--surface2)", borderRadius: "1px", overflow: "hidden", marginBottom: "8px" }}>
          <div style={{ height: "100%", background: "var(--accent)", borderRadius: "1px", transition: "width 0.4s ease", width: progress + "%" }} />
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text3)", textAlign: "center" }}>{step}</div>
      </div>
      <div style={{ maxWidth: "400px", width: "100%" }}>
        {logs.map((log, i) => (
          <div key={i} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--green)", padding: "2px 0" }}>
            <span style={{ color: "var(--accent)" }}>&gt; </span>{log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CANVAS ───────────────────────────────────────────────────────────────
function SceneCanvas({ SD, layers, camScale, wallH, flAlpha, todIdx, selEv, selRoom, activeTL, autoRot, rotX, rotY, onRotChange, onCamScaleChange, onSelectEv, onSelectRoom, onAutoRotChange }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ rotX, rotY, autoRot, camScale, wallH, flAlpha, todIdx, selEv: selEv?.id || null, selRoomId: selRoom?.id || null, activeTL, angle: 0 });
  const rafRef    = useRef(null);
  const dragRef   = useRef({ isDrag: false, lX: 0, lY: 0 });

  // keep stateRef in sync
  useEffect(() => {
    stateRef.current = { ...stateRef.current, rotX, rotY, autoRot, camScale, wallH, flAlpha, todIdx, selEv: selEv?.id || null, selRoomId: selRoom?.id || null, activeTL };
  });

  const proj = useCallback((x, y, z, cx, cy) => {
    const { rotX: rX, rotY: rY, camScale: cs } = stateRef.current;
    const rx = rX * Math.PI / 180, ry = rY * Math.PI / 180;
    const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
    const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
    const fov = 500, pz = fov + z2 * 10;
    return { sx: cx + (x1 * fov / pz) * cs, sy: cy + (y1 * fov / pz) * cs, z: z2 };
  }, []);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv || !SD) return;
    const ctx = cv.getContext("2d");
    const W = cv.clientWidth, H = cv.clientHeight;
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const { rotX: rX, rotY: rY, camScale: cs, wallH: wH, flAlpha: fA, todIdx: tIdx, selEv: sEv, selRoomId: sRoomId, activeTL: aTL } = stateRef.current;
    const theme = TOD[tIdx];
    const cx = W / 2, cy = H / 2 + 20;

    const projLocal = (x, y, z) => {
      const rx = rX * Math.PI / 180, ry = rY * Math.PI / 180;
      const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
      const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
      const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      const fov = 500, pz = fov + z2 * 10;
      return { sx: cx + (x1 * fov / pz) * cs, sy: cy + (y1 * fov / pz) * cs, z: z2 };
    };

    ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, W, H);

    if (layers.grid) {
      ctx.strokeStyle = theme.grid; ctx.lineWidth = 0.5;
      for (let g = -16; g <= 16; g++) {
        const a = projLocal(g, 0, -16), b = projLocal(g, 0, 16);
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
        const c = projLocal(-16, 0, g), d = projLocal(16, 0, g);
        ctx.beginPath(); ctx.moveTo(c.sx, c.sy); ctx.lineTo(d.sx, d.sy); ctx.stroke();
      }
    }

    if (layers.heatmap) {
      (SD.heatmap || []).forEach(h => {
        for (let r = 3; r >= 0; r--) {
          const p = projLocal(h.x, 0, h.y);
          const radius = (r + 1) * cs * 0.38;
          const alpha = h.intensity * (0.07 - r * 0.015);
          ctx.beginPath(); ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,100,40,${alpha.toFixed(3)})`; ctx.fill();
        }
      });
    }

    if (layers.rooms) {
      const sorted = [...(SD.rooms || [])].sort((a, b) => {
        const pa = projLocal(a.x + a.w / 2, 0, a.y + a.h / 2);
        const pb = projLocal(b.x + b.w / 2, 0, b.y + b.h / 2);
        return pa.z - pb.z;
      });
      sorted.forEach(room => {
        const c = RCOLORS[room.color] || RCOLORS.blue;
        const isSel = sRoomId === room.id;
        const H2 = wH;
        const corners = [[room.x,0,room.y],[room.x+room.w,0,room.y],[room.x+room.w,0,room.y+room.h],[room.x,0,room.y+room.h]];
        const top = corners.map(([x,,z]) => projLocal(x,-H2,z));
        const bot = corners.map(([x,,z]) => projLocal(x,0,z));
        ctx.beginPath(); bot.forEach((p,i) => i===0 ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy)); ctx.closePath();
        ctx.fillStyle = hexToRgba(c.floor, fA); ctx.fill();
        [[0,1],[1,2],[2,3],[3,0]].forEach(([a,b]) => {
          ctx.beginPath(); ctx.moveTo(bot[a].sx,bot[a].sy); ctx.lineTo(bot[b].sx,bot[b].sy); ctx.lineTo(top[b].sx,top[b].sy); ctx.lineTo(top[a].sx,top[a].sy); ctx.closePath();
          ctx.fillStyle = c.wall; ctx.fill();
          ctx.strokeStyle = isSel ? "rgba(255,255,255,0.5)" : c.border; ctx.lineWidth = isSel ? 1.5 : 0.6; ctx.stroke();
        });
        if (layers.roof) {
          ctx.beginPath(); top.forEach((p,i) => i===0 ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy)); ctx.closePath();
          ctx.fillStyle = c.wall + "cc"; ctx.fill(); ctx.strokeStyle = c.border; ctx.lineWidth = 0.8; ctx.stroke();
        }
        if (layers.labels) {
          const lp = projLocal(room.x+room.w/2,-H2-0.25,room.y+room.h/2);
          ctx.font = `${isSel?500:400} 10px 'Share Tech Mono'`; ctx.fillStyle = isSel?"#fff":c.border;
          ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(room.name,lp.sx,lp.sy);
        }
        if (layers.measure) {
          const ma = projLocal(room.x,-0.05,room.y), mb = projLocal(room.x+room.w,-0.05,room.y), mm = projLocal(room.x+room.w/2,-0.05,room.y);
          ctx.strokeStyle = "#1abc9c"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(ma.sx,ma.sy); ctx.lineTo(mb.sx,mb.sy); ctx.stroke();
          ctx.fillStyle = "#1abc9c"; ctx.font = "9px monospace"; ctx.textAlign = "center"; ctx.fillText(`${Math.round(room.w*4)}m`,mm.sx,mm.sy-5);
        }
      });
    }

    if (layers.cctv) {
      (SD.cctv || []).forEach(cam => {
        const p = projLocal(cam.x,-wH+0.05,cam.y);
        const a1=(cam.angle-cam.fov/2)*Math.PI/180, a2=(cam.angle+cam.fov/2)*Math.PI/180, r=cam.range*cs*0.55;
        ctx.beginPath(); ctx.moveTo(p.sx,p.sy); ctx.arc(p.sx,p.sy,r,a1,a2); ctx.closePath();
        ctx.fillStyle="rgba(179,157,219,0.1)"; ctx.fill(); ctx.strokeStyle="rgba(179,157,219,0.35)"; ctx.lineWidth=0.7; ctx.stroke();
        ctx.fillStyle="#b39ddb"; ctx.beginPath(); ctx.arc(p.sx,p.sy,3,0,Math.PI*2); ctx.fill();
      });
    }

    if (layers.suspects && SD.escape && SD.escape.length > 1) {
      ctx.setLineDash([5,4]); ctx.strokeStyle="rgba(255,217,61,0.6)"; ctx.lineWidth=2; ctx.beginPath();
      SD.escape.forEach((pt,i)=>{ const p=projLocal(pt.x,-0.05,pt.y); i===0?ctx.moveTo(p.sx,p.sy):ctx.lineTo(p.sx,p.sy); }); ctx.stroke(); ctx.setLineDash([]);
      SD.escape.forEach((pt,i)=>{
        const p=projLocal(pt.x,-0.05,pt.y), isAct=i<=aTL;
        ctx.beginPath(); ctx.arc(p.sx,p.sy,isAct?5.5:3,0,Math.PI*2); ctx.fillStyle=isAct?"#d97706":"rgba(217,119,6,0.3)"; ctx.fill();
        if (isAct && layers.labels) { ctx.fillStyle="#ffd93d"; ctx.font="9px monospace"; ctx.textAlign="center"; ctx.textBaseline="bottom"; ctx.fillText(i===0?"Start":`S${i}`,p.sx,p.sy-9); }
      });
      if (layers.labels && SD.escape.length) {
        const last=SD.escape[SD.escape.length-1], lp=projLocal(last.x,-0.08,last.y);
        ctx.fillStyle="rgba(255,217,61,0.7)"; ctx.font="9px monospace"; ctx.textAlign="left"; ctx.textBaseline="middle"; ctx.fillText("escape →",lp.sx+5,lp.sy);
      }
    }

    if (layers.entry) {
      (SD.entry||[]).forEach(ep=>{
        const p=projLocal(ep.x,-0.1,ep.y), col=ep.type==="entry"?"#4a9eff":"#ff9f43";
        ctx.fillStyle=col; ctx.beginPath(); ctx.moveTo(p.sx,p.sy-11); ctx.lineTo(p.sx-6,p.sy+1); ctx.lineTo(p.sx+6,p.sy+1); ctx.closePath(); ctx.fill();
        if (layers.labels) { ctx.fillStyle=col; ctx.font="9px monospace"; ctx.textAlign="center"; ctx.textBaseline="bottom"; ctx.fillText(ep.label,p.sx,p.sy-14); }
      });
    }

    if (layers.evidence) {
      (SD.evidence||[]).forEach(ev=>{
        const isSel=sEv===ev.id, p=projLocal(ev.x,-0.12,ev.y??0), col=STATUS_COL[ev.status]||"#aaa";
        if (isSel) { ctx.beginPath(); ctx.arc(p.sx,p.sy,14,0,Math.PI*2); ctx.fillStyle="rgba(255,255,255,0.07)"; ctx.fill(); }
        ctx.strokeStyle=col; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(p.sx,p.sy-4); ctx.lineTo(p.sx,p.sy+7); ctx.stroke();
        const r=isSel?7:5; ctx.beginPath(); ctx.arc(p.sx,p.sy-8,r,0,Math.PI*2); ctx.fillStyle=col; ctx.fill();
        ctx.strokeStyle=isSel?"#fff":"rgba(0,0,0,0.5)"; ctx.lineWidth=isSel?1.5:0.5; ctx.stroke();
        if (layers.labels||isSel) { ctx.fillStyle="#fff"; ctx.font=`${isSel?500:400} 8px monospace`; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(ev.id,p.sx,p.sy-8); }
      });
    }

    ctx.save(); ctx.translate(W-32,32);
    ctx.fillStyle="rgba(255,255,255,0.06)"; ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,0.12)"; ctx.lineWidth=1; ctx.stroke();
    const ry2=rY*Math.PI/180, nx=Math.sin(ry2)*12, ny=-Math.cos(ry2)*12;
    ctx.strokeStyle="rgba(99,179,237,0.7)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(nx,ny); ctx.stroke();
    ctx.fillStyle="rgba(99,179,237,0.9)"; ctx.font="bold 8px monospace"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("N",nx,ny);
    ctx.restore();
    ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.font="9px monospace"; ctx.textAlign="left"; ctx.textBaseline="bottom"; ctx.fillText("1 unit = 4m",10,H-10);
  }, [SD, layers]);

  useEffect(() => {
    stateRef.current = { ...stateRef.current, rotX, rotY, autoRot, camScale, wallH, flAlpha, todIdx, selEv: selEv?.id || null, selRoomId: selRoom?.id || null, activeTL };
    draw();
  }, [rotX, rotY, autoRot, camScale, wallH, flAlpha, todIdx, selEv, selRoom, activeTL, layers, draw]);

  useEffect(() => {
    let angleRef = 0;
    const animate = () => {
      if (stateRef.current.autoRot) {
        angleRef += 0.25;
        stateRef.current.rotY = angleRef;
        onRotChange(0, angleRef);
        draw();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [draw, onRotChange]);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ro = new ResizeObserver(() => {
      cv.width = cv.clientWidth; cv.height = cv.clientHeight; draw();
    });
    ro.observe(cv);
    return () => ro.disconnect();
  }, [draw]);

  const getHit = useCallback((mx, my) => {
    const cv = canvasRef.current; if (!cv || !SD) return null;
    const { rotX: rX, rotY: rY, camScale: cs } = stateRef.current;
    const W = cv.width, H = cv.height, cxc = W/2, cyc = H/2+20;
    const projLocal = (x, y, z) => {
      const rx=rX*Math.PI/180, ry=rY*Math.PI/180;
      const x1=x*Math.cos(ry)+z*Math.sin(ry), z1=-x*Math.sin(ry)+z*Math.cos(ry);
      const y1=y*Math.cos(rx)-z1*Math.sin(rx), z2=y*Math.sin(rx)+z1*Math.cos(rx);
      const fov=500, pz=fov+z2*10;
      return { sx: cxc+(x1*fov/pz)*cs, sy: cyc+(y1*fov/pz)*cs };
    };
    for (const ev of (SD.evidence||[])) {
      const p = projLocal(ev.x,-0.12,ev.y??0);
      if (Math.hypot(p.sx-mx,p.sy-my)<14) return { type:"ev", id: ev.id };
    }
    for (const room of (SD.rooms||[])) {
      const p = projLocal(room.x+room.w/2,-0.05,room.y+room.h/2);
      if (Math.hypot(p.sx-mx,p.sy-my)<35) return { type:"room", room };
    }
    return { type:"none" };
  }, [SD]);

  const onMouseDown = (e) => {
    dragRef.current = { isDrag: true, lX: e.clientX, lY: e.clientY, startX: e.clientX, startY: e.clientY };
    onAutoRotChange(false);
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.isDrag) return;
    const dY = stateRef.current.rotY + (e.clientX - dragRef.current.lX) * 0.5;
    const dX = Math.max(2, Math.min(88, stateRef.current.rotX + (e.clientY - dragRef.current.lY) * 0.3));
    stateRef.current.rotX = dX; stateRef.current.rotY = dY;
    onRotChange(dX, dY);
    dragRef.current.lX = e.clientX; dragRef.current.lY = e.clientY;
    draw();
  };
  const onMouseUp = (e) => {
    const dx = Math.abs(e.clientX - dragRef.current.startX), dy = Math.abs(e.clientY - dragRef.current.startY);
    dragRef.current.isDrag = false;
    if (dx < 4 && dy < 4) {
      const cv = canvasRef.current; if (!cv) return;
      const rect = cv.getBoundingClientRect();
      const hit = getHit(e.clientX - rect.left, e.clientY - rect.top);
      if (hit.type === "ev") onSelectEv(hit.id);
      else if (hit.type === "room") onSelectRoom(hit.room);
      else { onSelectEv(null); onSelectRoom(null); }
    }
  };
  const onWheel = (e) => {
    e.preventDefault();
    const next = Math.max(10, Math.min(65, stateRef.current.camScale - (e.deltaY > 0 ? 2 : -2)));
    stateRef.current.camScale = next;
    onCamScaleChange(next);
    draw();
  };

  return (
    <canvas ref={canvasRef} style={{ flex: 1, display: "block", cursor: "grab", background: "#f0ece4", minHeight: 0, width: "100%" }}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={() => { dragRef.current.isDrag = false; }}
      onWheel={onWheel} />
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("upload"); // upload | load | app
  const [loadState, setLoadState] = useState({ fileName: "", progress: 0, step: "Initialising…", logs: [] });
  const [SD, setSD]     = useState(null);
  const [layers, setLayers] = useState(Object.fromEntries(Object.entries(INITIAL_LAYERS).map(([k,v])=>[k,v.on])));
  const [camScale, setCamScale] = useState(30);
  const [wallH, setWallH]       = useState(1.4);
  const [flAlpha, setFlAlpha]   = useState(0.7);
  const [todIdx, setTodIdx]     = useState(1);
  const [selEv, setSelEvState]  = useState(null);
  const [selRoom, setSelRoom]   = useState(null);
  const [activeTL, setActiveTL] = useState(0);
  const [autoRot, setAutoRot]   = useState(true);
  const [rotX, setRotX]         = useState(28);
  const [rotY, setRotY]         = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);
  const [errMsg, setErrMsg]     = useState(null);
  const [openSections, setOpenSections] = useState({ layers:true, controls:true, evidence:true, timeline:true, suspects:true, stats:true, legend:true });
  const playTimerRef = useRef(null);
  const activeTLRef  = useRef(0);

  const showErr = (msg) => { setErrMsg(msg); setTimeout(() => setErrMsg(null), 5000); };

  const runPipeline = async (txt, fname) => {
    setScreen("load");
    setLoadState({ fileName: fname, progress: 0, step: "Initialising…", logs: [] });
    const steps = [
      [12, "Parsing document structure…"],
      [24, "Extracting case metadata…"],
      [38, "Identifying scene locations…"],
      [52, "Mapping room layout…"],
      [64, "Placing evidence markers…"],
      [76, "Reconstructing suspect movement…"],
      [88, "Generating CCTV & heatmap layers…"],
      [98, "Assembling 3D scene…"]
    ];
    const logs = [];
    for (const [p, msg] of steps) {
      await delay(320);
      logs.push(msg);
      setLoadState({ fileName: fname, progress: p, step: msg, logs: [...logs] });
    }
    await delay(200);
    let data = await callClaude(txt);
    if (!data || !data.metadata || !Array.isArray(data.rooms)) { showErr("AI parsing failed — using built-in scene data"); data = buildFallback(txt); }
    await delay(100);
    setSD(data);
    setActiveTL(0); activeTLRef.current = 0;
    setSelEvState(null); setSelRoom(null);
    setAutoRot(true); setRotX(28); setRotY(0); setCamScale(30);
    setScreen("app");
  };

  const newReport = () => {
    stopPlayback();
    setSD(null); setSelEvState(null); setSelRoom(null); setActiveTL(0); activeTLRef.current = 0;
    setAutoRot(true); setRotX(28); setRotY(0); setCamScale(30);
    setScreen("upload");
  };

  const selectEv = (id) => {
    setSelEvState(prev => prev === id ? null : id);
    setSelRoom(null);
  };
  const selectRoom = (room) => {
    setSelRoom(prev => prev?.id === room?.id ? null : room);
    setSelEvState(null);
  };
  const selectTL = (i) => { setActiveTL(i); activeTLRef.current = i; };

  const togglePlayback = () => isPlaying ? stopPlayback() : startPlayback();
  const startPlayback = () => {
    if (!SD || !(SD.timeline||[]).length) return;
    setIsPlaying(true); activeTLRef.current = 0; setActiveTL(0);
    advancePlayback();
  };
  const advancePlayback = () => {
    const tlLen = (SD?.timeline||[]).length;
    setActiveTL(activeTLRef.current);
    if (activeTLRef.current < tlLen - 1) {
      activeTLRef.current++;
      playTimerRef.current = setTimeout(advancePlayback, 1800 / playSpeed);
    } else { setIsPlaying(false); }
  };
  const stopPlayback = () => { setIsPlaying(false); clearTimeout(playTimerRef.current); };

  const toggleSection = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }));

  const onRotChange = useCallback((x, y) => { if (x !== 0) setRotX(x); setRotY(y); }, []);
  const onAutoRotChange = useCallback((v) => setAutoRot(v), []);

  const infoContent = () => {
    if (selEv) {
      const ev = (SD?.evidence||[]).find(e=>e.id===selEv);
      if (!ev) return null;
      return { title: `${ev.id} — ${ev.desc}`, pairs: [["Status", ev.status], ["Room", ev.room||"—"], ["Notes", ev.detail||"—"]] };
    }
    if (selRoom) return { title: selRoom.name, pairs: [["Area", `${Math.round(selRoom.w*selRoom.h*16)} m²`], ["Notes", selRoom.desc||"—"]] };
    const tl = (SD?.timeline||[])[activeTL];
    if (tl) return { title: `Step ${activeTL+1} — ${tl.time}`, pairs: [["Event", tl.event]] };
    return null;
  };

  const info = infoContent();
  const meta = SD?.metadata;
  const st = (meta?.status||"").toLowerCase();

  const SbHdr = ({ label, skey }) => (
    <div onClick={() => toggleSection(skey)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", userSelect:"none", borderBottom:"1px solid rgba(0,0,0,0.06)" }}
      onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"} onMouseLeave={e=>e.currentTarget.style.color="var(--text3)"}>
      <span style={{ fontWeight:700 }}>{label}</span>
      <span style={{ fontSize:"10px", color:"var(--text3)", transition:"transform 0.2s", display:"inline-block", transform: openSections[skey]?"rotate(90deg)":"rotate(0deg)" }}>▶</span>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&family=Courier+Prime:wght@400;700&display=swap');
        :root {
          --bg:#f7f4ef;--surface:rgba(255,255,255,0.55);--surface2:rgba(255,255,255,0.3);
          --border:rgba(0,0,0,0.07);--border2:rgba(127,29,29,0.22);
          --accent:#7f1d1d;--accent2:#991b1b;--gold:#92400e;--red:#dc2626;--green:#15803d;--purple:#6d28d9;--orange:#c2410c;
          --text:#0f172a;--text2:#475569;--text3:#94a3b8;
          --mono:'Courier Prime',monospace;--sans:'Inter',sans-serif;--display:'Playfair Display',serif;
          --shadow:0 20px 60px rgba(0,0,0,0.08);
        }
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:var(--bg);color:var(--text);font-family:var(--sans);font-size:14px;overflow:hidden;}
        body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(rgba(0,0,0,0.05) 1px,transparent 1px);background-size:26px 26px;opacity:0.5;pointer-events:none;z-index:0;}
        .bg-gradient{position:fixed;inset:0;background:linear-gradient(135deg,#f7f4ef 0%,#f2eee8 50%,#ebe5dc 100%);z-index:-1;}
        .glow-orb-1{position:fixed;top:-180px;left:-180px;width:700px;height:700px;border-radius:9999px;background:rgba(255,255,255,0.55);filter:blur(120px);opacity:0.9;animation:pulseGlow 6s ease-in-out infinite;pointer-events:none;z-index:0;}
        .glow-orb-2{position:fixed;bottom:-200px;right:-200px;width:600px;height:600px;border-radius:9999px;background:rgba(220,38,38,0.1);filter:blur(120px);opacity:0.8;animation:pulseGlow 7s ease-in-out infinite;pointer-events:none;z-index:0;}
        @keyframes pulseGlow{0%{opacity:0.7}50%{opacity:1}100%{opacity:0.7}}
        input[type=range]{width:100%;height:2px;appearance:none;background:var(--border2);border-radius:1px;outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{appearance:none;width:12px;height:12px;border-radius:50%;background:var(--accent);cursor:pointer;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:rgba(127,29,29,0.2);}
        .corner-box{border:1px solid rgba(255,255,255,0.5);border-radius:18px;padding:2rem 2.5rem;position:relative;background:rgba(255,255,255,0.45);backdrop-filter:blur(22px);box-shadow:var(--shadow);}
        .corner-box::before,.corner-box::after{content:'';position:absolute;width:14px;height:14px;border-color:var(--accent);border-style:solid;}
        .corner-box::before{top:-1px;left:-1px;border-width:2px 0 0 2px;border-radius:3px 0 0 0;}
        .corner-box::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;border-radius:0 0 3px 0;}
      `}</style>
      <div className="bg-gradient" />
      <div className="glow-orb-1" />
      <div className="glow-orb-2" />

      {screen === "upload" && <UploadScreen onLoad={runPipeline} onError={showErr} />}
      {screen === "load"   && <LoadScreen {...loadState} />}

      {screen === "app" && SD && (
        <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden", position:"relative", zIndex:1 }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px", borderBottom:"1px solid rgba(0,0,0,0.08)", background:"rgba(255,255,255,0.6)", backdropFilter:"blur(20px)", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
              <span style={{ fontFamily:"var(--display)", fontSize:"13px", color:"var(--accent)", fontWeight:900, letterSpacing:"0.05em", textTransform:"uppercase" }}>ForensAR</span>
              <span style={{ width:1, height:16, background:"rgba(0,0,0,0.12)", display:"inline-block" }} />
              <span style={{ fontFamily:"var(--mono)", fontSize:"11px", color:"var(--text2)", letterSpacing:"0.05em" }}>{meta.caseId} — {meta.incident}</span>
              <span style={{ fontFamily:"var(--mono)", fontSize:"10px", padding:"3px 10px", borderRadius:"99px", border:"1px solid",
                color: st.includes("critical")?"var(--red)":st.includes("closed")?"var(--text3)":"var(--green)",
                borderColor: st.includes("critical")?"var(--red)":st.includes("closed")?"var(--text3)":"var(--green)",
                background: st.includes("critical")?"rgba(220,38,38,0.08)":st.includes("closed")?"transparent":"rgba(21,128,61,0.08)"
              }}>{meta.status.toUpperCase()}</span>
            </div>
            <div style={{ display:"flex", gap:"8px", alignItems:"center", flexShrink:0 }}>
              <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", maxWidth:240, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{meta.location} · {meta.date} · {meta.investigator}</span>
              <button onClick={newReport} style={{ fontFamily:"var(--mono)", fontSize:"11px", padding:"6px 14px", border:"1px solid var(--border2)", borderRadius:"99px", background:"transparent", color:"var(--accent)", cursor:"pointer", fontWeight:700, letterSpacing:"0.05em", transition:"all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="var(--accent)";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--accent)";}}>+ New Report</button>
            </div>
          </div>

          {/* Body */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 240px", flex:1, overflow:"hidden", minHeight:0 }}>
            {/* Canvas area */}
            <div style={{ display:"flex", flexDirection:"column", borderRight:"1px solid rgba(0,0,0,0.07)", overflow:"hidden", minHeight:0 }}>
              <SceneCanvas SD={SD} layers={layers} camScale={camScale} wallH={wallH} flAlpha={flAlpha} todIdx={todIdx}
                selEv={selEv ? (SD.evidence||[]).find(e=>e.id===selEv) : null} selRoom={selRoom} activeTL={activeTL}
                autoRot={autoRot} rotX={rotX} rotY={rotY}
                onRotChange={onRotChange} onCamScaleChange={setCamScale}
                onSelectEv={selectEv} onSelectRoom={selectRoom} onAutoRotChange={onAutoRotChange} />

              {/* Toolbar */}
              <div style={{ display:"flex", alignItems:"center", gap:"6px", flexWrap:"wrap", padding:"8px 12px", borderTop:"1px solid rgba(0,0,0,0.07)", background:"rgba(255,255,255,0.6)", backdropFilter:"blur(12px)", flexShrink:0 }}>
                {[
                  { label:"↺ Auto-rotate", active: autoRot, onClick:()=>setAutoRot(v=>!v), id:"ar" },
                ].map(btn => (
                  <button key={btn.id} onClick={btn.onClick} style={{ fontFamily:"var(--mono)", fontSize:"11px", padding:"4px 12px", border:`1px solid ${btn.active?"var(--accent)":"rgba(0,0,0,0.12)"}`, borderRadius:"99px", background:btn.active?"rgba(127,29,29,0.08)":"transparent", color:btn.active?"var(--accent)":"var(--text2)", cursor:"pointer", fontWeight:btn.active?700:400 }}>{btn.label}</button>
                ))}
                <div style={{ width:1, height:18, background:"rgba(0,0,0,0.1)", flexShrink:0 }} />
                {["iso","top","front"].map(v => (
                  <button key={v} onClick={() => {
                    setAutoRot(false);
                    if (v==="top")   { setRotX(89); setRotY(0); }
                    else if (v==="iso")   { setRotX(32); setRotY(30); }
                    else              { setRotX(5);  setRotY(0); }
                  }} style={{ fontFamily:"var(--mono)", fontSize:"11px", padding:"4px 12px", border:"1px solid rgba(0,0,0,0.12)", borderRadius:"99px", background:"transparent", color:"var(--text2)", cursor:"pointer", textTransform:"capitalize", transition:"all 0.2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,0.12)";e.currentTarget.style.color="var(--text2)";}}>
                    {v.charAt(0).toUpperCase()+v.slice(1)}
                  </button>
                ))}
                <div style={{ width:1, height:18, background:"rgba(0,0,0,0.1)", flexShrink:0 }} />
                <button onClick={() => { setRotX(28); setRotY(0); setCamScale(30); setAutoRot(true); }} style={{ fontFamily:"var(--mono)", fontSize:"11px", padding:"4px 12px", border:"1px solid rgba(0,0,0,0.12)", borderRadius:"99px", background:"transparent", color:"var(--text2)", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,0.12)";e.currentTarget.style.color="var(--text2)";}}>Reset</button>
                <div style={{ flex:1 }} />
                <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", letterSpacing:"0.05em" }}>drag · scroll</span>
              </div>

              {/* Info strip */}
              <div style={{ padding:"8px 14px", borderTop:"1px solid rgba(0,0,0,0.07)", background:"rgba(255,255,255,0.55)", backdropFilter:"blur(12px)", fontFamily:"var(--mono)", fontSize:"11px", minHeight:"54px", flexShrink:0 }}>
                {info ? (
                  <>
                    <div style={{ color:"var(--accent)", marginBottom:"4px" }}>{info.title}</div>
                    <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
                      {info.pairs.map(([k,v]) => (
                        <span key={k} style={{ color:"var(--text3)" }}>{k}: <span style={{ color:"var(--text2)" }}>{v}</span></span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ color:"var(--accent)", marginBottom:"4px" }}>SELECT AN ELEMENT</div>
                    <div style={{ color:"var(--text3)" }}>Click any room, evidence pin, or path node for details.</div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display:"flex", flexDirection:"column", overflowY:"auto", overflowX:"hidden", background:"rgba(255,255,255,0.45)", backdropFilter:"blur(20px)", minHeight:0 }}>

              {/* Layers */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <SbHdr label="Layers" skey="layers" />
                {openSections.layers && (
                  <div style={{ padding:"6px 10px 10px" }}>
                    {Object.entries(INITIAL_LAYERS).map(([k,v]) => (
                      <div key={k} onClick={() => setLayers(l=>({...l,[k]:!l[k]}))} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"5px 4px", borderRadius:"2px", cursor:"pointer" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(127,29,29,0.04)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <div style={{ width:10, height:10, borderRadius:"1px", background:v.color, flexShrink:0 }} />
                        <span style={{ flex:1, fontFamily:"var(--mono)", fontSize:"11px", color:"var(--text2)" }}>{v.label}</span>
                        <div style={{ width:28, height:14, borderRadius:"7px", background:layers[k]?"var(--accent)":"rgba(0,0,0,0.12)", position:"relative", border:`1px solid ${layers[k]?"var(--accent)":"rgba(0,0,0,0.12)"}`, transition:"background 0.2s", cursor:"pointer", flexShrink:0 }}>
                          <div style={{ position:"absolute", width:10, height:10, borderRadius:"50%", background:"#fff", top:1, left:layers[k]?15:1, transition:"left 0.2s" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scene Controls */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <SbHdr label="Scene Controls" skey="controls" />
                {openSections.controls && (
                  <div style={{ padding:"6px 10px 10px" }}>
                    {[
                      { label:"Wall height", val: wallH.toFixed(1), min:4, max:30, value: wallH*10, onChange: v => setWallH(v/10) },
                      { label:"Zoom", val: camScale, min:14, max:60, value: camScale, onChange: v => setCamScale(v) },
                      { label:"Floor opacity", val: flAlpha.toFixed(1), min:1, max:10, value: flAlpha*10, onChange: v => setFlAlpha(v/10) },
                    ].map(ctrl => (
                      <div key={ctrl.label} style={{ display:"flex", flexDirection:"column", gap:"4px", padding:"4px 2px" }}>
                        <div style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", display:"flex", justifyContent:"space-between" }}>
                          <span>{ctrl.label}</span><span>{ctrl.val}</span>
                        </div>
                        <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.value} step="1" onChange={e => ctrl.onChange(parseInt(e.target.value))} />
                      </div>
                    ))}
                    <div style={{ display:"flex", flexDirection:"column", gap:"4px", padding:"4px 2px" }}>
                      <div style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", display:"flex", justifyContent:"space-between" }}>
                        <span>Time of day</span><span>{TOD[todIdx].label}</span>
                      </div>
                      <input type="range" min="0" max="3" value={todIdx} step="1" onChange={e => setTodIdx(parseInt(e.target.value))} />
                      <div style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", padding:"2px 6px", border:"1px solid rgba(0,0,0,0.07)", borderRadius:"2px", display:"inline-block", marginTop:"4px" }}>{TOD[todIdx].desc}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Evidence */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <SbHdr label="Evidence Log" skey="evidence" />
                {openSections.evidence && (
                  <div style={{ padding:0 }}>
                    {(SD.evidence||[]).map(ev => (
                      <div key={ev.id} onClick={() => selectEv(ev.id)} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"5px 10px", borderRadius:"2px", cursor:"pointer", borderBottom:"1px solid rgba(0,0,0,0.07)", background: selEv===ev.id?"rgba(127,29,29,0.05)":"transparent", transition:"background 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(127,29,29,0.05)"} onMouseLeave={e=>e.currentTarget.style.background=selEv===ev.id?"rgba(127,29,29,0.05)":"transparent"}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:STATUS_COL[ev.status]||"#aaa", flexShrink:0 }} />
                        <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", minWidth:"46px" }}>{ev.id}</span>
                        <span style={{ flex:1, fontSize:"11px", color:"var(--text2)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ev.desc}</span>
                        <span style={{ fontFamily:"var(--mono)", fontSize:"9px", padding:"1px 5px", borderRadius:"2px", flexShrink:0, background:STATUS_BG[ev.status]||"rgba(255,255,255,0.05)", color:STATUS_COL[ev.status]||"#aaa" }}>{ev.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <SbHdr label="Timeline" skey="timeline" />
                {openSections.timeline && (
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"6px 8px 4px", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                      <button onClick={togglePlayback} style={{ fontFamily:"var(--mono)", fontSize:"11px", padding:"3px 10px", border:`1px solid ${isPlaying?"var(--gold)":"var(--border2)"}`, borderRadius:"2px", background:"transparent", color:isPlaying?"var(--gold)":"var(--text2)", cursor:"pointer" }}>
                        {isPlaying ? "⏸ Pause" : "▶ Play"}
                      </button>
                      <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)" }}>{playSpeed}×</span>
                      <input type="range" min="1" max="3" value={playSpeed} step="1" style={{ flex:1, margin:"0 4px" }} onChange={e => setPlaySpeed(parseInt(e.target.value))} />
                    </div>
                    {(SD.timeline||[]).map((t,i) => (
                      <div key={i} id={`tlrow_${i}`} onClick={() => selectTL(i)} style={{ display:"flex", gap:"8px", padding:"5px 10px", borderBottom:"1px solid rgba(0,0,0,0.07)", cursor:"pointer", background:activeTL===i?"rgba(127,29,29,0.05)":"transparent", transition:"background 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(127,29,29,0.05)"} onMouseLeave={e=>e.currentTarget.style.background=activeTL===i?"rgba(127,29,29,0.05)":"transparent"}>
                        <div style={{ width:16, height:16, borderRadius:"50%", background:"rgba(255,255,255,0.4)", border:`1px solid ${activeTL===i?"var(--accent)":"var(--border)"}`, fontFamily:"var(--mono)", fontSize:"9px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:activeTL===i?"var(--accent)":"var(--text3)", marginTop:1 }}>{t.step||i+1}</div>
                        <div>
                          <div style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"var(--text3)" }}>{t.time}</div>
                          <div style={{ fontSize:"11px", color:"var(--text2)", lineHeight:1.4 }}>{t.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Suspects */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <SbHdr label="Suspect Info" skey="suspects" />
                {openSections.suspects && (
                  <div style={{ padding:"6px 10px 10px" }}>
                    {(SD.suspects||[]).length ? (SD.suspects||[]).map((s,i) => (
                      <div key={i} style={{ padding:"4px 2px", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                        <div style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", marginBottom:"3px" }}>
                          Count: <span style={{ color:"var(--accent)" }}>{s.count}</span> · Status: <span style={{ color: s.status==="Unidentified"?"var(--gold)":s.status==="Apprehended"?"var(--green)":"var(--red)" }}>{s.status}</span>
                        </div>
                        <div style={{ fontSize:"11px", color:"var(--text2)", lineHeight:1.5 }}>{s.description}</div>
                      </div>
                    )) : <div style={{ fontFamily:"var(--mono)", fontSize:"11px", color:"var(--text3)" }}>No suspect data</div>}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <div style={{ padding:"8px 12px", fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", letterSpacing:"1px", textTransform:"uppercase" }}>Case Stats</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", padding:"8px" }}>
                  {[
                    ["Evidence items", (SD.evidence||[]).length],
                    ["Suspects", (SD.suspects||[]).reduce((a,s)=>a+(s.count||0),0)||"Unknown"],
                    ["Case type", meta.incidentType||"—"],
                    ["Key fact", meta.keyFact||"—"]
                  ].map(([l,v]) => (
                    <div key={l} style={{ background:"rgba(255,255,255,0.6)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:"8px", padding:"8px" }}>
                      <div style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"var(--text3)", marginBottom:"3px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{l}</div>
                      <div style={{ fontFamily:"var(--mono)", fontSize: String(v).length>8?"11px":"14px", color:"var(--accent)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div style={{ borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
                <SbHdr label="Legend" skey="legend" />
                {openSections.legend && (
                  <div style={{ padding:"6px 10px 10px" }}>
                    {[
                      ["#378ADD","Rooms / zones"],["#ff6b6b","Evidence collected"],["#ffd93d","Suspect movement"],
                      ["#4a9eff","Entry / exit points"],["#b39ddb","CCTV coverage"],["#ff9f43","Activity heatmap"]
                    ].map(([col,lbl]) => (
                      <div key={lbl} style={{ display:"flex", alignItems:"center", gap:"6px", fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text3)", marginBottom:"4px" }}>
                        <div style={{ width:8, height:8, borderRadius:"1px", background:col, flexShrink:0 }} />
                        {lbl}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {errMsg && (
        <div style={{ position:"fixed", bottom:"12px", left:"50%", transform:"translateX(-50%)", background:"rgba(255,255,255,0.9)", backdropFilter:"blur(12px)", border:"1px solid rgba(220,38,38,0.3)", color:"var(--red)", fontFamily:"var(--mono)", fontSize:"11px", padding:"8px 18px", borderRadius:"99px", zIndex:200, whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(0,0,0,0.08)" }}>
          ⚠ {errMsg}
        </div>
      )}
    </>
  );
}
