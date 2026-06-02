import { useState } from "react";

import {
  Search,
  Sparkles,
} from "lucide-react";

function SearchBar({
  placeholder,
  onSearch,
}) {

  const [query, setQuery] =
    useState("");

  const handleChange = (e) => {

    const value = e.target.value;

    setQuery(value);

    onSearch(value);
  };

  return (

    <div className="relative w-full">

      {/* AMBIENT GLOW */}
      <div
        className="
          absolute
          -inset-1

          rounded-[30px]

          bg-gradient-to-r
          from-red-900/10
          via-red-500/5
          to-red-900/10

          blur-xl

          opacity-70

          pointer-events-none
        "
      />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative

          flex
          items-center
          gap-4

          px-5
          py-4

          rounded-[28px]

          bg-white/30
          backdrop-blur-2xl

          border border-black/5

          shadow-[0_12px_40px_rgba(15,23,42,0.08)]

          transition-all duration-300

          hover:border-red-900/10
          focus-within:border-red-900/20

          focus-within:shadow-[0_0_35px_rgba(127,29,29,0.08)]
        "
      >

        {/* SEARCH ICON */}
        <div
          className="
            w-12
            h-12

            rounded-2xl

            bg-red-900/5

            border border-red-900/10

            flex
            items-center
            justify-center

            shrink-0
          "
        >
          <Search
            size={18}
            className="text-red-800"
          />
        </div>

        {/* INPUT */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="
            w-full

            bg-transparent

            border-none
            outline-none

            text-slate-800

            placeholder:text-slate-400

            text-[15px]
            font-medium
          "
        />

        {/* STATUS BADGE */}
        <div
          className="
            hidden
            md:flex

            items-center
            gap-2

            px-4
            py-2

            rounded-full

            bg-red-900/5

            border border-red-900/10

            text-[11px]
            font-bold

            tracking-[2px]

            text-red-800

            shrink-0
          "
        >
          <Sparkles size={12} />

          LIVE SEARCH
        </div>
      </div>

      {/* PAPER TEXTURE */}
      <div
        className="
          absolute inset-0

          rounded-[28px]

          opacity-[0.02]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:24px_24px]
        "
      />
    </div>
  );
}

export default SearchBar;