import {
  FileText,
  Download,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function GenerateReportButton({
  onGenerate,
  loading = false,
}) {

  return (

    <div
      className="
        relative
        overflow-hidden

        rounded-[40px]

        bg-white/30
        backdrop-blur-2xl

        border border-black/5

        shadow-[0_20px_80px_rgba(15,23,42,0.08)]

        p-8
      "
    >

      {/* PAPER TEXTURE */}
      <div
        className="
          absolute inset-0

          opacity-[0.02]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:24px_24px]
        "
      />

      {/* AMBIENT LIGHT */}
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

          pointer-events-none
        "
      />

      {/* RED STRING */}
      <div
        className="
          absolute

          top-20
          right-10

          w-40
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-red-700
          to-transparent

          rotate-[18deg]

          opacity-40

          shadow-[0_0_16px_rgba(127,29,29,0.4)]

          animate-pulse
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
        <div className="flex items-start gap-5">

          {/* ICON */}
          <div
            className="
              relative

              w-20
              h-20

              rounded-[28px]

              bg-red-900/5

              border border-red-900/10

              flex
              items-center
              justify-center

              shadow-[0_0_40px_rgba(127,29,29,0.08)]

              shrink-0
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute
                inset-0

                rounded-[28px]

                bg-red-500/10

                blur-xl
              "
            />

            <FileText
              size={34}
              className="
                relative z-10

                text-red-800
              "
            />
          </div>

          {/* TEXT */}
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

                mb-5
              "
            >

              <Sparkles size={12} />

              AI FORENSIC REPORTING
            </div>

            {/* TITLE */}
            <h2
              className="
                text-4xl
                font-black

                text-slate-900
              "
            >
              AI Report Generator
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-slate-500

                mt-3

                leading-8

                max-w-2xl
              "
            >
              Generate comprehensive forensic
              intelligence reports with AI-powered
              investigation summaries and evidence
              correlation analysis.
            </p>
          </div>
        </div>

        {/* STATUS */}
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

            shrink-0
          "
        >

          <ShieldCheck size={16} />

          <span>
            AI Analysis Ready
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          relative z-10

          overflow-hidden

          rounded-[32px]

          bg-white/40
          backdrop-blur-xl

          border border-black/5

          p-7

          shadow-[0_10px_35px_rgba(15,23,42,0.04)]

          mb-8
        "
      >

        {/* INNER GLOW */}
        <div
          className="
            absolute
            top-0
            right-0

            w-48
            h-48

            rounded-full

            bg-red-500/5

            blur-3xl
          "
        />

        <div
          className="
            relative z-10

            flex
            items-start

            gap-5
          "
        >

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

              shrink-0
            "
          >

            <Sparkles
              size={24}
              className="text-red-700"
            />
          </div>

          {/* TEXT */}
          <div>

            <h3
              className="
                text-2xl
                font-black

                text-slate-900

                mb-4
              "
            >
              AI-Generated Intelligence Summary
            </h3>

            <p
              className="
                text-slate-500

                text-sm

                leading-8
              "
            >
              Generate a detailed forensic
              investigation report including
              evidence analysis, autopsy findings,
              CCTV intelligence, anomaly detection,
              behavioral profiling, risk assessment,
              metadata evaluation, and AI-generated
              investigation conclusions.
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
          relative z-10

          flex
          items-center

          gap-5
        "
      >

        {/* GENERATE */}
        <button
          onClick={onGenerate}
          disabled={loading}
          className="
            group

            relative
            overflow-hidden

            flex-1

            flex
            items-center
            justify-center

            gap-3

            px-7
            py-5

            rounded-[24px]

            bg-gradient-to-r
            from-red-900
            via-red-700
            to-red-900

            text-white
            font-bold

            shadow-[0_12px_35px_rgba(127,29,29,0.35)]

            transition-all duration-500

            hover:scale-[1.02]

            disabled:opacity-50
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

          {loading ? (
            <>
              <div
                className="
                  relative z-10

                  w-5
                  h-5

                  border-2
                  border-white/30
                  border-t-white

                  rounded-full

                  animate-spin
                "
              />

              <span className="relative z-10">
                Generating...
              </span>
            </>
          ) : (
            <>
              <Sparkles
                size={18}
                className="relative z-10"
              />

              <span className="relative z-10">
                Generate Report
              </span>
            </>
          )}
        </button>

        {/* EXPORT */}
        <button
          className="
            flex
            items-center
            justify-center

            gap-3

            px-7
            py-5

            rounded-[24px]

            bg-white/40
            backdrop-blur-xl

            border border-black/5

            text-slate-700
            font-bold

            transition-all duration-300

            hover:bg-white/60
            hover:text-red-800
          "
        >

          <Download size={18} />

          <span>
            Export
          </span>
        </button>
      </div>
    </div>
  );
}

export default GenerateReportButton;