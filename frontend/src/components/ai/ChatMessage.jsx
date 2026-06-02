import { Bot, User } from "lucide-react";

function ChatMessage({
  role = "ai",
  message,
  timestamp = "Just now",
}) {

  const isUser = role === "user";

  return (
    <div
      className={`
        flex
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      
      <div
        className={`
          flex
          gap-4
          max-w-[80%]

          ${isUser ? "flex-row-reverse" : "flex-row"}
        `}
      >
        
        {/* AVATAR */}
        <div
          className={`
            min-w-[45px]
            h-[45px]
            rounded-2xl
            flex
            items-center
            justify-center
            border

            ${
              isUser
                ? "bg-cyan-400 text-black border-cyan-300"
                : "bg-[#111827] text-cyan-400 border-cyan-900/20"
            }
          `}
        >
          {isUser ? (
            <User size={20} />
          ) : (
            <Bot size={20} />
          )}
        </div>

        {/* MESSAGE */}
        <div
          className={`
            px-5
            py-4
            rounded-3xl
            border
            relative

            ${
              isUser
                ? `
                  bg-cyan-400
                  text-black
                  border-cyan-300
                  rounded-tr-sm
                `
                : `
                  bg-[#111827]
                  text-gray-200
                  border-cyan-900/20
                  rounded-tl-sm
                `
            }
          `}
        >
          
          {/* ROLE */}
          <div
            className={`
              text-xs
              font-semibold
              mb-2
              tracking-wide

              ${
                isUser
                  ? "text-black/70"
                  : "text-cyan-400"
              }
            `}
          >
            {isUser
              ? "INVESTIGATOR"
              : "FORENSIC AI"}
          </div>

          {/* MESSAGE TEXT */}
          <p className="text-sm leading-7 whitespace-pre-wrap">
            {message}
          </p>

          {/* TIMESTAMP */}
          <div
            className={`
              mt-4
              text-[11px]

              ${
                isUser
                  ? "text-black/60"
                  : "text-gray-500"
              }
            `}
          >
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;