import {
  Sparkles,
  FileSearch,
  ShieldAlert,
  Clock3,
  BrainCircuit,
  ScanSearch,
} from "lucide-react";

const actions = [
  {
    title: "Analyze Cause of Death",
    icon: <FileSearch size={18} />,
  },
  {
    title: "Detect Timeline Gaps",
    icon: <Clock3 size={18} />,
  },
  {
    title: "Find Suspicious Evidence",
    icon: <ShieldAlert size={18} />,
  },
  {
    title: "Generate Investigation Summary",
    icon: <BrainCircuit size={18} />,
  },
  {
    title: "Cross-check CCTV Metadata",
    icon: <ScanSearch size={18} />,
  },
];

function SuggestedActions({ onSelectAction }) {
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
      <div className="flex items-center gap-3 mb-6">
        
        <div
          className="
            w-11
            h-11
            rounded-2xl
            bg-cyan-500/10
            border border-cyan-500/20
            flex
            items-center
            justify-center
          "
        >
          <Sparkles
            size={20}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Suggested Actions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            AI-recommended investigation tasks
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-4">
        
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() =>
              onSelectAction &&
              onSelectAction(action.title)
            }
            className="
              w-full
              flex
              items-center
              gap-4
              px-5
              py-4
              rounded-2xl
              bg-[#111827]
              border border-cyan-900/20
              text-gray-300
              hover:bg-cyan-500/10
              hover:border-cyan-500/20
              hover:text-cyan-300
              transition-all duration-300
              text-left
            "
          >
            
            {/* ICON */}
            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-cyan-500/10
                border border-cyan-500/20
                flex
                items-center
                justify-center
                text-cyan-400
              "
            >
              {action.icon}
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-sm font-medium">
                {action.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Run AI forensic analysis
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedActions;