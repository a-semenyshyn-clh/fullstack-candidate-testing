import SearchBar from "../components/search-bar";
import JobResults from "../components/job-results";
import { getAllFilters } from "./api/filters";
import { useSearchResultsContext } from "../contexts/search-results";
import FilterList from "../components/filter-list";

export default function IndexPage({ filters }) {
  const { results } = useSearchResultsContext();

  return (<>
    <SearchBar />
    <div className="flex lg:-mt-4 border-t border-gray-300 lg:border-t-0">
      <div className="lg:w-4/12 hidden lg:block">
        <FilterList filters={filters} />
      </div>
      <div className="lg:w-3/4 w-full lg:mx-4 lg:ml-0">
        <JobResults jobs={results} filters={filters}/>
      </div>
    </div>
  </>);
}

export async function getServerSideProps() {
  const filters = await getAllFilters();

  return {
    props: {
      filters: filters,
    }
  };
}