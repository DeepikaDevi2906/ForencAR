function Loader({
  text = "Initializing Forensic AI...",
}) {

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        overflow-hidden

        bg-[#070b14]
      "
    >

      {/* BACKGROUND RADIAL LIGHT */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top_right,rgba(127,29,29,0.18),transparent_28%)]

          pointer-events-none
        "
      />

      {/* PAPER TEXTURE */}
      <div
        className="
          absolute inset-0

          opacity-[0.025]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)]

          bg-[length:26px_26px]
        "
      />

      {/* RED STRING */}
      <div
        className="
          absolute

          top-1/2
          left-1/2

          w-[340px]
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-red-700
          to-transparent

          rotate-[12deg]

          opacity-40

          shadow-[0_0_16px_rgba(127,29,29,0.45)]

          animate-pulse
        "
      />

      {/* SECOND STRING */}
      <div
        className="
          absolute

          top-1/2
          left-1/2

          w-[280px]
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-red-500
          to-transparent

          -rotate-[18deg]

          opacity-30

          shadow-[0_0_16px_rgba(127,29,29,0.45)]

          animate-pulse
        "
      />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative
          z-10

          flex
          flex-col
          items-center

          px-16
          py-14

          rounded-[42px]

          bg-white/5
          backdrop-blur-2xl

          border border-white/10

          shadow-[0_20px_80px_rgba(15,23,42,0.45)]
        "
      >

        {/* AMBIENT GLOW */}
        <div
          className="
            absolute
            top-0
            right-0

            w-56
            h-56

            rounded-full

            bg-red-500/10

            blur-3xl

            pointer-events-none
          "
        />

        {/* BADGE */}
        <div
          className="
            inline-flex
            items-center
            gap-2

            px-4
            py-2

            rounded-full

            bg-red-900/10
            border border-red-900/20

            text-red-300
            text-[11px]
            font-bold

            tracking-[3px]

            mb-8
          "
        >
          FORENSIC INTELLIGENCE SYSTEM
        </div>

        {/* LOADER */}
        <div
          className="
            relative

            w-36
            h-36

            flex
            items-center
            justify-center
          "
        >

          {/* OUTER RING */}
          <div
            className="
              absolute
              inset-0

              rounded-full

              border-[3px]
              border-red-900/20
            "
          />

          {/* SPINNING RING */}
          <div
            className="
              absolute
              inset-0

              rounded-full

              border-[3px]
              border-transparent

              border-t-red-700
              border-r-red-500

              animate-spin
            "
          />

          {/* SECOND RING */}
          <div
            className="
              absolute

              w-24
              h-24

              rounded-full

              border
              border-red-500/20
            "
          />

          {/* PULSE CORE */}
          <div
            className="
              relative

              w-14
              h-14

              rounded-full

              bg-gradient-to-br
              from-red-700
              to-red-900

              shadow-[0_0_40px_rgba(127,29,29,0.8)]

              animate-pulse
            "
          >

            {/* INNER LIGHT */}
            <div
              className="
                absolute
                inset-2

                rounded-full

                bg-red-300/20

                blur-md
              "
            />
          </div>

          {/* SCANNING DOT */}
          <div
            className="
              absolute

              top-2
              left-1/2

              -translate-x-1/2

              w-3
              h-3

              rounded-full

              bg-red-400

              shadow-[0_0_14px_rgba(248,113,113,0.8)]

              animate-ping
            "
          />
        </div>

        {/* TITLE */}
        <h2
          className="
            mt-10

            text-2xl
            font-black

            text-white

            tracking-wide
          "
        >
          {text}
        </h2>

        {/* SUBTEXT */}
        <p
          className="
            text-slate-400

            mt-3

            text-sm

            tracking-[2px]

            uppercase
          "
        >
          AI-Powered Crime Scene Analysis
        </p>

        {/* DOTS */}
        <div
          className="
            flex
            items-center
            gap-3

            mt-8
          "
        >

          <div
            className="
              w-3
              h-3

              rounded-full

              bg-red-500

              animate-bounce

              shadow-[0_0_14px_rgba(239,68,68,0.8)]
            "
          />

          <div
            className="
              w-3
              h-3

              rounded-full

              bg-red-500

              animate-bounce

              [animation-delay:0.2s]

              shadow-[0_0_14px_rgba(239,68,68,0.8)]
            "
          />

          <div
            className="
              w-3
              h-3

              rounded-full

              bg-red-500

              animate-bounce

              [animation-delay:0.4s]

              shadow-[0_0_14px_rgba(239,68,68,0.8)]
            "
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;