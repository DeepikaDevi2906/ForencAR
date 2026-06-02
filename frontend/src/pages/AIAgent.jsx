import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  Brain,
  Sparkles,
  ShieldAlert,
  FileWarning,
  Send,
  Paperclip,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

function AIAgent() {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  // -----------------------------------
  // LOAD CHAT
  // -----------------------------------
  useEffect(() => {

    const savedMessages =
      localStorage.getItem(
        "forensic_chat"
      );

    if (savedMessages) {

      setMessages(
        JSON.parse(savedMessages)
      );
    }

  }, []);

  // -----------------------------------
  // SAVE CHAT
  // -----------------------------------
  useEffect(() => {

    localStorage.setItem(
      "forensic_chat",
      JSON.stringify(messages)
    );

  }, [messages]);

  // -----------------------------------
  // SEND MESSAGE
  // -----------------------------------
  const sendMessage = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:5000/api/ai/chat",
          {
            question,
          }
        );

      const aiMessage = {
        role: "assistant",
        content:
          response.data.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "AI response failed.",
        },
      ]);
    }

    setQuestion("");

    setLoading(false);
  };

  // -----------------------------------
  // PDF UPLOAD
  // -----------------------------------
  const uploadPDF = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    setUploading(true);

    try {

      await axios.post(
        "http://127.0.0.1:5000/api/ai/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            `PDF "${file.name}" uploaded successfully. You can now ask questions about it.`,
        },
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "PDF upload failed.",
        },
      ]);
    }

    setUploading(false);
  };

  return (

    <DashboardLayout>

      {/* MAIN WRAPPER */}
      <div className="relative overflow-hidden">

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

        {/* AMBIENT LIGHTS */}
        <div
          className="
            absolute
            top-0
            left-0

            w-[500px]
            h-[500px]

            rounded-full

            bg-red-500/10

            blur-3xl

            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0

            w-[500px]
            h-[500px]

            rounded-full

            bg-red-900/10

            blur-3xl

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

            gap-8

            mb-10
          "
        >

          {/* LEFT */}
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

                mb-6
              "
            >

              <Sparkles size={12} />

              MULTI-AGENT FORENSIC AI
            </div>

            {/* TOP */}
            <div className="flex items-center gap-5 mb-6">

              {/* ICON */}
              <div
                className="
                  relative

                  w-20
                  h-20

                  rounded-[30px]

                  bg-red-900/5

                  border border-red-900/10

                  flex
                  items-center
                  justify-center

                  shadow-[0_0_40px_rgba(127,29,29,0.12)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute
                    inset-0

                    rounded-[30px]

                    bg-red-500/10

                    blur-xl
                  "
                />

                <Brain
                  size={36}
                  className="
                    relative z-10

                    text-red-800
                  "
                />
              </div>

              {/* TITLE */}
              <div>

                <h1
                  className="
                    text-5xl
                    font-black

                    text-slate-900

                    tracking-tight
                  "
                >
                  AI Investigation Agent
                </h1>

                <p
                  className="
                    text-slate-500

                    mt-3

                    text-lg

                    leading-8

                    max-w-3xl
                  "
                >
                  Upload forensic evidence, correlate
                  anomalies, reconstruct timelines,
                  and let the AI investigation engine
                  uncover hidden truths.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div
          className="
            relative

            rounded-[42px]

            bg-white/30
            backdrop-blur-2xl

            border border-black/5

            shadow-[0_20px_120px_rgba(15,23,42,0.12)]

            overflow-hidden

            flex
          "
        >

          {/* LEFT PANEL */}
          <div
            className="
              hidden
              lg:block

              relative
              overflow-hidden

              w-[340px]

              border-r border-black/5

              bg-white/20

              p-7
            "
          >

            {/* RED STRINGS */}
            <div
              className="
                absolute
                top-[180px]
                left-[70px]

                w-[150px]
                h-[2px]

                bg-gradient-to-r
                from-red-700
                via-red-500
                to-red-700

                rotate-[18deg]

                shadow-[0_0_18px_rgba(127,29,29,0.45)]

                animate-pulse
              "
            />

            <div
              className="
                absolute
                top-[280px]
                left-[120px]

                w-[130px]
                h-[2px]

                bg-gradient-to-r
                from-red-700
                via-red-500
                to-red-700

                -rotate-[12deg]

                shadow-[0_0_18px_rgba(127,29,29,0.45)]

                animate-pulse
              "
            />

            {/* NODES */}
            <div
              className="
                absolute
                top-[172px]
                left-[62px]

                w-4
                h-4

                rounded-full

                bg-red-700

                shadow-[0_0_18px_rgba(127,29,29,0.7)]

                animate-ping
              "
            />

            <div
              className="
                absolute
                top-[270px]
                left-[242px]

                w-4
                h-4

                rounded-full

                bg-red-700

                shadow-[0_0_18px_rgba(127,29,29,0.7)]

                animate-pulse
              "
            />

            <div className="relative z-10">

              {/* TITLE */}
              <div className="flex items-center gap-4 mb-10">

                <ShieldAlert
                  size={26}
                  className="text-red-700"
                />

                <h2
                  className="
                    text-2xl
                    font-black

                    text-slate-900
                  "
                >
                  AI Evidence Board
                </h2>
              </div>

              {/* EVIDENCE ITEMS */}
              <div className="space-y-5">

                {[
                  {
                    title: "Autopsy Report",
                    status: "Correlated",
                    glow: "cyan",
                  },
                  {
                    title: "CCTV Timeline",
                    status: "Mismatch Detected",
                    glow: "red",
                  },
                  {
                    title: "GPS Metadata",
                    status: "Suspicious Movement",
                    glow: "yellow",
                  },
                ].map((item, index) => (

                  <div
                    key={index}
                    className={`
                      relative
                      overflow-hidden

                      rounded-[28px]

                      p-5

                      border

                      backdrop-blur-xl

                      transition-all duration-500

                      hover:-translate-y-1

                      ${
                        item.glow === "red"
                          ? `
                            border-red-500/20
                            bg-red-500/10
                          `
                          : item.glow === "yellow"
                          ? `
                            border-amber-500/20
                            bg-amber-500/10
                          `
                          : `
                            border-sky-500/20
                            bg-sky-500/10
                          `
                      }
                    `}
                  >

                    <p
                      className="
                        text-slate-900
                        font-bold
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-500

                        mt-3
                      "
                    >
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>

              {/* DEDUCTION */}
              <div
                className="
                  relative
                  overflow-hidden

                  mt-10

                  rounded-[32px]

                  border border-red-500/20

                  bg-red-500/10

                  p-6

                  shadow-[0_10px_40px_rgba(127,29,29,0.08)]
                "
              >

                <div className="flex items-center gap-3 mb-5">

                  <FileWarning
                    size={22}
                    className="text-red-700"
                  />

                  <h3
                    className="
                      text-red-700
                      font-black
                    "
                  >
                    Critical Deduction
                  </h3>
                </div>

                <p
                  className="
                    text-sm

                    leading-8

                    text-slate-600
                  "
                >
                  AI identified a concealed timeline
                  discrepancy between victim movement
                  and CCTV footage with 96% evidence
                  correlation confidence.
                </p>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div
            className="
              relative

              flex-1

              flex
              flex-col

              h-[780px]

              overflow-hidden
            "
          >

            {/* GRID OVERLAY */}
            <div
              className="
                absolute inset-0

                opacity-[0.03]

                pointer-events-none

                bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

                bg-[length:24px_24px]
              "
            />

            {/* STATUS BAR */}
            <div
              className="
                relative z-10

                flex
                items-center
                justify-between

                px-8
                py-7

                border-b border-black/5

                backdrop-blur-xl
              "
            >

              <div>

                <h2
                  className="
                    text-3xl
                    font-black

                    text-slate-900
                  "
                >
                  Live Investigation Session
                </h2>

                <p
                  className="
                    text-slate-500

                    mt-2

                    text-sm
                  "
                >
                  Multi-agent forensic intelligence active
                </p>
              </div>

              {/* STATUS */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-3

                  px-5
                  py-3

                  rounded-full

                  bg-emerald-500/10

                  border border-emerald-500/20

                  text-emerald-700
                  text-sm
                  font-bold
                "
              >

                <div
                  className="
                    w-2.5
                    h-2.5

                    rounded-full

                    bg-emerald-500

                    animate-pulse
                  "
                />

                ACTIVE
              </div>
            </div>

            {/* UPLOAD STATUS */}
            {uploading && (

              <div
                className="
                  relative z-10

                  mx-8
                  mt-6

                  rounded-[28px]

                  bg-red-500/10

                  border border-red-500/20

                  px-6
                  py-5

                  text-red-700

                  animate-pulse
                "
              >
                Processing forensic PDF evidence...
              </div>
            )}

            {/* MESSAGES */}
            <div
              className="
                relative z-10

                flex-1

                overflow-y-auto

                p-8

                space-y-6
              "
            >

              {messages.map(
                (message, index) => (

                  <div
                    key={index}
                    className={`
                      max-w-[78%]

                      px-6
                      py-5

                      rounded-[30px]

                      text-sm

                      leading-8

                      border

                      backdrop-blur-xl

                      transition-all duration-300

                      ${
                        message.role === "user"
                          ? `
                            ml-auto

                            bg-gradient-to-r
                            from-red-900
                            to-red-700

                            border-red-900/20

                            text-white

                            shadow-[0_10px_35px_rgba(127,29,29,0.2)]
                          `
                          : `
                            bg-white/40

                            border-black/5

                            text-slate-700
                          `
                      }
                    `}
                  >
                    {message.content}
                  </div>
                )
              )}

              {/* LOADING */}
              {loading && (

                <div
                  className="
                    relative

                    w-fit

                    px-6
                    py-5

                    rounded-[28px]

                    bg-red-500/10

                    border border-red-500/20

                    text-red-700

                    backdrop-blur-xl

                    animate-pulse
                  "
                >

                  <div
                    className="
                      absolute

                      top-1/2
                      left-full

                      ml-3

                      w-24
                      h-[2px]

                      bg-gradient-to-r
                      from-red-700
                      to-transparent

                      animate-pulse
                    "
                  />

                  AI is correlating forensic evidence...
                </div>
              )}
            </div>

            {/* INPUT */}
            <div
              className="
                relative z-10

                p-6

                border-t border-black/5

                backdrop-blur-xl
              "
            >

              <div className="flex items-center gap-4">

                {/* UPLOAD */}
                <label
                  className="
                    w-16
                    h-16

                    flex
                    items-center
                    justify-center

                    rounded-[24px]

                    bg-white/40

                    border border-black/5

                    cursor-pointer

                    text-red-700

                    hover:bg-red-900/5
                    hover:border-red-900/10

                    transition-all duration-300
                  "
                >

                  <Paperclip size={22} />

                  <input
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={uploadPDF}
                  />
                </label>

                {/* INPUT */}
                <input
                  type="text"
                  value={question}
                  onChange={(e) =>
                    setQuestion(e.target.value)
                  }
                  placeholder="Ask AI to reconstruct the investigation timeline..."
                  className="
                    flex-1

                    h-16

                    rounded-[24px]

                    bg-white/40

                    border border-black/5

                    px-6

                    text-slate-800

                    outline-none

                    backdrop-blur-xl

                    placeholder:text-slate-400

                    focus:border-red-900/15

                    transition-all duration-300
                  "
                />

                {/* SEND */}
                <button
                  onClick={sendMessage}
                  className="
                    group

                    relative
                    overflow-hidden

                    w-16
                    h-16

                    rounded-[24px]

                    bg-gradient-to-br
                    from-red-900
                    to-red-700

                    text-white

                    flex
                    items-center
                    justify-center

                    shadow-[0_10px_35px_rgba(127,29,29,0.3)]

                    transition-all duration-300

                    hover:scale-105
                  "
                >

                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}

export default AIAgent;