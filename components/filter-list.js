import FilterGroup from "./filter-group";

function categoryKeyToName(key) {
  return key.split('_').map(capitalizeFirstLetter).join(' ');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function FilterList({ filters }) {
  return Object.entries(filters)
    .map(([key, filters]) =>
      <FilterGroup key={key} rawName={key} name={categoryKeyToName(key)} filters={filters} />)
}