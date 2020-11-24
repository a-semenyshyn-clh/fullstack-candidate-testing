import filters from './data/filters.json';

export default (req, res) => {
  return res.status(200).json(filters);
}

export async function getAllFilters() {
  return filters;
}