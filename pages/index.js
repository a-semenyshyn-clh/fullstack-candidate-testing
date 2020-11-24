import SearchBar from "../components/search-bar";
import FilterGroup from "../components/filter-group";
import JobResults from "../components/job-results";
import { getAllFilters } from "./api/filters";
import { getAllJobs } from "./api/jobs";
import { useSearchResultsContext } from "../contexts/search-results";

function categoryKeyToName(key) {
  return key.split('_').map(capitalizeFirstLetter).join(' ');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function IndexPage({ filters }) {

  const { results } = useSearchResultsContext();

  return (<>
    <SearchBar />
    <div className="flex -mt-4">
      <div className="lg:w-4/12 hidden lg:block">
        {
          Object.entries(filters)
            .map(([key, filters]) =>
              <FilterGroup key={key} rawName={key} name={categoryKeyToName(key)} filters={filters} />)
        }
      </div>
      <div className="lg:w-3/4 w-full mr-4 ml-4 lg:ml-0">
        <JobResults jobs={results}/>
      </div>
    </div>
  </>);
}

export async function getServerSideProps() {
  const filters = await getAllFilters();
  const jobs = await getAllJobs();

  return {
    props: {
      filters: filters,
    }
  };
}