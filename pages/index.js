import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import HospitalItem from "../components/HospitalItem";
import FilterPanel from "../components/FilterPanel";
import SortBar from "../components/SortBar";
import Footer from "../components/Footer";
import "../styles/sass/style.scss";

const Home = () => {
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);

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

      <Nav onBarClick={() => setMenuOpened(true)} />
      <div className="main bg-gray-200 overflow-hidden">
        <div className="main-search w-full p-3 md:p-6 border-t bg-white md:bg-transparent">
          <input
            type="text"
            className="h-12 w-full md:border px-3 focus:outline-none"
            placeholder="Search for any job, title, keyworkds"
          />
        </div>
        <div className="main-content md:grid grid-cols-12 gap-4 h-full overflow-auto md:p-6 md:pr-3 pt-0">
          <div className="main-sidebar col-start-1 col-end-4 hidden md:block">
            {Object.keys(filters).map((key, id) => (
              <FilterPanel
                key={`filter-${id}`}
                field={key}
                data={filters[key]}
              />
            ))}
          </div>
          <div className="main-content border col-start-4 col-end-13 bg-white p-5">
            <div className="main-content-header h-16 w-full flex justify-between items-center md:mb-5">
              <span>
                <strong className="mr-3">{totalJobs}</strong>job postings
              </span>
              <SortBar />
            </div>
            <div className="main-content-data">
              {jobs.map((hospital, index) => (
                <HospitalItem key={`hospital-${index}`} data={hospital} />
              ))}
            </div>
          </div>
          <div className="col-span-12 mt-6 md:mt-0">
            <Footer />
          </div>
        </div>
      </div>
      {menuOpened && (
        <div className="fixed left-0 top-0 bottom-0 bg-white w-64 shadow-md pt-8">
          <i
            className="fas fa-times absolute top-0 right-0 p-3"
            onClick={() => setMenuOpened(false)}
          />
          <div className="overflow-auto h-full">
            <SortBar />
            {Object.keys(filters).map((key, id) => (
              <FilterPanel
                key={`filter-${id}`}
                field={key}
                data={filters[key]}
              />
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .main {
          height: calc(100vh - 64px);
        }

        @media (min-width: 767.98px) {
          .main-content {
            height: calc(100% - 3rem);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
