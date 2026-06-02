import {
  ShieldAlert,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

function ThreatMeter({
  threatLevel = 75,
  status = "HIGH",
}) {

  const getStatusColor = () => {

    if (threatLevel >= 80) {
      return {
        text: "text-red-700",
        softText: "text-red-600",
        border: "border-red-900/20",
        ring: "border-red-700",
        bg: "bg-red-900/10",
        glow: "bg-red-500/10",
        dot: "bg-red-500",
      };
    }

    if (threatLevel >= 50) {
      return {
        text: "text-amber-700",
        softText: "text-amber-600",
        border: "border-amber-500/20",
        ring: "border-amber-500",
        bg: "bg-amber-500/10",
        glow: "bg-amber-400/10",
        dot: "bg-amber-400",
      };
    }

    return {
      text: "text-emerald-700",
      softText: "text-emerald-600",
      border: "border-emerald-500/20",
      ring: "border-emerald-500",
      bg: "bg-emerald-500/10",
      glow: "bg-emerald-500/10",
      dot: "bg-emerald-500",
    };
  };

  const colors = getStatusColor();

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

        flex
        flex-col
        items-center
        justify-center

        h-[460px]
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
        className={`
          absolute
          top-0
          right-0

          w-72
          h-72

          rounded-full

          blur-3xl

          ${colors.glow}
        `}
      />

      {/* RED STRING */}
      <div
        className="
          absolute

          top-24
          right-10

          w-44
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
          flex-col
          items-center

          mb-10
        "
      >

        {/* BADGE */}
        <div
          className={`
            inline-flex
            items-center
            gap-2

            px-4
            py-2

            rounded-full

            border

            text-[11px]
            font-black

            tracking-[2px]

            mb-6

            ${colors.bg}
            ${colors.border}
            ${colors.softText}
          `}
        >

          <Sparkles size={12} />

          LIVE THREAT ANALYSIS
        </div>

        {/* TITLE */}
        <div className="flex items-center gap-4">

          <div
            className={`
              relative

              w-14
              h-14

              rounded-[20px]

              flex
              items-center
              justify-center

              border

              ${colors.bg}
              ${colors.border}
            `}
          >

            {/* GLOW */}
            <div
              className={`
                absolute
                inset-0

                rounded-[20px]

                blur-xl

                ${colors.glow}
              `}
            />

            <ShieldAlert
              size={26}
              className={`
                relative z-10

                ${colors.text}
              `}
            />
          </div>

          <h2
            className="
              text-3xl
              font-black

              text-slate-900
            "
          >
            Threat Meter
          </h2>
        </div>
      </div>

      {/* CIRCLE */}
      <div
        className="
          relative

          mb-10
        "
      >

        {/* OUTER GLOW */}
        <div
          className={`
            absolute
            inset-0

            rounded-full

            blur-3xl

            opacity-50

            ${colors.glow}
          `}
        />

        {/* PULSE */}
        <div
          className={`
            absolute
            inset-0

            rounded-full

            animate-ping

            opacity-10

            ${colors.glow}
          `}
        />

        {/* OUTER RING */}
        <div
          className={`
            relative

            w-[240px]
            h-[240px]

            rounded-full

            border-[14px]

            flex
            items-center
            justify-center

            backdrop-blur-xl

            shadow-[0_0_40px_rgba(15,23,42,0.06)]

            ${colors.ring}
          `}
        >

          {/* INNER RING */}
          <div
            className="
              absolute

              w-[190px]
              h-[190px]

              rounded-full

              border border-black/5
            "
          />

          {/* INNER CORE */}
          <div
            className="
              relative

              w-[160px]
              h-[160px]

              rounded-full

              bg-white/50
              backdrop-blur-xl

              border border-black/5

              flex
              flex-col
              items-center
              justify-center

              shadow-[0_10px_40px_rgba(15,23,42,0.08)]
            "
          >

            {/* CENTER GLOW */}
            <div
              className={`
                absolute
                inset-6

                rounded-full

                blur-2xl

                opacity-50

                ${colors.glow}
              `}
            />

            {/* VALUE */}
            <h1
              className={`
                relative z-10

                text-7xl
                font-black

                tracking-tight

                ${colors.text}
              `}
            >
              {threatLevel}
            </h1>

            {/* LABEL */}
            <p
              className="
                relative z-10

                text-xs
                font-bold

                tracking-[3px]

                text-slate-500

                mt-3
              "
            >
              THREAT LEVEL
            </p>
          </div>
        </div>
      </div>

      {/* STATUS */}
      <div
        className={`
          relative z-10

          inline-flex
          items-center
          gap-3

          px-5
          py-3.5

          rounded-full

          border

          backdrop-blur-xl

          text-sm
          font-black

          tracking-[1.5px]

          uppercase

          ${colors.bg}
          ${colors.border}
          ${colors.text}
        `}
      >

        {/* DOT */}
        <div
          className={`
            w-2.5
            h-2.5

            rounded-full

            animate-pulse

            ${colors.dot}
          `}
        />

        <AlertTriangle size={16} />

        <span>
          {status} Risk Detected
        </span>
      </div>

      {/* DESCRIPTION */}
      <p
        className="
          relative z-10

          text-slate-500

          text-sm
          text-center

          leading-7

          mt-7

          max-w-[320px]
        "
      >
        AI forensic intelligence has identified
        elevated anomaly patterns and suspicious
        evidence correlations requiring immediate
        investigative attention.
      </p>
    </div>
  );
}

export default ThreatMeter;