import React from "react";

import CCTVUploader from "../components/cctv/CCTVUploader";

import DashboardLayout from "../components/layout/DashboardLayout";

function CCTVAnalysis() {

  return (

    <DashboardLayout>

      <div
        className="
          relative
          min-h-screen
          overflow-hidden

          bg-gradient-to-br
          from-[#f7f4ef]
          via-[#f2eee8]
          to-[#ebe5dc]

          text-slate-900
        "
      >

        {/* ================================= */}
        {/* CINEMATIC LIGHTING */}
        {/* ================================= */}

        <div
          className="
            absolute
            -top-32
            -left-32

            w-[800px]
            h-[800px]

            rounded-full

            bg-white/50

            blur-3xl

            opacity-90

            animate-pulse

            pointer-events-none
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0

            w-[700px]
            h-[700px]

            rounded-full

            bg-red-200/20

            blur-3xl

            opacity-80

            animate-pulse

            pointer-events-none
          "
        />

        {/* ================================= */}
        {/* PAPER TEXTURE */}
        {/* ================================= */}

        <div
          className="
            absolute inset-0

            opacity-[0.025]

            pointer-events-none

            bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

            bg-[length:26px_26px]
          "
        />

        {/* ================================= */}
        {/* FLOATING DUST */}
        {/* ================================= */}

        <div className="absolute top-24 left-40 w-2 h-2 rounded-full bg-black/5 blur-[1px] animate-pulse" />

        <div className="absolute top-72 right-44 w-1 h-1 rounded-full bg-red-900/15 blur-[1px] animate-ping" />

        <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full bg-black/5 blur-[1px] animate-bounce" />

        <div className="absolute bottom-20 right-1/4 w-1 h-1 rounded-full bg-red-800/20 blur-[1px] animate-pulse" />

        {/* ================================= */}
        {/* RED STRINGS */}
        {/* ================================= */}

        <div
          className="
            absolute
            top-[180px]
            left-[220px]

            w-[320px]
            h-[2px]

            bg-gradient-to-r
            from-red-950
            via-red-700
            to-red-950

            rotate-[11deg]

            shadow-[0_0_18px_rgba(127,29,29,0.55)]

            animate-pulse

            pointer-events-none
          "
        />

        <div
          className="
            absolute
            top-[320px]
            left-[500px]

            w-[260px]
            h-[2px]

            bg-gradient-to-r
            from-red-950
            via-red-600
            to-red-950

            -rotate-[14deg]

            shadow-[0_0_18px_rgba(127,29,29,0.55)]

            animate-pulse

            pointer-events-none
          "
        />

        <div
          className="
            absolute
            top-[500px]
            left-[340px]

            w-[300px]
            h-[2px]

            bg-gradient-to-r
            from-red-950
            via-red-500
            to-red-950

            rotate-[7deg]

            shadow-[0_0_18px_rgba(127,29,29,0.55)]

            animate-pulse

            pointer-events-none
          "
        />

        {/* ================================= */}
        {/* STRING NODES */}
        {/* ================================= */}

        <div
          className="
            absolute
            top-[172px]
            left-[214px]

            w-4
            h-4

            rounded-full

            bg-red-900

            shadow-[0_0_20px_rgba(127,29,29,0.75)]

            animate-ping
          "
        />

        <div
          className="
            absolute
            top-[312px]
            left-[748px]

            w-4
            h-4

            rounded-full

            bg-red-800

            shadow-[0_0_20px_rgba(127,29,29,0.75)]

            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-[492px]
            left-[628px]

            w-4
            h-4

            rounded-full

            bg-red-700

            shadow-[0_0_20px_rgba(127,29,29,0.75)]

            animate-ping
          "
        />

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header
          className="
            relative

            overflow-hidden

            backdrop-blur-2xl

            border-b border-black/5

            bg-white/20

            px-10
            py-7
          "
        >

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent

              translate-x-[-100%]

              animate-[shine_5s_linear_infinite]
            "
          />

          <div className="relative z-10">

            <h2
              className="
                text-5xl

                font-black

                tracking-[0.12em]

                uppercase

                text-slate-900
              "
            >
              CCTV ANALYSIS
            </h2>

            <p
              className="
                mt-3

                text-sm

                tracking-[0.25em]

                uppercase

                text-red-700
              "
            >
              AI POWERED FORENSIC INVESTIGATION BOARD
            </p>

          </div>

        </header>

        {/* ================================= */}
        {/* PAGE */}
        {/* ================================= */}

        <div className="relative p-8">

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

          <div className="relative z-10">

            <CCTVUploader />

          </div>

        </div>

        {/* ================================= */}
        {/* SHINE ANIMATION */}
        {/* ================================= */}

        <style>{`
          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>

      </div>

    </DashboardLayout>
  );
}

export default CCTVAnalysis;