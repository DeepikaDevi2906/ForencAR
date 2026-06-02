import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

function StatsCard({
  title = "TOTAL CASES",
  value = "24",
  percentage = "+12%",
  trend = "up",
  icon,
  color = "red",
}) {

  const colorStyles = {

    red: {
      text: "text-red-800",
      softText: "text-red-700",
      bg: "bg-red-900/10",
      border: "border-red-900/10",
      glow: "shadow-[0_20px_50px_rgba(127,29,29,0.08)]",
      ambient: "bg-red-500/10",
      trend: "text-red-700",
      dot: "bg-red-500",
    },

    yellow: {
      text: "text-amber-700",
      softText: "text-amber-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/10",
      glow: "shadow-[0_20px_50px_rgba(245,158,11,0.08)]",
      ambient: "bg-amber-400/10",
      trend: "text-amber-700",
      dot: "bg-amber-400",
    },

    green: {
      text: "text-emerald-700",
      softText: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/10",
      glow: "shadow-[0_20px_50px_rgba(16,185,129,0.08)]",
      ambient: "bg-emerald-500/10",
      trend: "text-emerald-700",
      dot: "bg-emerald-500",
    },

    cyan: {
      text: "text-sky-700",
      softText: "text-sky-600",
      bg: "bg-sky-500/10",
      border: "border-sky-500/10",
      glow: "shadow-[0_20px_50px_rgba(14,165,233,0.08)]",
      ambient: "bg-sky-500/10",
      trend: "text-sky-700",
      dot: "bg-sky-500",
    },
  };

  const currentStyle =
    colorStyles[color] ||
    colorStyles.red;

  return (

    <div
      className={`
        group
        relative
        overflow-hidden

        rounded-[38px]

        bg-white/30
        backdrop-blur-2xl

        border border-black/5

        p-7

        transition-all duration-500

        hover:-translate-y-1
        hover:scale-[1.01]

        ${currentStyle.glow}
      `}
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

          w-52
          h-52

          rounded-full

          blur-3xl

          ${currentStyle.ambient}
        `}
      />

      {/* RED STRING */}
      <div
        className="
          absolute

          top-10
          right-6

          w-24
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-red-700
          to-transparent

          rotate-[20deg]

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

          mb-10
        "
      >

        {/* LEFT */}
        <div>

          {/* LABEL */}
          <div
            className={`
              inline-flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-full

              border

              text-[10px]
              font-black

              tracking-[2.5px]

              mb-5

              ${currentStyle.bg}
              ${currentStyle.border}
              ${currentStyle.softText}
            `}
          >

            <Sparkles size={11} />

            {title}
          </div>

          {/* VALUE */}
          <h2
            className={`
              text-6xl
              font-black

              tracking-tight

              ${currentStyle.text}
            `}
          >
            {value}
          </h2>
        </div>

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

            transition-all duration-500

            group-hover:scale-105

            ${currentStyle.bg}
            ${currentStyle.border}
            ${currentStyle.text}
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

              ${currentStyle.ambient}
            `}
          />

          <div className="relative z-10">
            {icon}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="
          relative z-10

          flex
          items-center
          justify-between
        "
      >

        {/* TREND */}
        <div
          className={`
            inline-flex
            items-center
            gap-2

            px-4
            py-2.5

            rounded-full

            bg-white/40

            border border-black/5

            text-sm
            font-bold

            backdrop-blur-xl

            ${
              trend === "up"
                ? "text-emerald-700"
                : "text-red-700"
            }
          `}
        >

          {/* DOT */}
          <div
            className={`
              w-2
              h-2

              rounded-full

              animate-pulse

              ${
                trend === "up"
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }
            `}
          />

          {/* ICON */}
          {trend === "up" ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {/* VALUE */}
          <span>
            {percentage}
          </span>
        </div>

        {/* LABEL */}
        <p
          className="
            text-xs
            font-medium

            tracking-wide

            text-slate-500
          "
        >
          From last month
        </p>
      </div>
    </div>
  );
}

export default StatsCard;