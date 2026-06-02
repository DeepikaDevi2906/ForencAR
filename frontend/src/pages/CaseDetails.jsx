import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import {
  MapPin,
  CalendarDays,
  ShieldAlert,
  User,
  FileText,
  Activity,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

import StatusBadge from "../components/common/StatusBadge";

import EvidenceGrid from "../components/evidence/EvidenceGrid";

import AIInsightCard from "../components/ai/AIInsightCard";

function CaseDetails() {

  const { id } = useParams();

  const [caseData, setCaseData] =
    useState(null);

  // -----------------------------------
  // FETCH CASE DETAILS
  // -----------------------------------
  useEffect(() => {

    fetchCaseDetails();

  }, []);

  const fetchCaseDetails =
    async () => {

      try {

        const response =
          await axios.get(
            `http://127.0.0.1:5000/api/cases/${id}`
          );

        setCaseData(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // -----------------------------------
  // LOADING
  // -----------------------------------
  if (!caseData) {

    return (

      <DashboardLayout>

        <div
          className="
            min-h-[80vh]

            flex
            items-center
            justify-center
          "
        >

          <div
            className="
              px-8
              py-6

              rounded-[30px]

              bg-white/30
              backdrop-blur-2xl

              border border-black/5

              text-red-700
              font-bold

              shadow-[0_10px_40px_rgba(15,23,42,0.08)]

              animate-pulse
            "
          >
            AI reconstructing investigation...
          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* MAIN WRAPPER */}
      <div className="relative overflow-hidden">

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

        {/* AMBIENT LIGHT */}
        <div
          className="
            absolute
            top-0
            left-0

            w-[500px]
            h-[500px]

            rounded-full

            bg-red-500/10

            blur-3xl

            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0

            w-[500px]
            h-[500px]

            rounded-full

            bg-red-900/10

            blur-3xl

            animate-pulse
          "
        />

        {/* RED STRING CONNECTIONS */}
        <div
          className="
            absolute
            top-[220px]
            left-[420px]

            w-[260px]
            h-[2px]

            bg-gradient-to-r
            from-red-700
            via-red-500
            to-red-700

            rotate-[12deg]

            shadow-[0_0_20px_rgba(127,29,29,0.45)]

            animate-pulse

            pointer-events-none
          "
        />

        <div
          className="
            absolute
            top-[340px]
            left-[520px]

            w-[180px]
            h-[2px]

            bg-gradient-to-r
            from-red-700
            via-red-500
            to-red-700

            -rotate-[18deg]

            shadow-[0_0_20px_rgba(127,29,29,0.45)]

            animate-pulse

            pointer-events-none
          "
        />

        {/* NODE */}
        <div
          className="
            absolute
            top-[212px]
            left-[412px]

            w-4
            h-4

            rounded-full

            bg-red-700

            shadow-[0_0_20px_rgba(127,29,29,0.7)]

            animate-ping

            pointer-events-none
          "
        />

        <div className="relative z-10">

          {/* HEADER */}
          <div
            className="
              flex
              items-start
              justify-between

              gap-8

              mb-12
            "
          >

            {/* LEFT */}
            <div>

              {/* TOP BADGES */}
              <div
                className="
                  flex
                  items-center
                  gap-4

                  flex-wrap

                  mb-6
                "
              >

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
                    text-[11px]
                    font-black

                    tracking-[2px]
                  "
                >

                  <Sparkles size={12} />

                  LIVE INVESTIGATION
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

              {/* CASE NUMBER */}
              <p
                className="
                  text-xs

                  tracking-[5px]

                  text-red-700

                  font-black

                  mb-5
                "
              >
                {caseData.case_number}
              </p>

              {/* TITLE */}
              <h1
                className="
                  text-6xl
                  font-black

                  text-slate-900

                  leading-tight

                  tracking-tight
                "
              >
                {caseData.title}
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  text-slate-500

                  mt-6

                  max-w-[850px]

                  leading-9

                  text-lg
                "
              >
                {caseData.description}
              </p>
            </div>

            {/* STATUS */}
            <StatusBadge
              status={caseData.status}
            />
          </div>

          {/* GRID */}
          <div
            className="
              grid
              grid-cols-12

              gap-7

              mb-10
            "
          >

            {/* LEFT PANEL */}
            <div
              className="
                col-span-8

                relative
                overflow-hidden

                rounded-[40px]

                bg-white/30
                backdrop-blur-2xl

                border border-black/5

                p-8

                shadow-[0_20px_80px_rgba(15,23,42,0.08)]
              "
            >

              {/* INNER GLOW */}
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
                "
              />

              {/* HEADER */}
              <div
                className="
                  relative z-10

                  flex
                  items-center

                  gap-4

                  mb-10
                "
              >

                <ShieldAlert
                  size={26}
                  className="text-red-700"
                />

                <h2
                  className="
                    text-4xl
                    font-black

                    text-slate-900
                  "
                >
                  Investigation Details
                </h2>
              </div>

              {/* INFO GRID */}
              <div
                className="
                  relative z-10

                  grid
                  grid-cols-2

                  gap-7
                "
              >

                {[
                  {
                    label: "Victim Name",
                    value:
                      caseData.victim_name,
                    icon: (
                      <User
                        size={22}
                        className="text-red-700"
                      />
                    ),
                  },

                  {
                    label: "Location",
                    value:
                      caseData.location,
                    icon: (
                      <MapPin
                        size={22}
                        className="text-red-700"
                      />
                    ),
                  },

                  {
                    label:
                      "Investigation Date",
                    value:
                      caseData.date,
                    icon: (
                      <CalendarDays
                        size={22}
                        className="text-red-700"
                      />
                    ),
                  },

                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      group

                      relative
                      overflow-hidden

                      rounded-[32px]

                      bg-white/40
                      backdrop-blur-xl

                      border border-black/5

                      p-6

                      transition-all duration-500

                      hover:-translate-y-1
                      hover:border-red-900/10
                    "
                  >

                    <div
                      className="
                        flex
                        items-start

                        gap-5
                      "
                    >

                      {/* ICON */}
                      <div
                        className="
                          relative

                          w-14
                          h-14

                          rounded-[22px]

                          bg-red-900/5

                          border border-red-900/10

                          flex
                          items-center
                          justify-center

                          shrink-0
                        "
                      >

                        <div
                          className="
                            absolute
                            inset-0

                            rounded-[22px]

                            bg-red-500/10

                            blur-xl
                          "
                        />

                        <div className="relative z-10">
                          {item.icon}
                        </div>
                      </div>

                      {/* TEXT */}
                      <div>

                        <p
                          className="
                            text-slate-500

                            text-sm
                          "
                        >
                          {item.label}
                        </p>

                        <h3
                          className="
                            text-slate-900

                            text-xl
                            font-black

                            mt-3
                          "
                        >
                          {item.value}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}

                {/* RISK CARD */}
                <div
                  className="
                    relative
                    overflow-hidden

                    rounded-[32px]

                    bg-red-500/10

                    border border-red-500/20

                    p-6

                    shadow-[0_10px_40px_rgba(127,29,29,0.08)]

                    transition-all duration-500

                    hover:-translate-y-1
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      top-0
                      right-0

                      w-40
                      h-40

                      rounded-full

                      bg-red-500/20

                      blur-3xl
                    "
                  />

                  <div
                    className="
                      relative z-10

                      flex
                      items-start

                      gap-5
                    "
                  >

                    {/* ICON */}
                    <div
                      className="
                        w-14
                        h-14

                        rounded-[22px]

                        bg-red-500/10

                        border border-red-500/20

                        flex
                        items-center
                        justify-center

                        shrink-0
                      "
                    >

                      <AlertTriangle
                        size={22}
                        className="text-red-700"
                      />
                    </div>

                    {/* TEXT */}
                    <div>

                      <p
                        className="
                          text-slate-500

                          text-sm
                        "
                      >
                        Risk Score
                      </p>

                      <h3
                        className="
                          text-red-700

                          text-4xl
                          font-black

                          mt-3
                        "
                      >
                        {caseData.risk_score}%
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI SUMMARY */}
              <div
                className="
                  relative
                  overflow-hidden

                  mt-10

                  rounded-[36px]

                  bg-red-500/10

                  border border-red-500/20

                  p-8

                  shadow-[0_10px_60px_rgba(127,29,29,0.1)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute
                    top-0
                    right-0

                    w-52
                    h-52

                    rounded-full

                    bg-red-500/20

                    blur-3xl
                  "
                />

                <div className="relative z-10">

                  {/* TITLE */}
                  <div
                    className="
                      flex
                      items-center

                      gap-4

                      mb-6
                    "
                  >

                    <FileText
                      size={24}
                      className="text-red-700"
                    />

                    <h3
                      className="
                        text-3xl
                        font-black

                        text-slate-900
                      "
                    >
                      Critical AI Deduction
                    </h3>
                  </div>

                  {/* TEXT */}
                  <p
                    className="
                      text-slate-700

                      leading-9

                      text-[15px]
                    "
                  >
                    {caseData.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="col-span-4 space-y-7">

              {/* ACTIVITY */}
              <div
                className="
                  relative
                  overflow-hidden

                  rounded-[40px]

                  bg-white/30
                  backdrop-blur-2xl

                  border border-black/5

                  p-7

                  shadow-[0_20px_80px_rgba(15,23,42,0.08)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute
                    top-0
                    right-0

                    w-52
                    h-52

                    rounded-full

                    bg-red-500/10

                    blur-3xl
                  "
                />

                <div className="relative z-10">

                  {/* TITLE */}
                  <div
                    className="
                      flex
                      items-center

                      gap-4

                      mb-8
                    "
                  >

                    <Activity
                      size={24}
                      className="text-red-700"
                    />

                    <h2
                      className="
                        text-3xl
                        font-black

                        text-slate-900
                      "
                    >
                      Activity
                    </h2>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-5">

                    {caseData.activities?.map(
                      (
                        activity,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                            rounded-[28px]

                            bg-white/40
                            backdrop-blur-xl

                            border border-black/5

                            p-5

                            transition-all duration-500

                            hover:-translate-y-1
                            hover:border-red-900/10
                          "
                        >

                          <p
                            className="
                              text-slate-800

                              text-sm

                              leading-8
                            "
                          >
                            {activity.title}
                          </p>

                          <p
                            className="
                              text-slate-500

                              text-xs

                              mt-4
                            "
                          >
                            {activity.time}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* AI CARD */}
              <div
                className="
                  rounded-[40px]

                  overflow-hidden

                  shadow-[0_20px_80px_rgba(15,23,42,0.08)]
                "
              >
                <AIInsightCard
                  title={
                    caseData.insight_title
                  }
                  description={
                    caseData.insight_description
                  }
                  type="critical"
                  confidence={
                    caseData.confidence
                  }
                  timestamp={
                    caseData.timestamp
                  }
                />
              </div>
            </div>
          </div>

          {/* EVIDENCE */}
          <div
            className="
              relative

              rounded-[42px]

              overflow-hidden
            "
          >

            {/* LIGHT */}
            <div
              className="
                absolute inset-0

                bg-gradient-to-r
                from-red-500/5
                via-transparent
                to-red-500/5

                pointer-events-none
              "
            />

            <EvidenceGrid />
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}

export default CaseDetails;