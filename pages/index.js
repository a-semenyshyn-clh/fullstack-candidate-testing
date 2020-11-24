import React, { useEffect, useState } from "react";
import Head from "next/head";
import moment from "moment";
import Nav from "../components/nav";
import HospitalItem from "../components/HospitalItem";
import FilterPanel from "../components/FilterPanel";
import SortBar from "../components/SortBar";
import Footer from "../components/Footer";
import "../styles/sass/style.scss";

const Home = () => {
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [totalNumber, setTotalNumber] = useState(0);

  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    async function getJSONFiles() {
      const filtersDataResult = await fetch("/data/filters.json");
      const filters = await filtersDataResult.json();
      const jobsDataResult = await fetch("/data/jobs.json");
      let jobs = await jobsDataResult.json();

      let sortedJobs = jobs.map((x) => {
        const items = x.items.sort((first, second) => {
          const firstDate = moment(first.created);
          const secondDate = moment(second.created);
          return firstDate.isBefore(secondDate) ? 1 : -1;
        });
        return { ...x, items: items };
      });

      setJobs(sortedJobs);
      setFilters(filters);
      setFilteredJobs(sortedJobs);

      const number = jobs.reduce(
        (sum, item) => sum + item.total_jobs_in_hospital,
        0
      );

      setTotalNumber(number);
    }

    getJSONFiles();
  }, []);

  useEffect(() => {
    console.log("searching");
    let temp = [...jobs];

    if (debouncedSearchTerm) {
      temp = temp.map((x) => {
        const filterItems = x.items.filter((y) => {
          let flag = false;
          Object.keys(y).forEach((key) => {
            console.log(y[key]);
            if (Array.isArray(y[key]) && y[key].length) {
              if (isNaN(y[key][0])) {
                flag =
                  flag ||
                  y[key].join(",").toLowerCase().includes(debouncedSearchTerm);
              } else {
                flag =
                  flag ||
                  y[key].findIndex(
                    (z) => z.toString() == debouncedSearchTerm
                  ) >= 0;
              }
            } else if (y[key] && isNaN(y[key])) {
              console.log("123", y[key]);
              flag = flag || y[key].toLowerCase().includes(debouncedSearchTerm);
            } else if (!isNaN(y[key])) {
              flag = flag || y[key].toString() == debouncedSearchTerm;
            }
          });
          return flag;
        });
        return { ...x, items: filterItems };
      });
    }
    const filteredItems = temp.filter((x) => x.items.length);
    setFilteredJobs(filteredItems);
    const number = filteredItems.reduce(
      (sum, item) => sum + item.items.length,
      0
    );

    setTotalNumber(number);
  }, [debouncedSearchTerm]);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="main-content md:grid grid-cols-12 gap-4 h-full overflow-auto md:p-6 md:pr-3 md:pt-0">
          <div className="main-sidebar col-start-1 col-end-4 hidden md:block">
            {Object.keys(filters).map((key, id) => (
              <FilterPanel
                key={`filter-${id}`}
                field={key}
                data={filters[key]}
              />
            ))}
          </div>
          <div className="border col-start-4 col-end-13 bg-white p-5">
            <div className="main-content-header h-16 w-full flex justify-between items-center md:mb-5">
              <span>
                <strong className="mr-3">{totalNumber}</strong>job postings
              </span>
              <SortBar className="p-2 md:p-0 hidden md:flex" />
            </div>
            <div className="main-content-data">
              {filteredJobs.map((hospital, index) => (
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
            <SortBar className="p-2 md:p-0 md:flex" />
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
        .main-content {
          height: calc(100vh - 161px);
        }
      `}</style>
    </div>
  );
};

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default Home;
