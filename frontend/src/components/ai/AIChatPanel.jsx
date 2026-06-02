import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

const suggestedQuestions = [
  "What is the probable cause of death?",
  "Show suspicious evidence gaps",
  "Generate investigation summary",
  "Analyze injury patterns",
];

function AIChatPanel() {
  const [message, setMessage] = useState("");

  const chatMessages = [
    {
      role: "ai",
      text: "Autopsy analysis completed. Potential blunt force trauma detected.",
    },
    {
      role: "user",
      text: "What evidence appears suspicious?",
    },
    {
      role: "ai",
      text: "CCTV timestamps and GPS metadata show inconsistencies between 8:45 PM and 9:10 PM.",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  return (
    <div
      className="
        w-full
        h-[85vh]
        bg-[#0b1120]
        border border-cyan-900/20
        rounded-3xl
        overflow-hidden
        flex
        flex-col
      "
    >
      
      {/* HEADER */}
      <div
        className="
          h-[85px]
          border-b border-cyan-900/20
          px-6
          flex
          items-center
          justify-between
          bg-[#0d1427]
        "
      >
        
        <div className="flex items-center gap-4">
          
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-500/10
              border border-cyan-500/20
              flex
              items-center
              justify-center
            "
          >
            <Bot
              size={24}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              AI Investigation Assistant
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Multi-Agent Forensic Intelligence System
            </p>
          </div>
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
          ACTIVE
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        
        {/* SUGGESTED QUESTIONS */}
        <div className="mb-8">
          
          <div className="flex items-center gap-2 mb-4">
            
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <p className="text-sm text-cyan-300 font-medium">
              Suggested Actions
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-cyan-500/10
                  border border-cyan-500/20
                  text-sm
                  text-cyan-300
                  hover:bg-cyan-500/20
                  transition-all duration-300
                "
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* CHAT MESSAGES */}
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`
              flex
              ${msg.role === "user" ? "justify-end" : "justify-start"}
            `}
          >
            
            <div
              className={`
                max-w-[75%]
                px-5 py-4
                rounded-2xl
                text-sm
                leading-7

                ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-black rounded-br-sm"
                    : "bg-[#111827] border border-cyan-900/20 text-gray-200 rounded-bl-sm"
                }
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div
        className="
          border-t border-cyan-900/20
          p-5
          bg-[#0d1427]
        "
      >
        
        <div
          className="
            flex items-center gap-4
            bg-[#111827]
            border border-cyan-900/20
            rounded-2xl
            px-5 py-4
          "
        >
          
          <input
            type="text"
            placeholder="Ask forensic investigation questions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
              flex-1
              bg-transparent
              outline-none
              text-white
              placeholder:text-gray-500
            "
          />

          <button
            onClick={handleSendMessage}
            className="
              w-11
              h-11
              rounded-xl
              bg-cyan-400
              hover:bg-cyan-300
              text-black
              flex
              items-center
              justify-center
              transition-all duration-300
              shadow-[0_0_20px_rgba(34,211,238,0.4)]
            "
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatPanel;