import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
  Sparkles,
} from "lucide-react";

function AnalyticsChart({
  chartData = [],
  title = "Case Analytics",
  subtitle = "Monthly forensic investigation trends",
  dataKey = "cases",
  xKey = "month",
}) {

  // DON'T RENDER IF EMPTY
  if (!chartData.length) {
    return null;
  }

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

        h-[460px]
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

      {/* CONNECTION STRING */}
      <div
        className="
          absolute

          top-24
          right-10

          w-44
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-red-700
          to-transparent

          rotate-[18deg]

          opacity-40

          shadow-[0_0_16px_rgba(127,29,29,0.4)]

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

            FORENSIC ANALYTICS
          </div>

          {/* TITLE */}
          <h2
            className="
              text-3xl
              font-black

              text-slate-900
            "
          >
            {title}
          </h2>

          {/* SUBTITLE */}
          <p
            className="
              text-slate-500

              mt-3

              leading-7
            "
          >
            {subtitle}
          </p>
        </div>

        {/* RIGHT ICON */}
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

          <TrendingUp
            size={28}
            className="
              relative z-10

              text-red-800
            "
          />
        </div>
      </div>

      {/* CHART */}
      <div
        className="
          relative z-10

          h-[300px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={chartData}>

            {/* GRID */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(15,23,42,0.08)"
              vertical={false}
            />

            {/* X AXIS */}
            <XAxis
              dataKey={xKey}
              stroke="#94a3b8"
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y AXIS */}
            <YAxis
              stroke="#94a3b8"
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip
              cursor={{
                stroke: "rgba(127,29,29,0.2)",
                strokeWidth: 2,
              }}
              contentStyle={{
                background:
                  "rgba(255,255,255,0.8)",

                backdropFilter:
                  "blur(18px)",

                border:
                  "1px solid rgba(127,29,29,0.08)",

                borderRadius: "24px",

                boxShadow:
                  "0 10px 40px rgba(15,23,42,0.08)",

                color: "#0f172a",

                fontWeight: 600,
              }}
              labelStyle={{
                color: "#7f1d1d",
                fontWeight: 700,
              }}
            />

            {/* LINE GLOW */}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="rgba(127,29,29,0.18)"
              strokeWidth={10}
              dot={false}
              activeDot={false}
            />

            {/* MAIN LINE */}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#991b1b"
              strokeWidth={4}

              dot={{
                r: 5,
                fill: "#991b1b",
                strokeWidth: 3,
                stroke: "#ffffff",
              }}

              activeDot={{
                r: 8,
                fill: "#7f1d1d",
                stroke: "#ffffff",
                strokeWidth: 4,
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsChart;