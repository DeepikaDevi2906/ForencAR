import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Camera,
  Bot,
  Box,
  Sparkles,
  Mic,
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      name: "Cases",
      icon: <FolderKanban size={20} />,
      path: "/cases",
    },

    {
      name: "Evidence Vault",
      icon: <FileText size={20} />,
      path: "/evidence",
    },

    {
      name: "CCTV Analysis",
      icon: <Camera size={20} />,
      path: "/cctv-analysis",
    },

    {
      name: "Crime Scene 3D",
      icon: <Box size={20} />,
      path: "/crime-scene-3d",
    },
    {
    name: "Voice Analysis",
    icon: <Mic size={20} />,
    path: "/voice-analysis",
  },
    {
      name: "AI Agent",
      icon: <Bot size={20} />,
      path: "/ai-agent",
    },

    {
      name: "Reports",
      icon: <FileText size={20} />,
      path: "/reports",
    },
  ];

  return (
    <div
      className="
        relative

        w-[290px]
        min-h-screen

        bg-white/22
        backdrop-blur-2xl

        border-r border-black/5

        p-6

        overflow-hidden

        shadow-[0_20px_80px_rgba(15,23,42,0.05)]
      "
    >

      {/* -------------------------------- */}
      {/* AMBIENT LIGHT */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          -top-10
          -left-10

          w-[300px]
          h-[300px]

          rounded-full

          bg-white/40

          blur-3xl

          opacity-70

          animate-pulse

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0

          w-[250px]
          h-[250px]

          rounded-full

          bg-red-200/15

          blur-3xl

          opacity-60

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

          opacity-[0.02]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:22px_22px]
        "
      />

      {/* -------------------------------- */}
      {/* RED STRING CONNECTIONS */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          top-[220px]
          left-[40px]

          w-[170px]
          h-[2px]

          bg-gradient-to-r
          from-red-900
          via-red-600
          to-red-900

          rotate-[16deg]

          shadow-[0_0_12px_rgba(127,29,29,0.45)]

          animate-pulse

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-[340px]
          left-[120px]

          w-[120px]
          h-[2px]

          bg-gradient-to-r
          from-red-900
          via-red-500
          to-red-900

          -rotate-[20deg]

          shadow-[0_0_12px_rgba(127,29,29,0.45)]

          animate-pulse

          pointer-events-none
        "
      />

      {/* NODE */}
      <div
        className="
          absolute
          top-[212px]
          left-[32px]

          w-4
          h-4

          rounded-full

          bg-red-900

          shadow-[0_0_18px_rgba(127,29,29,0.65)]

          animate-ping

          pointer-events-none
        "
      />

      {/* -------------------------------- */}
      {/* CONTENT */}
      {/* -------------------------------- */}

      <div className="relative z-10">

        {/* LOGO */}
        <div className="mb-14">

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
              text-xs
              font-bold
              tracking-[2px]

              shadow-[0_0_20px_rgba(127,29,29,0.06)]

              mb-5
            "
          >

            <Sparkles size={12} />

            LIVE FORENSIC AI
          </div>

          {/* TITLE */}
          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            ForensAR
          </h1>

          <p
            className="
              text-slate-500
              mt-3
              text-sm
              leading-7
            "
          >
            AI-powered forensic investigation
            and evidence intelligence system
          </p>
        </div>

        {/* MENU */}
        <div className="space-y-3">

          {menuItems.map((item, index) => {

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  group
                  relative
                  overflow-hidden

                  flex
                  items-center
                  gap-4

                  px-5
                  py-4

                  rounded-[24px]

                  transition-all duration-500

                  backdrop-blur-xl

                  ${
                    active
                      ? `
                        bg-red-900/6
                        border border-red-900/10

                        text-red-900

                        shadow-[0_12px_40px_rgba(127,29,29,0.08)]

                        scale-[1.02]
                      `
                      : `
                        bg-white/18

                        border border-black/5

                        text-slate-600

                        hover:bg-white/30
                        hover:text-slate-900

                        hover:scale-[1.02]

                        hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]
                      `
                  }
                `}
              >

                {/* ACTIVE GLOW */}
                {active && (
                  <div
                    className="
                      absolute inset-0

                      bg-gradient-to-r
                      from-red-100/30
                      via-transparent
                      to-transparent

                      pointer-events-none
                    "
                  />
                )}

                {/* ICON */}
                <div
                  className={`
                    relative z-10

                    transition-all duration-500

                    ${
                      active
                        ? "text-red-800"
                        : "text-slate-500 group-hover:text-slate-800"
                    }
                  `}
                >
                  {item.icon}
                </div>

                {/* LABEL */}
                <span
                  className="
                    relative z-10
                    font-semibold
                    tracking-[0.2px]
                  "
                >
                  {item.name}
                </span>

                {/* PULSE DOT */}
                {active && (
                  <div
                    className="
                      ml-auto

                      w-2
                      h-2

                      rounded-full

                      bg-red-700

                      animate-pulse
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* -------------------------------- */}
        {/* BOTTOM PANEL */}
        {/* -------------------------------- */}

        <div
          className="
            mt-12

            rounded-[28px]

            bg-red-900/5
            backdrop-blur-2xl

            border border-red-900/10

            p-5

            shadow-[0_12px_40px_rgba(127,29,29,0.06)]

            relative
            overflow-hidden
          "
        >

          {/* LIGHT */}
          <div
            className="
              absolute
              top-0
              right-0

              w-24
              h-24

              rounded-full

              bg-red-300/20

              blur-2xl
            "
          />

          <div className="relative z-10">

            <p
              className="
                text-xs
                tracking-[2px]
                font-bold

                text-red-800
              "
            >
              AI STATUS
            </p>

            <h3
              className="
                text-2xl
                font-black

                text-slate-900

                mt-3
              "
            >
              ACTIVE
            </h3>

            <p
              className="
                text-slate-500
                text-sm

                leading-7

                mt-3
              "
            >
              Multi-agent forensic intelligence
              currently monitoring evidence
              correlation network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;