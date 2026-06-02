import {
  SearchX,
  Sparkles,
} from "lucide-react";

import CaseCard from "./CaseCard";

function CaseList({ cases }) {

  return (

    <div className="relative">

      {/* -------------------------------- */}
      {/* PAPER TEXTURE */}
      {/* -------------------------------- */}

      <div
        className="
          absolute inset-0

          opacity-[0.02]

          pointer-events-none

          bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

          bg-[length:26px_26px]
        "
      />

      {/* -------------------------------- */}
      {/* RED STRING CONNECTIONS */}
      {/* -------------------------------- */}

      {cases.length > 1 && (
        <>
          {/* STRING 1 */}
          <div
            className="
              absolute
              top-[180px]
              left-[300px]

              w-[260px]
              h-[2px]

              bg-gradient-to-r
              from-red-900
              via-red-600
              to-red-900

              rotate-[14deg]

              shadow-[0_0_14px_rgba(127,29,29,0.45)]

              animate-pulse

              opacity-60

              pointer-events-none
            "
          />

          {/* STRING 2 */}
          <div
            className="
              absolute
              top-[420px]
              left-[620px]

              w-[220px]
              h-[2px]

              bg-gradient-to-r
              from-red-900
              via-red-500
              to-red-900

              -rotate-[18deg]

              shadow-[0_0_14px_rgba(127,29,29,0.45)]

              animate-pulse

              opacity-50

              pointer-events-none
            "
          />

          {/* NODE 1 */}
          <div
            className="
              absolute
              top-[172px]
              left-[292px]

              w-4
              h-4

              rounded-full

              bg-red-900

              shadow-[0_0_18px_rgba(127,29,29,0.65)]

              animate-ping

              opacity-70

              pointer-events-none
            "
          />

          {/* NODE 2 */}
          <div
            className="
              absolute
              top-[410px]
              left-[832px]

              w-4
              h-4

              rounded-full

              bg-red-800

              shadow-[0_0_18px_rgba(127,29,29,0.65)]

              animate-pulse

              opacity-70

              pointer-events-none
            "
          />
        </>
      )}

      {/* -------------------------------- */}
      {/* EMPTY STATE */}
      {/* -------------------------------- */}

      {cases.length === 0 ? (

        <div
          className="
            relative
            overflow-hidden

            flex
            flex-col
            items-center
            justify-center

            py-28

            rounded-[40px]

            bg-white/30
            backdrop-blur-2xl

            border border-black/5

            shadow-[0_20px_80px_rgba(15,23,42,0.08)]

            text-center
          "
        >

          {/* LIGHT */}
          <div
            className="
              absolute
              top-0
              right-0

              w-52
              h-52

              rounded-full

              bg-red-200/20

              blur-3xl
            "
          />

          <div className="relative z-10">

            {/* ICON */}
            <div
              className="
                w-24
                h-24

                rounded-[30px]

                bg-red-900/5
                border border-red-900/10

                flex
                items-center
                justify-center

                mx-auto

                shadow-[0_0_40px_rgba(127,29,29,0.08)]

                mb-8
              "
            >

              <SearchX
                size={34}
                className="text-red-800"
              />
            </div>

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

                mb-6
              "
            >

              <Sparkles size={12} />

              FORENSIC NETWORK IDLE
            </div>

            {/* TITLE */}
            <h2
              className="
                text-3xl
                font-black

                text-slate-900
              "
            >
              No Cases Found
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-slate-500

                mt-5

                max-w-xl

                leading-8
              "
            >
              The AI forensic intelligence network
              could not locate any active investigation
              records matching the current search query.
            </p>
          </div>
        </div>

      ) : (

        /* -------------------------------- */
        /* GRID */
        /* -------------------------------- */

        <div
          className="
            relative z-10

            grid
            grid-cols-3
            gap-7
          "
        >

          {cases.map((item, index) => (

            <div
              key={item.id}
              className="
                relative

                transition-all duration-700

                hover:z-20
              "
              style={{
                animationDelay:
                  `${index * 120}ms`,
              }}
            >

              {/* CONNECTION GLOW */}
              <div
                className="
                  absolute
                  -inset-2

                  rounded-[38px]

                  bg-gradient-to-r
                  from-transparent
                  via-red-200/10
                  to-transparent

                  opacity-0
                  hover:opacity-100

                  blur-xl

                  transition-all duration-700

                  pointer-events-none
                "
              />

              <CaseCard
                caseData={{
                  id: item.id,
                  caseId:
                    item.case_number,

                  title:
                    item.title,

                  victim:
                    item.victim_name,

                  location:
                    item.location,

                  date:
                    new Date(
                      item.created_at
                    ).toLocaleDateString(),

                  status:
                    item.status,

                  riskScore:
                    item.risk_score,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CaseList;