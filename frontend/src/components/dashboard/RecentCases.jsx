import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Sparkles,
  FolderSearch,
} from "lucide-react";

const recentCases = [
  {
    id: "CASE-104",
    title: "Suspicious Death Investigation",
    location: "Chennai",
    date: "09 Aug 2026",
    status: "Critical",
  },

  {
    id: "CASE-105",
    title: "Missing Person Analysis",
    location: "Bangalore",
    date: "11 Aug 2026",
    status: "Active",
  },

  {
    id: "CASE-106",
    title: "Homicide Evidence Correlation",
    location: "Hyderabad",
    date: "14 Aug 2026",
    status: "Critical",
  },

  {
    id: "CASE-107",
    title: "Digital Metadata Investigation",
    location: "Mumbai",
    date: "17 Aug 2026",
    status: "Resolved",
  },
];

function RecentCases() {

  const statusStyles = {

    Critical: {
      text: "text-red-700",
      bg: "bg-red-900/10",
      border: "border-red-900/20",
      dot: "bg-red-500",
    },

    Active: {
      text: "text-amber-700",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      dot: "bg-amber-400",
    },

    Resolved: {
      text: "text-emerald-700",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      dot: "bg-emerald-500",
    },
  };

  return (

    <div
      className="
        relative
        overflow-hidden

        rounded-[40px]

        bg-white/30
        backdrop-blur-2xl

        border border-black/5

        shadow-[0_20px_80px_rgba(15,23,42,0.08)]

        p-8
      "
    >

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

      {/* RED AMBIENT LIGHT */}
      <div
        className="
          absolute
          top-0
          right-0

          w-72
          h-72

          rounded-full

          bg-red-500/10

          blur-3xl

          pointer-events-none
        "
      />

      {/* HEADER */}
      <div
        className="
          relative z-10

          flex
          items-start
          justify-between

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

              mb-5
            "
          >
            <Sparkles size={12} />

            ACTIVE INVESTIGATIONS
          </div>

          {/* TITLE */}
          <h2
            className="
              text-3xl
              font-black

              text-slate-900
            "
          >
            Recent Cases
          </h2>

          {/* SUBTITLE */}
          <p
            className="
              text-slate-500

              mt-3

              leading-7
            "
          >
            Latest AI-assisted forensic investigations
            and active evidence tracking records.
          </p>
        </div>

        {/* ICON */}
        <div
          className="
            relative

            w-16
            h-16

            rounded-[24px]

            bg-red-900/5

            border border-red-900/10

            flex
            items-center
            justify-center

            shadow-[0_0_30px_rgba(127,29,29,0.08)]
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute
              inset-0

              rounded-[24px]

              bg-red-500/10

              blur-xl
            "
          />

          <FolderSearch
            size={28}
            className="
              relative z-10

              text-red-800
            "
          />
        </div>
      </div>

      {/* CASE LIST */}
      <div
        className="
          relative z-10

          space-y-6
        "
      >

        {recentCases.map((item, index) => {

          const currentStatus =
            statusStyles[item.status];

          return (

            <div
              key={index}
              className="
                group
                relative
                overflow-hidden

                rounded-[30px]

                bg-white/40
                backdrop-blur-xl

                border border-black/5

                p-6

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                transition-all duration-500

                hover:-translate-y-1
                hover:border-red-900/10
                hover:shadow-[0_20px_50px_rgba(127,29,29,0.08)]
              "
            >

              {/* HOVER GLOW */}
              <div
                className="
                  absolute
                  -inset-1

                  rounded-[30px]

                  bg-gradient-to-r
                  from-transparent
                  via-red-500/5
                  to-transparent

                  opacity-0

                  group-hover:opacity-100

                  blur-xl

                  transition-all duration-500

                  pointer-events-none
                "
              />

              {/* RED STRING */}
              <div
                className="
                  absolute

                  top-8
                  right-20

                  w-24
                  h-[2px]

                  bg-gradient-to-r
                  from-transparent
                  via-red-700
                  to-transparent

                  rotate-[16deg]

                  opacity-0

                  group-hover:opacity-40

                  transition-all duration-500

                  shadow-[0_0_14px_rgba(127,29,29,0.4)]
                "
              />

              <div
                className="
                  relative z-10

                  flex
                  items-start
                  justify-between

                  gap-8
                "
              >

                {/* LEFT */}
                <div className="flex-1">

                  {/* CASE ID */}
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2

                      px-3
                      py-1.5

                      rounded-full

                      bg-red-900/5
                      border border-red-900/10

                      text-[10px]
                      font-black

                      tracking-[2.5px]

                      text-red-800

                      mb-5
                    "
                  >

                    <div
                      className="
                        w-2
                        h-2

                        rounded-full

                        bg-red-600

                        animate-pulse
                      "
                    />

                    {item.id}
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-2xl
                      font-black

                      text-slate-900

                      leading-snug
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DETAILS */}
                  <div
                    className="
                      flex
                      flex-wrap
                      gap-6

                      mt-6
                    "
                  >

                    {/* LOCATION */}
                    <div
                      className="
                        flex
                        items-center
                        gap-3

                        text-sm
                        text-slate-500
                      "
                    >

                      <div
                        className="
                          w-10
                          h-10

                          rounded-2xl

                          bg-red-900/5

                          border border-red-900/10

                          flex
                          items-center
                          justify-center
                        "
                      >
                        <MapPin
                          size={16}
                          className="text-red-700"
                        />
                      </div>

                      <span className="font-medium">
                        {item.location}
                      </span>
                    </div>

                    {/* DATE */}
                    <div
                      className="
                        flex
                        items-center
                        gap-3

                        text-sm
                        text-slate-500
                      "
                    >

                      <div
                        className="
                          w-10
                          h-10

                          rounded-2xl

                          bg-red-900/5

                          border border-red-900/10

                          flex
                          items-center
                          justify-center
                        "
                      >
                        <CalendarDays
                          size={16}
                          className="text-red-700"
                        />
                      </div>

                      <span className="font-medium">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                    flex
                    flex-col
                    items-end

                    gap-6
                  "
                >

                  {/* STATUS */}
                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-2

                      px-4
                      py-2.5

                      rounded-full

                      border

                      text-[11px]
                      font-black

                      tracking-[1.5px]

                      uppercase

                      backdrop-blur-xl

                      ${currentStatus.bg}
                      ${currentStatus.border}
                      ${currentStatus.text}
                    `}
                  >

                    <div
                      className={`
                        w-2
                        h-2

                        rounded-full

                        animate-pulse

                        ${currentStatus.dot}
                      `}
                    />

                    {item.status}
                  </div>

                  {/* BUTTON */}
                  <button
                    className="
                      group/button

                      flex
                      items-center
                      gap-2

                      text-sm
                      font-semibold

                      text-red-700

                      transition-all duration-300

                      hover:text-red-900
                    "
                  >

                    <span>
                      Open Case
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform duration-300

                        group-hover/button:translate-x-1
                        group-hover/button:-translate-y-1
                      "
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentCases;