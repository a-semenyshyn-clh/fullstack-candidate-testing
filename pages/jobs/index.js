import { useState, useEffect } from 'react';
import Nav from 'components/nav';
import Footer from 'components/footer';
import JobList from 'components/jobs/JobList';
import JobType from 'components/jobs/JobType';
import { useSearch } from 'components/jobs/SearchFilter';

export default function Jobs({  }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const { searchIndex, setSearchIndex } = useSearch();

  const onChangeSearch = (val) => {
    setSearchIndex({
      filter: {},
      search: {
        name: val,
      },
    });
  };
  useEffect(() => {

    async function getJobs() {
      let response = await fetch(`/api/job`, {
        method: 'POST',
        body: JSON.stringify(searchIndex),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      setJobs(data);
    }

    async function getFilters() {
      const res = await fetch(`/api/filter`);
      let data = await res.json();
      setFilters(data);
    }

    getJobs();
    getFilters();
  }, [searchIndex]);

  return (
    <div>
      <Nav/>
      <div className="flex justify-center">
        <div className="container pt-20 flex flex-col min-h-screen h-full">

          <div className="mx-2">
            <div className="absolute h-10 mt-1 flex items-center pl-10">
              <svg className="h-4 w-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
            </div>
            <input
              type="search" placeholder="Search for any job, title, keywords or company"
              onChange={(e) => onChangeSearch(e.target.value)}
              className="block w-full bg-brand-white focus:outline-none focus:bg-white focus:shadow text-gray-700 font-bold pl-16 pr-4 py-3"/>
          </div>

          <div className="flex">
            <div className="hidden lg:flex flex-col w-1/4 mx-2 my-4">
              {
                Object.keys(filters).map( (item, idx) => (
                  <JobType name={ (item.split('_')).join(" ").toUpperCase() } data={filters} filter={item} key={idx}/>
                ))
              }
            </div>
            <div className="flex flex-col w-full lg:w-3/4 min-h-screen mx-2 my-4">
              <JobList jobs={jobs} jobfilter={filters} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
