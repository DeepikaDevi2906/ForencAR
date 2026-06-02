import { useRef, useState } from "react";

import {
  Upload,
  Video,
  FileVideo,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

function CCTVUploader() {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [analysisResult, setAnalysisResult] =
    useState(null);

  // =================================
  // CHOOSE FILE
  // =================================

  const handleChooseFile = () => {

    fileInputRef.current.click();
  };

  // =================================
  // FILE CHANGE
  // =================================

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setSelectedFile(file);

      setAnalysisResult(null);
    }
  };

  // =================================
  // UPLOAD + ANALYZE
  // =================================

  const handleUpload = async () => {

    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {

      const response = await fetch(
        "http://localhost:5000/api/cctv/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to upload video"
        );
      }

      const data =
        await response.json();

      console.log(data);

      setAnalysisResult(data);

    } catch (error) {

      console.error(error);

      alert("AI Analysis Failed");

    } finally {

      setIsUploading(false);
    }
  };

  return (

    <div
      className="
        relative

        rounded-[36px]

        border border-white/40

        bg-white/35
        backdrop-blur-2xl

        shadow-[0_20px_80px_rgba(0,0,0,0.08)]

        overflow-hidden
      "
    >

      {/* ================================= */}
      {/* OVERLAY */}
      {/* ================================= */}

      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-white/20
          via-transparent
          to-red-100/10

          pointer-events-none
        "
      />

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="relative z-10 p-8 border-b border-black/5">

        <div className="flex items-start gap-5">

          <div
            className="
              w-16
              h-16

              rounded-3xl

              bg-red-100

              flex
              items-center
              justify-center

              shadow-lg
            "
          >

            <Video
              size={30}
              className="text-red-900"
            />

          </div>

          <div>

            <div className="flex items-center gap-2 mb-2">

              <Sparkles
                size={18}
                className="text-red-700"
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-red-800
                  tracking-wide
                "
              >
                AI FORENSIC ENGINE
              </span>

            </div>

            <h2
              className="
                text-3xl
                font-bold

                tracking-tight

                text-slate-900
              "
            >
              CCTV Evidence Upload
            </h2>

            <p className="text-slate-600 mt-2 leading-relaxed">

              Upload surveillance footage
              for intelligent forensic
              investigation and behavioral analysis.

            </p>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* BODY */}
      {/* ================================= */}

      <div className="relative z-10 p-8">

        {/* ================================= */}
        {/* UPLOAD AREA */}
        {/* ================================= */}

        <div
          onClick={handleChooseFile}
          className="
            relative

            overflow-hidden

            border-2
            border-dashed
            border-red-200

            hover:border-red-400

            rounded-[32px]

            bg-gradient-to-br
            from-white/70
            to-white/40

            transition-all
            duration-500

            cursor-pointer

            group

            p-14
            text-center
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              inset-0

              opacity-0
              group-hover:opacity-100

              transition-opacity
              duration-500

              bg-gradient-to-br
              from-red-100/30
              via-transparent
              to-red-200/20
            "
          />

          {/* ICON */}

          <div
            className="
              relative

              w-24
              h-24

              mx-auto
              mb-8

              rounded-[28px]

              bg-red-50

              border border-red-200

              flex
              items-center
              justify-center

              shadow-lg

              group-hover:scale-105

              transition-transform
              duration-500
            "
          >

            <Upload
              size={42}
              className="text-red-900"
            />

          </div>

          {/* TITLE */}

          <h3
            className="
              relative

              text-2xl
              font-bold

              text-slate-900

              mb-3
            "
          >
            Drop CCTV Footage Here
          </h3>

          {/* TEXT */}

          <p
            className="
              relative

              text-slate-600

              mb-8
            "
          >
            Supported formats:
            MP4, AVI, MOV
          </p>

          {/* BUTTON */}

          <button
            className="
              relative

              px-6
              py-3

              rounded-2xl

              bg-red-900

              hover:bg-red-800

              text-white
              font-semibold

              shadow-lg

              transition-all
              duration-300
            "
          >
            Browse Evidence
          </button>

          {/* INPUT */}

          <input
            type="file"

            accept=".mp4,.avi,.mov"

            ref={fileInputRef}

            onChange={handleFileChange}

            hidden
          />

        </div>

        {/* ================================= */}
        {/* FILE CARD */}
        {/* ================================= */}

        {selectedFile && (

          <div
            className="
              mt-8

              rounded-[28px]

              border border-white/40

              bg-white/50
              backdrop-blur-xl

              p-5

              shadow-lg

              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-5">

              <div
                className="
                  w-14
                  h-14

                  rounded-2xl

                  bg-red-100

                  flex
                  items-center
                  justify-center
                "
              >

                <FileVideo
                  size={24}
                  className="text-red-900"
                />

              </div>

              <div>

                <h4 className="font-semibold text-slate-900">

                  {selectedFile.name}

                </h4>

                <p className="text-sm text-slate-500 mt-1">

                  {
                    (
                      selectedFile.size
                      / 1024
                      / 1024
                    ).toFixed(2)
                  } MB

                </p>

              </div>

            </div>

            <CheckCircle2
              size={28}
              className="text-emerald-600"
            />

          </div>

        )}

        {/* ================================= */}
        {/* ANALYSIS RESULT */}
        {/* ================================= */}

        {analysisResult && (

          <div
            className="
              mt-8

              rounded-[30px]

              border border-red-200

              bg-gradient-to-br
              from-red-50
              to-white

              p-7

              shadow-xl

              animate-in
              fade-in
              zoom-in
              duration-500
            "
          >

            {/* HEADER */}

            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                  w-12
                  h-12

                  rounded-2xl

                  bg-red-100

                  flex
                  items-center
                  justify-center
                "
              >

                <AlertTriangle
                  size={24}
                  className="text-red-800"
                />

              </div>

              <div>

                <h4 className="text-xl font-bold text-red-900">
                  AI CCTV Investigation Result
                </h4>

                <p className="text-sm text-red-700">
                  AI forensic engine completed analysis
                </p>

              </div>

            </div>

            {/* SUMMARY */}

            <div
              className="
                rounded-2xl

                bg-white/70

                border border-red-100

                p-5

                mb-5
              "
            >

              <h5 className="font-semibold text-slate-900 mb-3">
                Investigation Summary
              </h5>

              <p className="text-slate-700 leading-relaxed">

                {
                  analysisResult?.result?.summary
                  || "No summary available"
                }

              </p>

            </div>

            {/* RISK */}

            <div
              className="
                rounded-2xl

                bg-white/70

                border border-red-100

                p-5

                mb-5
              "
            >

              <h5 className="font-semibold text-slate-900 mb-3">
                Risk Level
              </h5>

              <div
                className="
                  inline-flex

                  px-4
                  py-2

                  rounded-xl

                  bg-red-100

                  text-red-900
                  font-bold
                "
              >

                {
                  analysisResult?.result?.risk_level
                  || "UNKNOWN"
                }

              </div>

            </div>

            {/* OBJECTS */}

            <div>

              <h5 className="font-semibold text-slate-900 mb-4">
                Detected Objects
              </h5>

              <div className="flex flex-wrap gap-3">

                {
                  analysisResult?.result?.objects?.map(
                    (obj, idx) => (

                      <div
                        key={idx}
                        className="
                          px-4
                          py-2

                          rounded-xl

                          bg-white/70

                          border border-red-100

                          text-slate-700
                          font-medium
                        "
                      >
                        {obj}
                      </div>
                    )
                  )
                }

              </div>

            </div>

          </div>

        )}

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={handleUpload}

            disabled={
              !selectedFile
              || isUploading
            }

            className={`
              px-7
              py-4

              rounded-2xl

              font-semibold

              flex
              items-center
              gap-3

              transition-all
              duration-300

              ${
                !selectedFile || isUploading

                  ? `
                    bg-slate-300
                    text-slate-500
                    cursor-not-allowed
                  `

                  : `
                    bg-red-900
                    hover:bg-red-800

                    text-white

                    shadow-[0_10px_30px_rgba(127,29,29,0.25)]

                    hover:scale-[1.02]
                  `
              }
            `}
          >

            {isUploading && (

              <Loader2
                className="animate-spin"
                size={20}
              />

            )}

            {
              isUploading

                ? "Analyzing Footage..."

                : "Start AI Analysis"
            }

          </button>

        </div>

      </div>

    </div>
  );
}

export default CCTVUploader;