import {
  Plus,
  Sparkles,
  ShieldCheck,
  Filter,
} from "lucide-react";

import EvidenceCard from "./EvidenceCard";

const evidenceItems = [
  {
    title: "Autopsy Report",
    type: "pdf",
    uploadedBy: "Dr. Michael",
    uploadDate: "12 Aug 2026",
    status: "Verified",
    size: "2.4 MB",
  },

  {
    title: "Crime Scene Images",
    type: "image",
    uploadedBy: "Officer Ryan",
    uploadDate: "13 Aug 2026",
    status: "Verified",
    size: "18.7 MB",
  },

  {
    title: "CCTV Footage",
    type: "video",
    uploadedBy: "Security Dept",
    uploadDate: "13 Aug 2026",
    status: "Under Review",
    size: "145 MB",
  },

  {
    title: "GPS Metadata Logs",
    type: "csv",
    uploadedBy: "Digital Forensics",
    uploadDate: "14 Aug 2026",
    status: "Verified",
    size: "4.2 MB",
  },

  {
    title: "Mobile Call Records",
    type: "csv",
    uploadedBy: "Cyber Cell",
    uploadDate: "14 Aug 2026",
    status: "Verified",
    size: "6.1 MB",
  },

  {
    title: "Suspect Surveillance Clip",
    type: "video",
    uploadedBy: "CCTV Division",
    uploadDate: "15 Aug 2026",
    status: "Flagged",
    size: "210 MB",
  },
];

function EvidenceGrid() {

  const filters = [
    "All Files",
    "Reports",
    "Images",
    "Videos",
    "Metadata",
  ];

  return (

    <div className="relative">

      {/* PAPER TEXTURE */}
      <div
        className="
          absolute inset-0

          opacity-[0.015]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:26px_26px]
        "
      />

      {/* HEADER */}
      <div
        className="
          relative z-10

          flex
          items-start
          justify-between

          gap-6

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

              px-4
              py-2

              rounded-full

              bg-red-900/5
              border border-red-900/10

              text-red-800
              text-[11px]
              font-black

              tracking-[2px]

              mb-6
            "
          >

            <Sparkles size={12} />

            SECURE FORENSIC STORAGE
          </div>

          {/* TITLE */}
          <h1
            className="
              text-5xl
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
              text-slate-500

              mt-4

              leading-8

              max-w-2xl
            "
          >
            AI-powered forensic evidence management
            system for handling reports, surveillance,
            metadata, and investigation assets securely.
          </p>
        </div>

        {/* BUTTON */}
        <button
          className="
            group

            relative
            overflow-hidden

            flex
            items-center
            gap-3

            px-7
            py-4

            rounded-[24px]

            bg-gradient-to-r
            from-red-900
            via-red-700
            to-red-900

            text-white
            font-bold

            shadow-[0_12px_35px_rgba(127,29,29,0.35)]

            transition-all duration-500

            hover:scale-[1.03]
          "
        >

          {/* SHINE */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent

              translate-x-[-100%]

              group-hover:translate-x-[100%]

              transition-all duration-1000
            "
          />

          <Plus
            size={18}
            className="relative z-10"
          />

          <span className="relative z-10">
            Upload Evidence
          </span>
        </button>
      </div>

      {/* FILTER SECTION */}
      <div
        className="
          relative z-10

          flex
          items-center
          justify-between

          gap-5

          flex-wrap

          mb-10
        "
      >

        {/* LEFT */}
        <div
          className="
            flex
            items-center
            gap-4

            flex-wrap
          "
        >

          {/* FILTER LABEL */}
          <div
            className="
              flex
              items-center
              gap-2

              px-4
              py-3

              rounded-2xl

              bg-white/40
              backdrop-blur-xl

              border border-black/5

              text-slate-600
              text-sm
              font-semibold
            "
          >

            <Filter
              size={16}
              className="text-red-700"
            />

            Filters
          </div>

          {/* FILTER BUTTONS */}
          {filters.map((item, index) => (

            <button
              key={index}
              className={`
                px-5
                py-3

                rounded-2xl

                border

                backdrop-blur-xl

                text-sm
                font-semibold

                transition-all duration-300

                ${
                  index === 0
                    ? `
                      bg-red-900/10
                      border-red-900/15
                      text-red-800
                      shadow-[0_0_20px_rgba(127,29,29,0.08)]
                    `
                    : `
                      bg-white/40
                      border-black/5
                      text-slate-500

                      hover:text-red-800
                      hover:border-red-900/10
                      hover:bg-red-900/5
                    `
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* RIGHT STATUS */}
        <div
          className="
            inline-flex
            items-center
            gap-3

            px-5
            py-3

            rounded-2xl

            bg-emerald-500/10

            border border-emerald-500/20

            text-emerald-700
            text-sm
            font-bold

            backdrop-blur-xl
          "
        >

          <ShieldCheck size={16} />

          <span>
            Encrypted Evidence Sync Active
          </span>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          relative z-10

          grid
          grid-cols-3

          gap-7
        "
      >

        {evidenceItems.map((item, index) => (

          <div
            key={index}
            className="
              relative

              transition-all duration-700

              hover:z-20
            "
            style={{
              animationDelay:
                `${index * 120}ms`,
            }}
          >

            {/* CONNECTION GLOW */}
            <div
              className="
                absolute
                -inset-2

                rounded-[40px]

                bg-gradient-to-r
                from-transparent
                via-red-200/10
                to-transparent

                opacity-0
                hover:opacity-100

                blur-xl

                transition-all duration-700

                pointer-events-none
              "
            />

            <EvidenceCard
              evidenceData={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvidenceGrid;