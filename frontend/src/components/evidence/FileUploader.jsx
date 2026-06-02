import { useRef, useState } from "react";

import {
  Upload,
  FileText,
  Image,
  Video,
  FileSpreadsheet,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function FileUploader() {

  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {

    const uploadedFiles =
      Array.from(e.target.files);

    setFiles((prev) => [
      ...prev,
      ...uploadedFiles,
    ]);
  };

  const removeFile = (index) => {

    const updatedFiles = [...files];

    updatedFiles.splice(index, 1);

    setFiles(updatedFiles);
  };

  const getFileIcon = (fileName) => {

    const extension =
      fileName.split(".").pop();

    if (["pdf"].includes(extension)) {
      return <FileText size={20} />;
    }

    if (
      ["png", "jpg", "jpeg"]
        .includes(extension)
    ) {
      return <Image size={20} />;
    }

    if (
      ["mp4", "avi", "mov"]
        .includes(extension)
    ) {
      return <Video size={20} />;
    }

    return <FileSpreadsheet size={20} />;
  };

  const handleUpload = () => {

    console.log(files);

    // API integration later
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

      {/* AMBIENT GLOW */}
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

      {/* RED STRING */}
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

          gap-6

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

              mb-6
            "
          >

            <Sparkles size={12} />

            SECURE EVIDENCE PORTAL
          </div>

          {/* TITLE */}
          <h2
            className="
              text-4xl
              font-black

              text-slate-900
            "
          >
            Upload Evidence
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              text-slate-500

              mt-4

              leading-8

              max-w-2xl
            "
          >
            Add forensic evidence files securely
            into the AI investigation network for
            analysis, tracking, and verification.
          </p>
        </div>

        {/* STATUS */}
        <div
          className="
            inline-flex
            items-center
            gap-3

            px-5
            py-3

            rounded-2xl

            bg-emerald-500/10

            border border-emerald-500/20

            text-emerald-700
            text-sm
            font-bold

            backdrop-blur-xl

            shrink-0
          "
        >

          <ShieldCheck size={16} />

          <span>
            Encrypted Upload Active
          </span>
        </div>
      </div>

      {/* DROP AREA */}
      <div
        onClick={handleBrowse}
        className="
          group
          relative
          overflow-hidden

          border-2
          border-dashed

          border-red-900/15

          hover:border-red-900/30

          transition-all duration-500

          rounded-[36px]

          p-14

          bg-white/40
          backdrop-blur-xl

          text-center

          cursor-pointer

          hover:shadow-[0_20px_60px_rgba(127,29,29,0.08)]
        "
      >

        {/* HOVER GLOW */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-red-500/5
            via-transparent
            to-red-500/5

            opacity-0

            group-hover:opacity-100

            transition-all duration-500
          "
        />

        {/* ICON */}
        <div
          className="
            relative z-10

            w-24
            h-24

            mx-auto

            rounded-[30px]

            bg-red-900/5

            border border-red-900/10

            flex
            items-center
            justify-center

            shadow-[0_0_40px_rgba(127,29,29,0.08)]

            mb-8
          "
        >

          {/* ICON GLOW */}
          <div
            className="
              absolute
              inset-0

              rounded-[30px]

              bg-red-500/10

              blur-xl
            "
          />

          <Upload
            size={40}
            className="
              relative z-10

              text-red-800
            "
          />
        </div>

        {/* TITLE */}
        <h3
          className="
            relative z-10

            text-3xl
            font-black

            text-slate-900

            mb-4
          "
        >
          Drag & Drop Files
        </h3>

        {/* TEXT */}
        <p
          className="
            relative z-10

            text-slate-500

            text-sm

            leading-7

            mb-8

            max-w-xl

            mx-auto
          "
        >
          Upload PDFs, crime scene images,
          CCTV footage, metadata logs,
          surveillance files, and forensic
          investigation reports.
        </p>

        {/* BUTTON */}
        <button
          className="
            relative z-10

            px-6
            py-4

            rounded-[22px]

            bg-gradient-to-r
            from-red-900
            via-red-700
            to-red-900

            text-white
            font-bold

            shadow-[0_10px_35px_rgba(127,29,29,0.35)]

            transition-all duration-500

            hover:scale-[1.03]
          "
        >
          Browse Files
        </button>

        {/* INPUT */}
        <input
          type="file"
          multiple
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (

        <div
          className="
            relative z-10

            mt-10

            space-y-5
          "
        >

          {/* SECTION TITLE */}
          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <h3
              className="
                text-2xl
                font-black

                text-slate-900
              "
            >
              Uploaded Files
            </h3>

            <div
              className="
                px-4
                py-2

                rounded-full

                bg-red-900/5

                border border-red-900/10

                text-red-800
                text-xs
                font-black

                tracking-[2px]
              "
            >
              {files.length} FILES
            </div>
          </div>

          {/* FILE ITEMS */}
          {files.map((file, index) => (

            <div
              key={index}
              className="
                group
                relative
                overflow-hidden

                rounded-[28px]

                bg-white/40
                backdrop-blur-xl

                border border-black/5

                p-5

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                transition-all duration-500

                hover:border-red-900/10
                hover:-translate-y-1
              "
            >

              {/* HOVER GLOW */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-r
                  from-transparent
                  via-red-500/5
                  to-transparent

                  opacity-0

                  group-hover:opacity-100

                  transition-all duration-500
                "
              />

              <div
                className="
                  relative z-10

                  flex
                  items-center
                  justify-between

                  gap-5
                "
              >

                {/* LEFT */}
                <div className="flex items-center gap-5">

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

                      text-red-800

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
                      {getFileIcon(file.name)}
                    </div>
                  </div>

                  {/* INFO */}
                  <div>

                    <h4
                      className="
                        text-lg
                        font-bold

                        text-slate-900
                      "
                    >
                      {file.name}
                    </h4>

                    <p
                      className="
                        text-slate-500

                        text-sm

                        mt-2
                      "
                    >
                      {(file.size / 1024 / 1024)
                        .toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  {/* VERIFIED */}
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2

                      px-4
                      py-2.5

                      rounded-full

                      bg-emerald-500/10

                      border border-emerald-500/20

                      text-emerald-700
                      text-xs
                      font-black

                      tracking-[1.5px]

                      uppercase
                    "
                  >

                    <div
                      className="
                        w-2
                        h-2

                        rounded-full

                        bg-emerald-500

                        animate-pulse
                      "
                    />

                    <CheckCircle2 size={14} />

                    Ready
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeFile(index)
                    }
                    className="
                      w-11
                      h-11

                      rounded-2xl

                      bg-red-500/10

                      border border-red-500/20

                      text-red-700

                      hover:bg-red-500/20

                      transition-all duration-300

                      flex
                      items-center
                      justify-center
                    "
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div
        className="
          relative z-10

          mt-10

          flex
          justify-end
        "
      >

        <button
          onClick={handleUpload}
          className="
            group

            relative
            overflow-hidden

            px-8
            py-4

            rounded-[24px]

            bg-gradient-to-r
            from-red-900
            via-red-700
            to-red-900

            text-white
            font-bold

            shadow-[0_12px_35px_rgba(127,29,29,0.35)]

            transition-all duration-500

            hover:scale-[1.03]
          "
        >

          {/* SHINE */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent

              translate-x-[-100%]

              group-hover:translate-x-[100%]

              transition-all duration-1000
            "
          />

          <span className="relative z-10">
            Upload Evidence
          </span>
        </button>
      </div>
    </div>
  );
}

export default FileUploader;