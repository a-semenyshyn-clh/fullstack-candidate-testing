import React, { useState, useEffect } from "react";
import Head from "next/head";
import NavBar from "../components/navbar";
import FilterSection from "../components/filerSection";
import Hospital from "../components/hospital";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Filter from "../components/filter";
import Sort from "../components/sort";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterDetails, setFilterDetails] = useState({
    title: "",
    filters: [],
  });

  const [keyword, setKeyword] = useState("");

  const [location, setLocation] = useState(0);
  const [role, setRole] = useState(0);
  const [department, setDepartment] = useState(0);
  const [education, setEducation] = useState(0);
  const [experience, setExperience] = useState(0);

  const totalCount = jobs.reduce(
    (total, item) => total + item.total_jobs_in_hospital,
    0
  );

  const fetchFilter = async () => {
    const filtersResponse = await fetch("/api/filters");
    setFilters(await filtersResponse.json());
  };

  const fetchJob = async () => {
    const jobsResponse = await fetch(
      `/api/jobs?keyword=${keyword}&location=${location}&role=${role}&department=${department}&education=${education}&experience=${experience}`
    );
    setJobs(await jobsResponse.json());
  };

  const onShowMore = (data) => {
    setFilterDetails(data);
    setOpenDialog(true);
  };

  useEffect(fetchFilter, []);
  useEffect(fetchJob, [
    keyword,
    location,
    role,
    department,
    education,
    experience,
  ]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="bg-gray-200">
        <div className="w-100 pt-3">
          <div className="flex border border-gray-400 rounded shadow-md bg-white mt-3 ml-3 mr-3 p-3">
            <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mt-1" />
            <input
              type="text"
              className="flex-1 ml-2 ontline-none focus:outline-none"
              placeholder="Search for any job, title, keywords or company"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setKeyword(e.target.value);
                }
              }}
            />
          </div>
          <div className="p-3">
            <div className="grid grid-cols-4 gap-4">
              <div className="hidden md:block">
                {Object.keys(filters).map((key) => (
                  <FilterSection
                    key={key}
                    filters={filters[key]}
                    title={key.replace("_", " ").toUpperCase()}
                    showDetails={onShowMore}
                  />
                ))}
              </div>
              <div className="col-span-4 md:col-span-3">
                <div className="border border-gray-400 rounded shadow-md bg-white mt-3 p-3">
                  <div className="lg:flex justify-between mt-4 mb-3">
                    <div className="pt-2 md:pl-4">
                      <label className="font-bold">{totalCount}</label>
                      <label className="ml-2">{"job postings"}</label>
                    </div>
                    <div className="lg:flex">
                      <label className="text-gray-500	mt-6 lg:mt-2 mr-4 md:ml-4">
                        Sort by
                      </label>
                      <Sort
                        title="Location"
                        onChange={(sort) => setLocation(sort)}
                      />
                      <Sort title="Role" onChange={(sort) => setRole(sort)} />
                      <Sort
                        title="Department"
                        onChange={(sort) => setDepartment(sort)}
                      />
                      <Sort
                        title="Education"
                        onChange={(sort) => setEducation(sort)}
                      />
                      <Sort
                        title="Experience"
                        onChange={(sort) => setExperience(sort)}
                      />
                    </div>
                  </div>
                  {jobs.map((item) => (
                    <Hospital hospital={item} key={item.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              (openDialog ? "block" : "hidden") +
              " fixed z-10 inset-0 overflow-y-auto"
            }
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5	pb-3"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div
                  className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50"
                  onClick={() => setOpenDialog(false)}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
                <div className="bg-white">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900 p-3"
                        id="modal-headline"
                      >
                        {filterDetails.title}
                      </h3>
                      <div className="mt-2 border-t border-gray-300 border-solid p-4">
                        <div className="grid grid-cols-4">
                          {filterDetails.filters.map((item) => (
                            <div
                              className="col-span-4 md:col-span-1"
                              key={item.key}
                            >
                              <Filter item={item} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="p-5 bg-white">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-2">
              <label className="text-lg font-bold mb-2 mt-2">
                {"About Us"}
              </label>
              <p className="text-sm mt-1 text-gray-700 block">
                {
                  "We are a team of nurses, doctors, technologies and executives dedicated to help nurses find jobs that they love"
                }
              </p>
              <p className="text-sm mt-1 text-gray-700 block">
                {"All copyrights © reserved 2020 - Health Explore"}
              </p>
            </div>
            <div className="col-span-4 md:col-span-1">
              <label className="text-lg font-bold mb-2 mt-2">{"Sitemap"}</label>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Nurses"}
              </a>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Employers"}
              </a>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Social networking"}
              </a>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Jobs"}
              </a>
            </div>
            <div className="col-span-4 md:col-span-1">
              <label className="text-lg font-bold mb-2 mt-2">{"Privacy"}</label>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Terms of use"}
              </a>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Privacy policy"}
              </a>
              <a href="/#" className="text-sm mt-1 text-gray-700 block">
                {"Cookie policy"}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
