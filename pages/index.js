import fs from 'fs';
import SearchBar from "../components/search-bar";
import FilterGroup from "../components/filter-group";

function categoryKeyToName(key) {
  return key.split('_').map(capitalizeFirstLetter).join(' ');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function IndexPage({ filters }) {
  return (<>
    <SearchBar />
    <div className="flex">
      <div className="w-1/4 -mt-4">
        {
          Object.entries(filters)
            .map(([key, filters]) =>
              <FilterGroup key={key} name={categoryKeyToName(key)} filters={filters} />)
        }
      </div>
    </div>
  </>);
}

export async function getServerSideProps() {
  const dataJson = fs.readFileSync('./data/filters.json');
  const data = JSON.parse(dataJson);

  return {
    props: {
      filters: data
    }
  };
}