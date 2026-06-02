import {
  AlertTriangle,
  ShieldAlert,
  Clock3,
  BrainCircuit,
} from "lucide-react";

function AIInsightCard({
  title,
  description,
  type = "warning",
  confidence = "82%",
  timestamp = "2 mins ago",
}) {

  const styles = {
    warning: {
      icon: <AlertTriangle size={22} />,
      border: "border-yellow-500/20",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
    },

    critical: {
      icon: <ShieldAlert size={22} />,
      border: "border-red-500/20",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },

    intelligence: {
      icon: <BrainCircuit size={22} />,
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
    },
  };

  const currentStyle = styles[type];

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        ${currentStyle.border}
        bg-[#0b1120]
        p-6
        transition-all
        duration-300
        hover:scale-[1.01]
        hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]
      `}
    >
      
      {/* GLOW EFFECT */}
      <div
        className={`
          absolute
          top-0
          right-0
          w-32
          h-32
          blur-3xl
          opacity-10
          rounded-full
          ${currentStyle.bg}
        `}
      />

      {/* TOP */}
      <div className="flex items-start justify-between mb-5">
        
        <div className="flex items-center gap-4">
          
          <div
            className={`
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              border
              ${currentStyle.border}
              ${currentStyle.bg}
              ${currentStyle.text}
            `}
          >
            {currentStyle.icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>

            <p className="text-xs text-gray-500 mt-1 tracking-wide">
              AI GENERATED INSIGHT
            </p>
          </div>
        </div>

        {/* CONFIDENCE */}
        <div
          className={`
            px-3 py-2
            rounded-full
            text-xs
            font-semibold
            border
            ${currentStyle.border}
            ${currentStyle.bg}
            ${currentStyle.text}
          `}
        >
          {confidence}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-300 leading-7 text-sm mb-6">
        {description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          
          <Clock3 size={14} />

          <span>
            {timestamp}
          </span>
        </div>

        <button
          className={`
            px-4 py-2
            rounded-xl
            text-sm
            font-medium
            border
            transition-all duration-300

            ${currentStyle.border}
            ${currentStyle.bg}
            ${currentStyle.text}

            hover:opacity-80
          `}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default AIInsightCard;