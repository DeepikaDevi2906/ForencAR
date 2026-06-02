import {
  FileText,
  Image,
  Video,
  FileSpreadsheet,
  CalendarDays,
  ShieldCheck,
  Eye,
  Download,
  Sparkles,
} from "lucide-react";

function EvidenceCard({
  evidenceData,
  onView = () => {},
  onDownload = () => {},
}) {

  // DON'T RENDER IF EMPTY
  if (
    !evidenceData ||
    Object.keys(evidenceData).length === 0
  ) {
    return null;
  }

  const evidenceIcons = {
    pdf: <FileText size={24} />,
    image: <Image size={24} />,
    video: <Video size={24} />,
    csv: <FileSpreadsheet size={24} />,
  };

  const evidenceStyles = {

    pdf: {
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      text: "text-sky-700",
      glow: "bg-sky-500/10",
    },

    image: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-700",
      glow: "bg-purple-500/10",
    },

    video: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-700",
      glow: "bg-red-500/10",
    },

    csv: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-700",
      glow: "bg-amber-400/10",
    },
  };

  const style =
    evidenceStyles[evidenceData.type] ||
    evidenceStyles.pdf;

  return (

    <div
      className="
        group
        relative
        overflow-hidden

        rounded-[38px]

        bg-white/30
        backdrop-blur-2xl

        border border-black/5

        p-7

        shadow-[0_20px_60px_rgba(15,23,42,0.06)]

        transition-all duration-500

        hover:-translate-y-1
        hover:shadow-[0_25px_70px_rgba(127,29,29,0.08)]
      "
    >

      {/* PAPER TEXTURE */}
      <div
        className="
          absolute inset-0

          opacity-[0.02]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:22px_22px]
        "
      />

      {/* AMBIENT GLOW */}
      <div
        className={`
          absolute
          top-0
          right-0

          w-56
          h-56

          rounded-full

          blur-3xl

          ${style.glow}
        `}
      />

      {/* RED STRING */}
      <div
        className="
          absolute

          top-10
          right-10

          w-28
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-red-700
          to-transparent

          rotate-[18deg]

          opacity-0

          group-hover:opacity-40

          transition-all duration-500

          shadow-[0_0_14px_rgba(127,29,29,0.4)]
        "
      />

      {/* TOP */}
      <div
        className="
          relative z-10

          flex
          items-start
          justify-between

          gap-5

          mb-8
        "
      >

        {/* LEFT */}
        <div className="flex items-start gap-5">

          {/* ICON */}
          <div
            className={`
              relative

              w-16
              h-16

              rounded-[24px]

              flex
              items-center
              justify-center

              border

              backdrop-blur-xl

              shrink-0

              ${style.bg}
              ${style.border}
              ${style.text}
            `}
          >

            {/* ICON GLOW */}
            <div
              className={`
                absolute
                inset-0

                rounded-[24px]

                blur-xl

                opacity-70

                ${style.glow}
              `}
            />

            <div className="relative z-10">
              {evidenceIcons[evidenceData.type]}
            </div>
          </div>

          {/* CONTENT */}
          <div>

            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2

                px-3
                py-1.5

                rounded-full

                bg-red-900/5
                border border-red-900/10

                text-[10px]
                font-black

                tracking-[2px]

                text-red-800

                mb-4
              "
            >

              <Sparkles size={10} />

              EVIDENCE FILE
            </div>

            {/* TITLE */}
            <h2
              className="
                text-2xl
                font-black

                text-slate-900

                leading-snug
              "
            >
              {evidenceData.title}
            </h2>

            {/* UPLOADER */}
            <p
              className="
                text-slate-500

                text-sm

                mt-3

                leading-6
              "
            >
              Uploaded by{" "}
              <span className="font-semibold text-slate-700">
                {evidenceData.uploadedBy}
              </span>
            </p>
          </div>
        </div>

        {/* SIZE */}
        <div
          className="
            px-4
            py-2.5

            rounded-full

            bg-white/40

            border border-black/5

            text-xs
            font-bold

            tracking-wide

            text-slate-600

            backdrop-blur-xl

            shrink-0
          "
        >
          {evidenceData.size}
        </div>
      </div>

      {/* DETAILS */}
      <div
        className="
          relative z-10

          space-y-5

          mb-9
        "
      >

        {/* DATE */}
        <div
          className="
            flex
            items-center
            gap-4

            text-sm
            text-slate-500
          "
        >

          <div
            className="
              w-11
              h-11

              rounded-2xl

              bg-red-900/5

              border border-red-900/10

              flex
              items-center
              justify-center
            "
          >
            <CalendarDays
              size={16}
              className="text-red-700"
            />
          </div>

          <span className="font-medium">
            {evidenceData.uploadDate}
          </span>
        </div>

        {/* STATUS */}
        <div
          className="
            flex
            items-center
            gap-4

            text-sm
          "
        >

          <div
            className="
              w-11
              h-11

              rounded-2xl

              bg-emerald-500/10

              border border-emerald-500/20

              flex
              items-center
              justify-center
            "
          >
            <ShieldCheck
              size={16}
              className="text-emerald-700"
            />
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-emerald-500/10

              border border-emerald-500/20

              text-emerald-700
              text-[11px]
              font-black

              tracking-[1.5px]

              uppercase
            "
          >

            <div
              className="
                w-2
                h-2

                rounded-full

                bg-emerald-500

                animate-pulse
              "
            />

            {evidenceData.status}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="
          relative z-10

          flex
          items-center

          gap-4
        "
      >

        {/* VIEW */}
        <button
          onClick={() => onView(evidenceData)}
          className="
            group/view

            relative
            overflow-hidden

            flex-1

            flex
            items-center
            justify-center
            gap-2.5

            px-5
            py-4

            rounded-[22px]

            bg-gradient-to-r
            from-red-900
            via-red-700
            to-red-900

            text-white
            text-sm
            font-bold

            shadow-[0_10px_30px_rgba(127,29,29,0.25)]

            transition-all duration-500

            hover:scale-[1.02]
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

              group-hover/view:translate-x-[100%]

              transition-all duration-1000
            "
          />

          <Eye size={16} className="relative z-10" />

          <span className="relative z-10">
            View
          </span>
        </button>

        {/* DOWNLOAD */}
        <button
          onClick={() => onDownload(evidenceData)}
          className="
            flex-1

            flex
            items-center
            justify-center
            gap-2.5

            px-5
            py-4

            rounded-[22px]

            bg-white/40
            backdrop-blur-xl

            border border-black/5

            text-slate-700
            text-sm
            font-bold

            transition-all duration-300

            hover:bg-white/60
            hover:text-red-800
          "
        >

          <Download size={16} />

          Download
        </button>
      </div>
    </div>
  );
}

export default EvidenceCard;