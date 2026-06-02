import DashboardLayout from "../components/layout/DashboardLayout";

import SearchBar from "../components/common/SearchBar";

import FileUploader from "../components/evidence/FileUploader";
import EvidenceGrid from "../components/evidence/EvidenceGrid";

import {
  ShieldCheck,
  Sparkles,
  FileSearch,
  ScanSearch,
} from "lucide-react";

function EvidenceVault() {

  const handleSearch = (query) => {

    console.log(query);

    // Search logic later
  };

  return (
    <DashboardLayout>

      {/* ================================= */}
      {/* MAIN WRAPPER */}
      {/* ================================= */}
      <div
        className="
          relative
          overflow-hidden

          min-h-screen

          rounded-[42px]

          bg-gradient-to-br
          from-[#f7f4ef]
          via-[#f3efe9]
          to-[#ece6dc]

          p-2
        "
      >

        {/* PAPER TEXTURE */}
        <div
          className="
            absolute inset-0

            opacity-[0.025]

            pointer-events-none

            bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

            bg-[length:26px_26px]
          "
        />

        {/* AMBIENT LIGHT */}
        <div
          className="
            absolute
            -top-24
            -left-24

            w-[620px]
            h-[620px]

            rounded-full

            bg-white/40

            blur-3xl

            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0

            w-[500px]
            h-[500px]

            rounded-full

            bg-red-200/20

            blur-3xl

            animate-pulse
          "
        />

        {/* FLOATING DUST */}
        <div className="absolute top-24 left-40 w-2 h-2 rounded-full bg-black/5 animate-pulse" />

        <div className="absolute top-72 right-44 w-1 h-1 rounded-full bg-red-900/15 animate-ping" />

        <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-black/5 animate-bounce" />

        {/* RED STRINGS */}
        <div
          className="
            absolute
            top-[240px]
            left-[380px]

            w-[260px]
            h-[2px]

            bg-gradient-to-r
            from-red-900
            via-red-600
            to-red-900

            rotate-[12deg]

            shadow-[0_0_14px_rgba(127,29,29,0.45)]

            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-[360px]
            left-[540px]

            w-[220px]
            h-[2px]

            bg-gradient-to-r
            from-red-900
            via-red-500
            to-red-900

            -rotate-[18deg]

            shadow-[0_0_14px_rgba(127,29,29,0.45)]

            animate-pulse
          "
        />

        {/* NODES */}
        <div
          className="
            absolute
            top-[232px]
            left-[372px]

            w-4
            h-4

            rounded-full

            bg-red-900

            shadow-[0_0_18px_rgba(127,29,29,0.65)]

            animate-ping
          "
        />

        <div
          className="
            absolute
            top-[352px]
            left-[748px]

            w-4
            h-4

            rounded-full

            bg-red-800

            shadow-[0_0_18px_rgba(127,29,29,0.65)]

            animate-pulse
          "
        />

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}
        <div className="relative z-10">

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}
          <div
            className="
              flex
              items-start
              justify-between

              gap-8

              mb-10
            "
          >

            {/* LEFT */}
            <div>

              {/* BADGE */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  px-5
                  py-2.5

                  rounded-full

                  bg-red-900/5

                  border border-red-900/10

                  text-red-800
                  text-xs
                  font-black

                  tracking-[3px]

                  mb-6

                  backdrop-blur-xl
                "
              >

                <Sparkles size={14} />

                FORENSIC EVIDENCE NETWORK
              </div>

              {/* TITLE */}
              <h1
                className="
                  text-6xl
                  font-black

                  text-slate-900

                  tracking-tight
                "
              >
                Evidence Vault
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  text-slate-600

                  mt-5

                  text-lg

                  leading-9

                  max-w-3xl
                "
              >
                Secure forensic evidence storage with
                AI-powered verification, metadata
                extraction, anomaly detection, and
                investigative timeline reconstruction.
              </p>
            </div>

            {/* STATUS */}
            <div
              className="
                inline-flex
                items-center
                gap-3

                px-6
                py-4

                rounded-[24px]

                bg-emerald-500/10

                border border-emerald-500/20

                text-emerald-700
                text-sm
                font-black

                shadow-[0_10px_40px_rgba(16,185,129,0.08)]
              "
            >

              <ShieldCheck size={18} />

              ENCRYPTED STORAGE ACTIVE
            </div>
          </div>

          {/* ================================= */}
          {/* SEARCH */}
          {/* ================================= */}
          <div className="mb-10">

            <SearchBar
              placeholder="
                Search reports, CCTV footage, metadata...
              "
              onSearch={handleSearch}
            />
          </div>

          {/* ================================= */}
          {/* TOP GRID */}
          {/* ================================= */}
          <div className="grid grid-cols-12 gap-6 mb-10">

            {/* UPLOADER */}
            <div className="col-span-5">

              <div
                className="
                  h-full

                  rounded-[40px]

                  bg-white/35
                  backdrop-blur-2xl

                  border border-black/5

                  p-4

                  shadow-[0_20px_80px_rgba(15,23,42,0.08)]

                  overflow-hidden
                "
              >

                <FileUploader />
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="col-span-7">

              <div
                className="
                  relative
                  overflow-hidden

                  h-full

                  rounded-[40px]

                  bg-white/35
                  backdrop-blur-2xl

                  border border-black/5

                  p-8

                  shadow-[0_20px_80px_rgba(15,23,42,0.08)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute
                    top-0
                    right-0

                    w-72
                    h-72

                    rounded-full

                    bg-red-500/10

                    blur-3xl
                  "
                />

                <div className="relative z-10">

                  {/* HEADER */}
                  <div className="mb-10">

                    <div className="flex items-center gap-4 mb-5">

                      <div
                        className="
                          w-16
                          h-16

                          rounded-[26px]

                          bg-red-900/5

                          border border-red-900/10

                          flex
                          items-center
                          justify-center
                        "
                      >

                        <FileSearch
                          size={30}
                          className="text-red-700"
                        />
                      </div>

                      <div>

                        <h2
                          className="
                            text-4xl
                            font-black

                            text-slate-900
                          "
                        >
                          AI Evidence Intelligence
                        </h2>

                        <p
                          className="
                            text-slate-500

                            mt-2
                          "
                        >
                          Automated forensic evidence analysis
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-2 gap-6">

                    {[
                      {
                        title:
                          "Evidence Verification",

                        description:
                          "AI validates uploaded evidence integrity and automatically detects possible tampering attempts.",

                        icon:
                          <ShieldCheck
                            size={22}
                            className="text-red-700"
                          />,
                      },

                      {
                        title:
                          "Metadata Extraction",

                        description:
                          "Extract timestamps, GPS coordinates, device details, and hidden forensic metadata instantly.",

                        icon:
                          <ScanSearch
                            size={22}
                            className="text-red-700"
                          />,
                      },

                      {
                        title:
                          "Timeline Correlation",

                        description:
                          "Correlate evidence timestamps with CCTV logs and investigation events to reconstruct timelines.",

                        icon:
                          <Sparkles
                            size={22}
                            className="text-red-700"
                          />,
                      },

                      {
                        title:
                          "Risk Detection",

                        description:
                          "Suspicious anomalies and evidence conflicts are automatically flagged for review.",

                        icon:
                          <FileSearch
                            size={22}
                            className="text-red-700"
                          />,
                      },
                    ].map((item, index) => (

                      <div
                        key={index}
                        className="
                          relative
                          overflow-hidden

                          rounded-[30px]

                          bg-white/40
                          backdrop-blur-xl

                          border border-black/5

                          p-6

                          transition-all duration-500

                          hover:-translate-y-1
                          hover:border-red-900/10
                        "
                      >

                        {/* GLOW */}
                        <div
                          className="
                            absolute
                            top-0
                            right-0

                            w-32
                            h-32

                            rounded-full

                            bg-red-500/10

                            blur-3xl
                          "
                        />

                        <div className="relative z-10">

                          {/* ICON */}
                          <div
                            className="
                              w-14
                              h-14

                              rounded-[22px]

                              bg-red-900/5

                              border border-red-900/10

                              flex
                              items-center
                              justify-center

                              mb-5
                            "
                          >
                            {item.icon}
                          </div>

                          {/* TITLE */}
                          <h3
                            className="
                              text-xl
                              font-black

                              text-slate-900

                              mb-4
                            "
                          >
                            {item.title}
                          </h3>

                          {/* DESCRIPTION */}
                          <p
                            className="
                              text-sm

                              leading-8

                              text-slate-600
                            "
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* EVIDENCE GRID */}
          {/* ================================= */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[42px]

              bg-white/35
              backdrop-blur-2xl

              border border-black/5

              p-4

              shadow-[0_20px_80px_rgba(15,23,42,0.08)]
            "
          >

            {/* TEXTURE */}
            <div
              className="
                absolute inset-0

                opacity-[0.03]

                bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

                bg-[length:22px_22px]

                pointer-events-none
              "
            />

            <div className="relative z-10">

              <EvidenceGrid />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EvidenceVault;