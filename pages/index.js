import fs from 'fs';
import { promisify } from 'util';

import SearchBar from "../components/search-bar";
import FilterGroup from "../components/filter-group";
import JobResults from "../components/job-results";

function categoryKeyToName(key) {
  return key.split('_').map(capitalizeFirstLetter).join(' ');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function IndexPage({ filters, allJobs }) {
  return (<>
    <SearchBar />
    <div className="flex -mt-4">
      <div className="lg:w-4/12 hidden lg:block">
        {
          Object.entries(filters)
            .map(([key, filters]) =>
              <FilterGroup key={key} name={categoryKeyToName(key)} filters={filters} />)
        }
      </div>
      <div className="lg:w-3/4 w-full mr-4 ml-4 lg:ml-0">
        <JobResults jobs={allJobs}/>
      </div>
    </div>
  </>);
}

export async function getServerSideProps() {
  const dataJson = await promisify(fs.readFile)('./data/filters.json');
  const data = JSON.parse(dataJson);

  const jobsJson = await promisify(fs.readFile)('./data/jobs.json');
  const jobs = JSON.parse(jobsJson);

  return {
    props: {
      filters: data,
      allJobs: jobs
    }
  };
}