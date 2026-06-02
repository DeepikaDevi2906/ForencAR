import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        overflow-hidden

        bg-gradient-to-br
        from-[#f7f4ef]
        via-[#f2eee8]
        to-[#ebe5dc]

        text-slate-900
      "
    >

      {/* -------------------------------- */}
      {/* CINEMATIC AMBIENT LIGHT */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          -top-20
          -left-20

          w-[700px]
          h-[700px]

          rounded-full
          bg-white/40

          blur-3xl

          opacity-80

          animate-pulse

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0

          w-[600px]
          h-[600px]

          rounded-full
          bg-red-200/20

          blur-3xl

          opacity-70

          animate-pulse

          pointer-events-none
        "
      />

      {/* -------------------------------- */}
      {/* PAPER TEXTURE */}
      {/* -------------------------------- */}

      <div
        className="
          absolute inset-0

          opacity-[0.025]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:26px_26px]
        "
      />

      {/* -------------------------------- */}
      {/* FLOATING DUST */}
      {/* -------------------------------- */}

      <div className="absolute top-20 left-32 w-2 h-2 rounded-full bg-black/5 blur-[1px] animate-pulse" />

      <div className="absolute top-72 right-44 w-1 h-1 rounded-full bg-red-900/15 blur-[1px] animate-ping" />

      <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full bg-black/5 blur-[1px] animate-bounce" />

      <div className="absolute bottom-20 right-1/4 w-1 h-1 rounded-full bg-red-800/20 blur-[1px] animate-pulse" />

      {/* -------------------------------- */}
      {/* RED STRING CONNECTIONS */}
      {/* -------------------------------- */}

      {/* STRING 1 */}
      <div
        className="
          absolute
          top-[180px]
          left-[240px]

          w-[260px]
          h-[2px]

          bg-gradient-to-r
          from-red-900
          via-red-600
          to-red-900

          rotate-[10deg]

          shadow-[0_0_14px_rgba(127,29,29,0.45)]

          animate-pulse

          pointer-events-none
        "
      />

      {/* STRING 2 */}
      <div
        className="
          absolute
          top-[340px]
          left-[480px]

          w-[220px]
          h-[2px]

          bg-gradient-to-r
          from-red-900
          via-red-500
          to-red-900

          -rotate-[15deg]

          shadow-[0_0_14px_rgba(127,29,29,0.45)]

          animate-pulse

          pointer-events-none
        "
      />

      {/* NODE 1 */}
      <div
        className="
          absolute
          top-[172px]
          left-[232px]

          w-4
          h-4

          rounded-full

          bg-red-900

          shadow-[0_0_18px_rgba(127,29,29,0.65)]

          animate-ping

          pointer-events-none
        "
      />

      {/* NODE 2 */}
      <div
        className="
          absolute
          top-[332px]
          left-[690px]

          w-4
          h-4

          rounded-full

          bg-red-800

          shadow-[0_0_18px_rgba(127,29,29,0.65)]

          animate-pulse

          pointer-events-none
        "
      />

      {/* -------------------------------- */}
      {/* SIDEBAR */}
      {/* -------------------------------- */}

      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* -------------------------------- */}
      {/* MAIN CONTENT */}
      {/* -------------------------------- */}

      <div className="relative z-10 flex-1 flex flex-col">

        {/* NAVBAR */}
        <div
          className="
            backdrop-blur-2xl
            border-b border-black/5

            bg-white/20
          "
        >
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <main
          className="
            relative
            flex-1
            p-8
            overflow-y-auto
          "
        >

          {/* LIGHT DRIFT */}
          <div
            className="
              absolute inset-0

              bg-gradient-to-br
              from-white/10
              via-transparent
              to-red-100/5

              pointer-events-none
            "
          />

          {/* SOFT SHADOW OVERLAY */}
          <div
            className="
              absolute inset-0

              shadow-[inset_0_0_120px_rgba(0,0,0,0.03)]

              pointer-events-none
            "
          />

          <div className="relative z-10">
            {children}
          </div>

        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;