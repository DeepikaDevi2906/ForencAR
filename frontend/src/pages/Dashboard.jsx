import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  ShieldAlert,
  FolderKanban,
  FileText,
  Activity,
  Sparkles,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

import StatsCard from "../components/dashboard/StatsCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import ThreatMeter from "../components/dashboard/ThreatMeter";
import RecentCases from "../components/dashboard/RecentCases";

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  // -----------------------------------
  // FETCH DASHBOARD DATA
  // -----------------------------------
  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/dashboard/stats"
          );

        setStats(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      {/* ================================= */}
      {/* MAIN WRAPPER */}
      {/* ================================= */}
      <div
        className="
          relative
          overflow-hidden

          min-h-screen

          rounded-[42px]

          bg-gradient-to-br
          from-[#f7f4ef]
          via-[#f3efe9]
          to-[#ece6dc]

          p-2
        "
      >

        {/* PAPER TEXTURE */}
        <div
          className="
            absolute inset-0

            opacity-[0.025]

            pointer-events-none

            bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

            bg-[length:26px_26px]
          "
        />

        {/* AMBIENT LIGHT */}
        <div
          className="
            absolute
            -top-32
            -left-32

            w-[650px]
            h-[650px]

            rounded-full

            bg-white/40

            blur-3xl

            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0

            w-[520px]
            h-[520px]

            rounded-full

            bg-red-200/20

            blur-3xl

            animate-pulse
          "
        />

        {/* FLOATING DUST */}
        <div className="absolute top-24 left-36 w-2 h-2 rounded-full bg-black/5 animate-pulse" />

        <div className="absolute top-80 right-44 w-1 h-1 rounded-full bg-red-900/20 animate-ping" />

        <div className="absolute bottom-24 left-1/3 w-2 h-2 rounded-full bg-black/5 animate-bounce" />

        {/* RED STRING */}
        <div
          className="
            absolute
            top-[240px]
            left-[330px]

            w-[290px]
            h-[2px]

            bg-gradient-to-r
            from-red-900
            via-red-600
            to-red-900

            rotate-[11deg]

            shadow-[0_0_16px_rgba(127,29,29,0.4)]

            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-[370px]
            left-[560px]

            w-[220px]
            h-[2px]

            bg-gradient-to-r
            from-red-900
            via-red-500
            to-red-900

            -rotate-[17deg]

            shadow-[0_0_16px_rgba(127,29,29,0.4)]

            animate-pulse
          "
        />

        {/* NODES */}
        <div
          className="
            absolute
            top-[232px]
            left-[322px]

            w-4
            h-4

            rounded-full

            bg-red-900

            shadow-[0_0_18px_rgba(127,29,29,0.7)]

            animate-ping
          "
        />

        <div
          className="
            absolute
            top-[360px]
            left-[770px]

            w-4
            h-4

            rounded-full

            bg-red-800

            shadow-[0_0_18px_rgba(127,29,29,0.7)]

            animate-pulse
          "
        />

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}
        <div className="relative z-10">

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}
          <div className="mb-14">

            {/* BADGE */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  px-5
                  py-2.5

                  rounded-full

                  bg-red-900/5

                  border border-red-900/10

                  text-red-800
                  text-xs
                  font-black

                  tracking-[3px]

                  backdrop-blur-xl

                  shadow-[0_0_30px_rgba(127,29,29,0.08)]
                "
              >

                <Sparkles size={14} />

                FORENSIC COMMAND NETWORK
              </div>

              <div
                className="
                  w-2.5
                  h-2.5

                  rounded-full

                  bg-red-700

                  animate-pulse
                "
              />
            </div>

            {/* TITLE */}
            <h1
              className="
                text-6xl
                font-black

                text-slate-900

                tracking-tight

                leading-tight
              "
            >
              Command Center
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6

                max-w-3xl

                text-lg

                leading-9

                text-slate-600
              "
            >
              AI-powered forensic intelligence ecosystem
              for evidence correlation, anomaly detection,
              crime reconstruction, and investigative
              decision support.
            </p>
          </div>

          {/* ================================= */}
          {/* STATS */}
          {/* ================================= */}
          <div className="grid grid-cols-4 gap-6 mb-10">

            {/* CARD */}
            <div
              className="
                rounded-[36px]

                bg-white/35
                backdrop-blur-2xl

                border border-black/5

                overflow-hidden

                shadow-[0_20px_80px_rgba(15,23,42,0.08)]

                transition-all duration-500

                hover:scale-[1.02]
              "
            >
              <StatsCard
                title="TOTAL CASES"
                value={
                  stats?.total_cases || 0
                }
                percentage="+12%"
                trend="up"
                color="cyan"
                icon={
                  <FolderKanban size={28} />
                }
              />
            </div>

            {/* CARD */}
            <div
              className="
                rounded-[36px]

                bg-red-900/5
                backdrop-blur-2xl

                border border-red-900/10

                overflow-hidden

                shadow-[0_0_60px_rgba(127,29,29,0.08)]

                transition-all duration-500

                hover:scale-[1.02]
              "
            >
              <StatsCard
                title="CRITICAL ALERTS"
                value={
                  stats?.critical_alerts || 0
                }
                percentage="+4%"
                trend="up"
                color="red"
                icon={
                  <ShieldAlert size={28} />
                }
              />
            </div>

            {/* CARD */}
            <div
              className="
                rounded-[36px]

                bg-white/35
                backdrop-blur-2xl

                border border-black/5

                overflow-hidden

                shadow-[0_20px_80px_rgba(15,23,42,0.08)]

                transition-all duration-500

                hover:scale-[1.02]
              "
            >
              <StatsCard
                title="EVIDENCE FILES"
                value={
                  stats?.evidence_files || 0
                }
                percentage="+19%"
                trend="up"
                color="yellow"
                icon={
                  <FileText size={28} />
                }
              />
            </div>

            {/* CARD */}
            <div
              className="
                rounded-[36px]

                bg-white/35
                backdrop-blur-2xl

                border border-black/5

                overflow-hidden

                shadow-[0_20px_80px_rgba(15,23,42,0.08)]

                transition-all duration-500

                hover:scale-[1.02]
              "
            >
              <StatsCard
                title="ACTIVE AGENTS"
                value={
                  stats?.active_agents || 0
                }
                percentage="-2%"
                trend="down"
                color="green"
                icon={
                  <Activity size={28} />
                }
              />
            </div>
          </div>

          {/* ================================= */}
          {/* ANALYTICS */}
          {/* ================================= */}
          <div className="grid grid-cols-12 gap-6 mb-10">

            {/* CHART */}
            <div
              className="
                relative

                col-span-8

                rounded-[40px]

                bg-white/35
                backdrop-blur-2xl

                border border-black/5

                p-4

                overflow-hidden

                shadow-[0_20px_80px_rgba(15,23,42,0.08)]

                transition-all duration-500
              "
            >

              {/* LIGHT */}
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

              <div className="relative z-10">

                <AnalyticsChart />
              </div>
            </div>

            {/* THREAT */}
            <div
              className="
                col-span-4

                rounded-[40px]

                bg-white/35
                backdrop-blur-2xl

                border border-black/5

                p-4

                overflow-hidden

                shadow-[0_20px_80px_rgba(15,23,42,0.08)]

                transition-all duration-500
              "
            >

              <ThreatMeter
                threatLevel={
                  stats?.threat_level || 0
                }
                status="HIGH"
              />
            </div>
          </div>

          {/* ================================= */}
          {/* RECENT CASES */}
          {/* ================================= */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[42px]

              bg-white/35
              backdrop-blur-2xl

              border border-black/5

              p-4

              shadow-[0_20px_80px_rgba(15,23,42,0.08)]

              transition-all duration-500
            "
          >

            {/* TEXTURE */}
            <div
              className="
                absolute inset-0

                opacity-[0.03]

                bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]

                bg-[length:22px_22px]

                pointer-events-none
              "
            />

            <div className="relative z-10">

              <RecentCases />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;