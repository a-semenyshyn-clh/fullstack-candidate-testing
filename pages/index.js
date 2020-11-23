import React, { useEffect, useState } from "react";
import Head from "next/head";
import moment from "moment";
import Nav from "../components/nav";
import "../styles/sass/style.scss";

const Home = () => {
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(-1);

  const [sortOptions, setSortOptions] = useState([
    {
      text: "Location",
      value: "",
    },
    {
      text: "Role",
      value: "",
    },
    {
      text: "Department",
      value: "",
    },
    {
      text: "Education",
      value: "",
    },
    {
      text: "Experience",
      value: "",
    },
  ]);

  const totalJobs = jobs.reduce(
    (sum, item) => sum + item.total_jobs_in_hospital,
    0
  );

  useEffect(() => {
    async function getJSONFiles() {
      console.log("getStaticProps");
      const res1 = await fetch("/data/filters.json");
      const filters = await res1.json();
      const res2 = await fetch("/data/jobs.json");
      let jobs = await res2.json();
      jobs = jobs.map((job) => ({ ...job, selected: false }));
      console.log("fiters", filters);
      console.log("jobs", jobs);

      setJobs(jobs);
      setFilters(filters);
    }

    getJSONFiles();
  }, []);

  const onHospitalClick = (index) => {
    let temp = jobs;
    if (index !== selectedHospital && selectedHospital > -1) {
      temp[selectedHospital].selected = false;
    }
    temp[index].selected = !temp[index].selected;
    setJobs(temp);
    setSelectedHospital(index !== selectedHospital ? index : -1);
    console.log(temp);
  };

  const getDifference = (date) => {
    if (date) {
      const now = moment();
      const startTime = moment(date);
      const duration = moment.duration(now.diff(startTime));

      return `${duration.hours()} ago`;
    }

    return "";
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Head>

      <Nav />
      <div className="main p-6 bg-gray-200 overflow-hidden">
        <div className="main-search w-full mb-3">
          <input
            type="text"
            className="h-8 w-full border px-3 focus:outline-none"
            placeholder="Search for any job, title, keyworkds"
          />
        </div>
        <div className="main-content grid grid-cols-12 gap-4 h-full overflow-auto">
          <div className="main-sidebar col-start-1 col-end-4">
            {Object.keys(filters).map((key) => {
              const title = key.replace("_", " ").toUpperCase();

              return (
                <div key={`filter-${key}`} className="p-5 bg-white mb-3">
                  <h4 className="font-bold mb-3">{title}</h4>
                  {filters[key].map((item, index) => (
                    <div
                      key={`filter-sub-${index}`}
                      className="flex justify-start items-center mb-3"
                    >
                      <span className="">{item.key}</span>
                      <span className="text-gray-500 ml-3">
                        {item.doc_count}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="main-content border col-start-4 col-end-13 bg-white p-5">
            <div className="main-content-header h-16 w-full flex justify-between items-center mb-5">
              <span>
                <strong className="mr-3">{totalJobs}</strong>job postings
              </span>
              <ul className="flex">
                <li className="text-gray-500 px-3">Sort by</li>
                {sortOptions.map((item, index) => (
                  <li
                    key={`sort-${index}`}
                    className="font-bold text-black px-3"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="main-content-data">
              {jobs.map((hospital, index) => {
                const iconTitle = hospital.name.slice(0, 2).toUpperCase();
                const title = `${hospital.total_jobs_in_hospital} jobs for ${hospital.name}`;
                // console.log("hosiptal", hospital);
                return (
                  <div className="" key={`hospital-${index}`}>
                    <div
                      className="flex justify-start items-center cursor-pointer p-3 hover:bg-gray-100"
                      onClick={() => onHospitalClick(index)}
                    >
                      <div className="w-10 h-10 rounded-md flex justify-center items-center bg-gray-500 text-white">
                        {iconTitle}
                      </div>
                      <div className="text-black ml-5">{title}</div>
                    </div>
                    {hospital.selected &&
                      hospital.items.map((item, key) => {
                        const shortDescription = `${
                          item.job_type
                        } | ${item.salary_range
                          .map((x) => `$x`)
                          .join(" - ")} an hour | ${item.address}, ${
                          item.state
                        }`;

                        console.log("shortDescription", shortDescription);

                        return (
                          <div
                            key={`job-${key}`}
                            className="border-t py-3 px-3 flex justify-between items-center"
                          >
                            <div>
                              <h4 className="font-bold">{item.job_title}</h4>
                              <h5>{shortDescription}</h5>
                            </div>
                            <span>{getDifference(item.created)}</span>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .main {
          height: calc(100vh - 64px);
        }

        .main-content {
          height: calc(100% - 3rem);
        }
      `}</style>
    </div>
  );
};

export default Home;
