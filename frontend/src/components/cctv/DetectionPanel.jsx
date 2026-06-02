import {
  AlertTriangle,
  Camera,
  Clock3,
  ScanSearch,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

function DetectionPanel({
  detections = [],
}) {

  const statusStyles = {
    critical: {
      icon: <ShieldAlert size={18} />,
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
    },

    warning: {
      icon: <AlertTriangle size={18} />,
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
    },

    safe: {
      icon: <CheckCircle2 size={18} />,
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
    },
  };

  // DON'T RENDER IF EMPTY
  if (!detections.length) {
    return null;
  }

  return (
    <div
      className="
        bg-[#0b1120]
        border border-cyan-900/20
        rounded-3xl
        p-6
      "
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            CCTV Detection Panel
          </h2>

          <p className="text-gray-400 mt-1">
            AI-powered surveillance event analysis
          </p>
        </div>

        <div
          className="
            px-4 py-2
            rounded-full
            bg-green-500/10
            border border-green-500/20
            text-green-400
            text-xs
            font-semibold
          "
        >
          LIVE ANALYSIS
        </div>
      </div>

      {/* DETECTION LIST */}
      <div className="space-y-5">

        {detections.map((item, index) => {

          const style =
            statusStyles[item.status] ||
            statusStyles.warning;

          return (
            <div
              key={index}
              className={`
                relative
                overflow-hidden
                rounded-2xl
                border
                p-5
                transition-all duration-300
                hover:scale-[1.01]

                ${style.border}
                ${style.bg}
              `}
            >

              {/* GLOW */}
              <div
                className={`
                  absolute
                  top-0
                  right-0
                  w-28
                  h-28
                  rounded-full
                  blur-3xl
                  opacity-10
                  ${style.bg}
                `}
              />

              <div className="flex items-start justify-between">

                {/* LEFT */}
                <div className="flex items-start gap-4">

                  {/* ICON */}
                  <div
                    className={`
                      w-12
                      h-12
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      border

                      ${style.border}
                      ${style.bg}
                      ${style.text}
                    `}
                  >
                    {style.icon}
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.type}
                    </h3>

                    <div className="flex flex-wrap gap-5 mt-4">

                      {/* CAMERA */}
                      <div className="flex items-center gap-2 text-sm text-gray-300">

                        <Camera
                          size={15}
                          className="text-cyan-400"
                        />

                        <span>{item.camera}</span>
                      </div>

                      {/* TIME */}
                      <div className="flex items-center gap-2 text-sm text-gray-300">

                        <Clock3
                          size={15}
                          className="text-cyan-400"
                        />

                        <span>{item.time}</span>
                      </div>

                      {/* CONFIDENCE */}
                      <div className="flex items-center gap-2 text-sm text-gray-300">

                        <ScanSearch
                          size={15}
                          className="text-cyan-400"
                        />

                        <span>
                          Confidence:{" "}
                          <span className={style.text}>
                            {item.confidence}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STATUS */}
                <div
                  className={`
                    px-4 py-2
                    rounded-full
                    border
                    text-xs
                    font-semibold
                    uppercase

                    ${style.border}
                    ${style.bg}
                    ${style.text}
                  `}
                >
                  {item.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetectionPanel;