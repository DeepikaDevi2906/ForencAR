import {
  AlertTriangle,
  ShieldCheck,
  Clock3,
} from "lucide-react";

function StatusBadge({
  status = "Active",
}) {

  const statusStyles = {

    Critical: {
      icon: <AlertTriangle size={13} />,
      glow: "shadow-[0_0_18px_rgba(239,68,68,0.25)]",
      dot: "bg-red-500",
      bg: "bg-red-900/10",
      border: "border-red-900/20",
      text: "text-red-700",
    },

    Active: {
      icon: <Clock3 size={13} />,
      glow: "shadow-[0_0_18px_rgba(234,179,8,0.25)]",
      dot: "bg-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-700",
    },

    Resolved: {
      icon: <ShieldCheck size={13} />,
      glow: "shadow-[0_0_18px_rgba(34,197,94,0.25)]",
      dot: "bg-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-700",
    },
  };

  const currentStyle =
    statusStyles[status] ||
    statusStyles.Active;

  return (

    <div className="relative inline-flex">

      {/* GLOW */}
      <div
        className={`
          absolute
          inset-0

          rounded-full

          blur-lg

          opacity-50

          ${currentStyle.bg}
        `}
      />

      {/* BADGE */}
      <div
        className={`
          relative

          inline-flex
          items-center
          gap-2.5

          px-4
          py-2.5

          rounded-full

          backdrop-blur-xl

          border

          text-[11px]
          font-black

          tracking-[1.8px]

          uppercase

          transition-all duration-300

          hover:scale-[1.03]

          ${currentStyle.bg}
          ${currentStyle.border}
          ${currentStyle.text}
          ${currentStyle.glow}
        `}
      >

        {/* STATUS DOT */}
        <div
          className={`
            w-2
            h-2

            rounded-full

            animate-pulse

            ${currentStyle.dot}
          `}
        />

        {/* ICON */}
        <div className="opacity-90">
          {currentStyle.icon}
        </div>

        {/* TEXT */}
        <span>
          {status}
        </span>
      </div>
    </div>
  );
}

export default StatusBadge;