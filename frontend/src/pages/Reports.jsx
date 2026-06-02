import { useState } from "react";

import axios from "axios";

import {
  Sparkles,
  ShieldAlert,
  BrainCircuit,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

function Reports() {

  const [summary, setSummary] =
    useState("");

  // ===================================
  // FILE UPLOAD
  // ===================================

  const handleFileUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      setSummary(
        "Generating AI forensic summary..."
      );

      try {

        const response =
          await axios.post(
            "http://127.0.0.1:5000/api/report/summarize",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setSummary(
          response.data.summary
        );

      } catch (error) {

        console.log(error);

        setSummary(
          "AI summary generation failed."
        );
      }
    };

  return (

    <DashboardLayout>

      {/* MAIN WRAPPER */}

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
            -top-24
            -left-24
            w-[620px]
            h-[620px]
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
            w-[500px]
            h-[500px]
            rounded-full
            bg-red-200/20
            blur-3xl
            animate-pulse
          "
        />

        {/* FLOATING PARTICLES */}

        <div className="absolute top-20 left-40 w-2 h-2 rounded-full bg-black/5 animate-pulse" />

        <div className="absolute top-72 right-44 w-1 h-1 rounded-full bg-red-900/15 animate-ping" />

        <div className="absolute bottom-24 left-1/3 w-2 h-2 rounded-full bg-black/5 animate-bounce" />

        {/* RED STRINGS */}

        <div
          className="
            absolute
            top-[240px]
            left-[340px]
            w-[260px]
            h-[2px]
            bg-gradient-to-r
            from-red-900
            via-red-600
            to-red-900
            rotate-[12deg]
            shadow-[0_0_14px_rgba(127,29,29,0.45)]
            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-[360px]
            left-[520px]
            w-[220px]
            h-[2px]
            bg-gradient-to-r
            from-red-900
            via-red-500
            to-red-900
            -rotate-[18deg]
            shadow-[0_0_14px_rgba(127,29,29,0.45)]
            animate-pulse
          "
        />

        {/* NODES */}

        <div
          className="
            absolute
            top-[232px]
            left-[332px]
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
            top-[352px]
            left-[736px]
            w-4
            h-4
            rounded-full
            bg-red-800
            shadow-[0_0_18px_rgba(127,29,29,0.7)]
            animate-pulse
          "
        />

        {/* CONTENT */}

        <div className="relative z-10">

          {/* HEADER */}

          <div className="mb-10">

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
                mb-6
                backdrop-blur-xl
              "
            >

              <Sparkles size={14} />

              AI REPORT ANALYSIS
            </div>

            <h1
              className="
                text-6xl
                font-black
                text-slate-900
                tracking-tight
              "
            >
              Investigation Reports
            </h1>

            <p
              className="
                text-slate-600
                mt-5
                text-lg
                leading-9
                max-w-3xl
              "
            >
              Upload forensic evidence,
              autopsy reports,
              investigation documents,
              or case files and generate
              AI-powered summaries.
            </p>

          </div>

          {/* BIG UPLOAD BOX */}

          <div
            className="
              relative
              overflow-hidden

              rounded-[45px]

              bg-white/40
              backdrop-blur-2xl

              border-2
              border-dashed
              border-red-900/20

              min-h-[380px]

              flex
              flex-col
              items-center
              justify-center

              text-center

              px-10

              shadow-[0_20px_80px_rgba(15,23,42,0.08)]

              mb-10

              transition-all duration-300

              hover:border-red-900/40
              hover:scale-[1.01]
            "
          >

            {/* GLOW */}

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

            <div className="relative z-10">

              {/* ICON */}

              <div
                className="
                  w-28
                  h-28

                  rounded-[35px]

                  bg-red-900/5
                  border border-red-900/10

                  flex
                  items-center
                  justify-center

                  mx-auto

                  mb-8
                "
              >

                <BrainCircuit
                  size={54}
                  className="text-red-700"
                />

              </div>

              {/* TITLE */}

              <h2
                className="
                  text-4xl
                  font-black
                  text-slate-900
                  mb-5
                "
              >
                Upload Investigation Files
              </h2>

              {/* TEXT */}

              <p
                className="
                  text-slate-600
                  text-lg
                  leading-8
                  max-w-2xl
                  mx-auto
                  mb-8
                "
              >
                Drag & drop forensic reports,
                autopsy PDFs,
                investigation documents,
                or evidence files to generate
                intelligent AI summaries.
              </p>

              {/* BUTTON */}

              <label
                className="
                  inline-flex
                  items-center
                  gap-3

                  px-8
                  py-5

                  rounded-[24px]

                  bg-gradient-to-r
                  from-red-900
                  to-red-700

                  text-white
                  font-black
                  text-lg

                  cursor-pointer

                  shadow-[0_10px_35px_rgba(127,29,29,0.25)]

                  hover:scale-[1.03]

                  transition-all duration-300
                "
              >

                Upload Evidence

                <input
                  type="file"
                  className="hidden"
                  onChange={
                    handleFileUpload
                  }
                />

              </label>

            </div>

          </div>

          {/* SUMMARY SECTION */}

          <div
            className="
              rounded-[40px]

              bg-white/35
              backdrop-blur-2xl

              border border-black/5

              p-8

              shadow-[0_20px_80px_rgba(15,23,42,0.08)]
            "
          >

            <div className="flex items-center gap-5 mb-8">

              <div
                className="
                  w-16
                  h-16

                  rounded-[24px]

                  bg-red-900/5
                  border border-red-900/10

                  flex
                  items-center
                  justify-center
                "
              >

                <ShieldAlert
                  size={30}
                  className="text-red-700"
                />

              </div>

              <div>

                <h2
                  className="
                    text-4xl
                    font-black
                    text-slate-900
                  "
                >
                  AI Generated Summary
                </h2>

                <p className="text-slate-500 mt-2">
                  Investigation intelligence overview
                </p>

              </div>

            </div>

            {/* SUMMARY BOX */}

            <div
              className="
                rounded-[30px]

                bg-white/50

                border border-black/5

                p-8

                min-h-[220px]
              "
            >

              {summary ? (

                <p
                  className="
                    text-slate-700
                    leading-9
                    text-lg
                    whitespace-pre-line
                  "
                >
                  {summary}
                </p>

              ) : (

                <div
                  className="
                    h-full

                    flex
                    items-center
                    justify-center

                    text-slate-400
                    text-lg
                  "
                >
                  Upload a file to generate AI summary...
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Reports;