import { useState } from "react";

import {
  X,
  FolderPlus,
  Sparkles,
  MapPinned,
  User,
  FileText,
  ShieldAlert,
} from "lucide-react";

function NewCaseModal({
  isOpen,
  onClose,
}) {

  const [formData, setFormData] = useState({
    caseTitle: "",
    victimName: "",
    location: "",
    description: "",
  });

  const formFields = [
    {
      label: "Case Title",
      name: "caseTitle",
      placeholder: "Enter case title",
      type: "input",
      icon: ShieldAlert,
    },

    {
      label: "Victim Name",
      name: "victimName",
      placeholder: "Enter victim name",
      type: "input",
      icon: User,
    },

    {
      label: "Investigation Location",
      name: "location",
      placeholder: "Enter location",
      type: "input",
      icon: MapPinned,
    },

    {
      label: "Initial Investigation Notes",
      name: "description",
      placeholder: "Enter case description...",
      type: "textarea",
      icon: FileText,
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Case Created Successfully!");

    console.log(formData);

    onClose();

    setFormData({
      caseTitle: "",
      victimName: "",
      location: "",
      description: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        px-4
        py-8

        bg-black/70
        backdrop-blur-md

        overflow-y-auto
      "
    >

      {/* BACKDROP GLOW */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top_right,rgba(127,29,29,0.22),transparent_30%)]

          pointer-events-none
        "
      />

      {/* MODAL */}
      <div
        className="
          relative

          w-full
          max-w-3xl

          overflow-hidden

          rounded-[40px]

          bg-white/30
          backdrop-blur-2xl

          border border-white/10

          shadow-[0_20px_80px_rgba(15,23,42,0.35)]

          p-10
        "
      >

        {/* PAPER TEXTURE */}
        <div
          className="
            absolute inset-0

            opacity-[0.025]

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

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute
            top-6
            right-6

            w-12
            h-12

            rounded-2xl

            bg-black/20
            backdrop-blur-xl

            border border-white/10

            flex
            items-center
            justify-center

            text-slate-500
            hover:text-red-500

            transition-all duration-300

            hover:scale-105
          "
        >
          <X size={18} />
        </button>

        {/* HEADER */}
        <div className="relative z-10 mb-10">

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

            FORENSIC CASE INITIALIZATION
          </div>

          <div className="flex items-center gap-5">

            {/* ICON */}
            <div
              className="
                relative

                w-20
                h-20

                rounded-[28px]

                bg-red-900/5

                border border-red-900/10

                flex
                items-center
                justify-center

                shadow-[0_0_40px_rgba(127,29,29,0.12)]
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  inset-0

                  rounded-[28px]

                  bg-red-500/10

                  blur-xl
                "
              />

              <FolderPlus
                size={36}
                className="
                  relative z-10
                  text-red-800
                "
              />
            </div>

            {/* TEXT */}
            <div>
              <h2
                className="
                  text-4xl
                  font-black

                  text-slate-900
                "
              >
                Create New Case
              </h2>

              <p
                className="
                  text-slate-500

                  mt-2

                  leading-7
                "
              >
                Initialize a new AI-powered forensic
                investigation and begin evidence tracking.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            relative z-10

            space-y-7
          "
        >

          {formFields.map((field, index) => {

            const Icon = field.icon;

            return (
              <div key={index}>

                {/* LABEL */}
                <label
                  className="
                    text-sm
                    font-semibold

                    text-slate-600

                    tracking-wide

                    mb-3
                    block
                  "
                >
                  {field.label}
                </label>

                {field.type === "input" ? (

                  <div
                    className="
                      group

                      flex
                      items-center
                      gap-4

                      px-5
                      py-5

                      rounded-[24px]

                      bg-white/40
                      backdrop-blur-xl

                      border border-black/5

                      shadow-[0_10px_30px_rgba(15,23,42,0.04)]

                      transition-all duration-300

                      hover:border-red-900/10
                      focus-within:border-red-900/20
                      focus-within:shadow-[0_0_30px_rgba(127,29,29,0.08)]
                    "
                  >

                    {/* ICON */}
                    <div
                      className="
                        w-11
                        h-11

                        rounded-2xl

                        bg-red-900/5

                        border border-red-900/10

                        flex
                        items-center
                        justify-center

                        text-red-800

                        shrink-0
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="
                        bg-transparent
                        border-none
                        outline-none

                        w-full

                        text-slate-800

                        placeholder:text-slate-400
                      "
                    />
                  </div>

                ) : (

                  <div
                    className="
                      group

                      flex
                      gap-4

                      px-5
                      py-5

                      rounded-[24px]

                      bg-white/40
                      backdrop-blur-xl

                      border border-black/5

                      shadow-[0_10px_30px_rgba(15,23,42,0.04)]

                      transition-all duration-300

                      hover:border-red-900/10
                      focus-within:border-red-900/20
                      focus-within:shadow-[0_0_30px_rgba(127,29,29,0.08)]
                    "
                  >

                    {/* ICON */}
                    <div
                      className="
                        w-11
                        h-11

                        rounded-2xl

                        bg-red-900/5

                        border border-red-900/10

                        flex
                        items-center
                        justify-center

                        text-red-800

                        shrink-0
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <textarea
                      rows={6}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="
                        w-full

                        bg-transparent
                        border-none
                        outline-none
                        resize-none

                        text-slate-800

                        placeholder:text-slate-400

                        leading-8
                      "
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* FOOTER */}
          <div
            className="
              flex
              items-center
              justify-end

              gap-4

              pt-6
            "
          >

            {/* CANCEL */}
            <button
              type="button"
              onClick={onClose}
              className="
                px-7
                py-4

                rounded-[22px]

                bg-white/40
                backdrop-blur-xl

                border border-black/5

                text-slate-600
                font-semibold

                transition-all duration-300

                hover:bg-white/60
                hover:text-slate-900
              "
            >
              Cancel
            </button>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
                relative
                overflow-hidden

                px-8
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

                hover:scale-[1.02]
                hover:shadow-[0_15px_45px_rgba(127,29,29,0.45)]
              "
            >

              {/* BUTTON GLOW */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent

                  translate-x-[-100%]

                  hover:translate-x-[100%]

                  transition-all duration-1000
                "
              />

              <span className="relative z-10">
                Create Case
              </span>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCaseModal;