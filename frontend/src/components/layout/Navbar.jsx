import {
  Bell,
  Search,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../context/AuthContext";

function Navbar() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (
    <div
      className="
        relative

        flex
        items-center
        justify-between

        mb-8

        px-6
        py-5

        rounded-[30px]

        bg-white/28
        backdrop-blur-2xl

        border border-black/5

        shadow-[0_20px_80px_rgba(15,23,42,0.05)]

        overflow-hidden
      "
    >

      {/* -------------------------------- */}
      {/* LIGHT DRIFT */}
      {/* -------------------------------- */}

      <div
        className="
          absolute inset-0

          bg-gradient-to-r
          from-white/20
          via-transparent
          to-red-100/10

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
      {/* RED STRING CONNECTION */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          top-[38px]
          left-[420px]

          w-[140px]
          h-[2px]

          bg-gradient-to-r
          from-red-900
          via-red-600
          to-red-900

          rotate-[4deg]

          shadow-[0_0_12px_rgba(127,29,29,0.45)]

          animate-pulse

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-[30px]
          left-[412px]

          w-3
          h-3

          rounded-full

          bg-red-900

          shadow-[0_0_18px_rgba(127,29,29,0.65)]

          animate-ping

          pointer-events-none
        "
      />

      {/* -------------------------------- */}
      {/* LEFT */}
      {/* -------------------------------- */}

      <div className="relative z-10 flex items-center gap-5">

        {/* AI BADGE */}
        <div
          className="
            hidden lg:flex

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

            backdrop-blur-xl
          "
        >

          <Sparkles size={12} />

          LIVE AI ANALYSIS
        </div>

        {/* SEARCH */}
        <div
          className="
            flex
            items-center
            gap-3

            bg-white/35
            backdrop-blur-2xl

            border border-black/5

            rounded-[22px]

            px-5
            py-4

            w-[420px]

            shadow-[0_12px_40px_rgba(15,23,42,0.04)]

            hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]

            transition-all duration-500
          "
        >

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search evidence, cases, suspects..."
            className="
              bg-transparent
              outline-none

              text-slate-800

              flex-1

              placeholder:text-slate-400
            "
          />
        </div>
      </div>

      {/* -------------------------------- */}
      {/* RIGHT */}
      {/* -------------------------------- */}

      <div className="relative z-10 flex items-center gap-4">

        {/* NOTIFICATION */}
        <button
          className="
            relative

            w-14
            h-14

            rounded-[22px]

            bg-white/35
            backdrop-blur-2xl

            border border-black/5

            flex
            items-center
            justify-center

            text-slate-700

            shadow-[0_12px_40px_rgba(15,23,42,0.04)]

            hover:scale-[1.03]
            hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]

            transition-all duration-500
          "
        >

          {/* ALERT DOT */}
          <div
            className="
              absolute
              top-3
              right-3

              w-2
              h-2

              rounded-full

              bg-red-700

              animate-pulse
            "
          />

          <Bell size={18} />
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            relative
            overflow-hidden

            flex
            items-center
            gap-3

            px-6
            py-4

            rounded-[22px]

            bg-red-900/5
            backdrop-blur-2xl

            border border-red-900/10

            text-red-800

            shadow-[0_12px_40px_rgba(127,29,29,0.06)]

            hover:bg-red-900/10
            hover:scale-[1.02]

            transition-all duration-500
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute inset-0

              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent

              opacity-0
              hover:opacity-100

              transition-all duration-700
            "
          />

          <LogOut size={18} />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;