import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Sparkles,
  FolderKanban,
  Search,
  Activity,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

import SearchBar from "../components/common/SearchBar";

import CaseList from "../components/cases/CaseList";

import NewCaseModal from "../components/cases/NewCaseModal";

function Cases() {

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [cases, setCases] =
    useState([]);

  const [filteredCases, setFilteredCases] =
    useState([]);

  // -----------------------------------
  // FETCH CASES
  // -----------------------------------
  useEffect(() => {

    fetchCases();

  }, []);

  const fetchCases = async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:5000/api/cases"
        );

      setCases(
        response.data || []
      );

      setFilteredCases(
        response.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  // -----------------------------------
  // SEARCH
  // -----------------------------------
  const handleSearch = (query) => {

    // RESET
    if (!query) {

      setFilteredCases(cases);

      return;
    }

    const filtered =
      cases.filter((item) =>

        item.title
          ?.toLowerCase()
          .includes(
            query.toLowerCase()
          )
      );

    setFilteredCases(
      filtered
    );
  };

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

        <div className="relative z-10">

          {/* PAGE HEADER */}
          <div
            className="
              flex
              items-start
              justify-between

              gap-8

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

                FORENSIC CASE MANAGEMENT
              </div>

              {/* TOP */}
              <div className="flex items-center gap-5">

                {/* ICON */}
                <div
                  className="
                    relative

                    w-20
                    h-20

                    rounded-[30px]

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

                      rounded-[30px]

                      bg-red-500/10

                      blur-xl
                    "
                  />

                  <FolderKanban
                    size={34}
                    className="
                      relative z-10

                      text-red-800
                    "
                  />
                </div>

                {/* TITLE */}
                <div>

                  <h1
                    className="
                      text-5xl
                      font-black

                      text-slate-900

                      tracking-tight
                    "
                  >
                    Investigation Cases
                  </h1>

                  <p
                    className="
                      text-slate-500

                      mt-3

                      text-lg

                      leading-8

                      max-w-3xl
                    "
                  >
                    AI-powered forensic case
                    management and intelligence
                    tracking system.
                  </p>
                </div>
              </div>
            </div>

            {/* CREATE BUTTON */}
            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              className="
                group

                relative
                overflow-hidden

                px-7
                py-4

                rounded-[24px]

                bg-gradient-to-br
                from-red-900
                to-red-700

                text-white
                font-bold

                shadow-[0_10px_35px_rgba(127,29,29,0.25)]

                transition-all duration-300

                hover:scale-[1.03]
              "
            >

              <div
                className="
                  absolute
                  inset-0

                  bg-white/10

                  opacity-0

                  group-hover:opacity-100

                  transition-all duration-300
                "
              />

              <span className="relative z-10">
                + Create New Case
              </span>
            </button>
          </div>

          {/* STATS BAR */}
          <div
            className="
              grid
              grid-cols-3

              gap-6

              mb-10
            "
          >

            {/* CARD */}
            <div
              className="
                relative
                overflow-hidden

                rounded-[32px]

                bg-white/30
                backdrop-blur-2xl

                border border-black/5

                p-6

                shadow-[0_10px_40px_rgba(15,23,42,0.06)]
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0

                  w-32
                  h-32

                  rounded-full

                  bg-red-500/10

                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-5">

                  <FolderKanban
                    size={22}
                    className="text-red-700"
                  />

                  <p
                    className="
                      text-sm
                      font-bold

                      text-slate-500
                    "
                  >
                    TOTAL CASES
                  </p>
                </div>

                <h2
                  className="
                    text-5xl
                    font-black

                    text-slate-900
                  "
                >
                  {cases.length}
                </h2>
              </div>
            </div>

            {/* ACTIVE */}
            <div
              className="
                relative
                overflow-hidden

                rounded-[32px]

                bg-white/30
                backdrop-blur-2xl

                border border-black/5

                p-6

                shadow-[0_10px_40px_rgba(15,23,42,0.06)]
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0

                  w-32
                  h-32

                  rounded-full

                  bg-amber-500/10

                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-5">

                  <Activity
                    size={22}
                    className="text-amber-600"
                  />

                  <p
                    className="
                      text-sm
                      font-bold

                      text-slate-500
                    "
                  >
                    ACTIVE CASES
                  </p>
                </div>

                <h2
                  className="
                    text-5xl
                    font-black

                    text-slate-900
                  "
                >
                  {
                    cases.filter(
                      (item) =>
                        item.status ===
                        "Active"
                    ).length
                  }
                </h2>
              </div>
            </div>

            {/* CRITICAL */}
            <div
              className="
                relative
                overflow-hidden

                rounded-[32px]

                bg-white/30
                backdrop-blur-2xl

                border border-black/5

                p-6

                shadow-[0_10px_40px_rgba(15,23,42,0.06)]
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0

                  w-32
                  h-32

                  rounded-full

                  bg-red-500/10

                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-5">

                  <Sparkles
                    size={22}
                    className="text-red-700"
                  />

                  <p
                    className="
                      text-sm
                      font-bold

                      text-slate-500
                    "
                  >
                    CRITICAL CASES
                  </p>
                </div>

                <h2
                  className="
                    text-5xl
                    font-black

                    text-slate-900
                  "
                >
                  {
                    cases.filter(
                      (item) =>
                        item.status ===
                        "Critical"
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

          {/* SEARCH SECTION */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[36px]

              bg-white/30
              backdrop-blur-2xl

              border border-black/5

              p-7

              mb-10

              shadow-[0_10px_40px_rgba(15,23,42,0.06)]
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute
                top-0
                right-0

                w-44
                h-44

                rounded-full

                bg-red-500/10

                blur-3xl
              "
            />

            <div className="relative z-10">

              {/* TITLE */}
              <div className="flex items-center gap-4 mb-7">

                <Search
                  size={24}
                  className="text-red-700"
                />

                <div>

                  <h2
                    className="
                      text-3xl
                      font-black

                      text-slate-900
                    "
                  >
                    Search Investigation Cases
                  </h2>

                  <p
                    className="
                      text-slate-500

                      mt-2
                    "
                  >
                    Search by title, suspect,
                    or forensic metadata.
                  </p>
                </div>
              </div>

              {/* SEARCH */}
              <SearchBar
                placeholder="
                  Search cases, suspects, locations...
                "
                onSearch={handleSearch}
              />
            </div>
          </div>

          {/* CASE LIST */}
          <CaseList
            cases={filteredCases}
          />

          {/* MODAL */}
          <NewCaseModal
            isOpen={isModalOpen}
            onClose={() =>
              setIsModalOpen(false)
            }
            refreshCases={fetchCases}
          />
        </div>
      </div>

    </DashboardLayout>
  );
}

export default Cases;