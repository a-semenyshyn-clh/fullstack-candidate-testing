import { createContext, useContext } from "react";

const SearchResultsContext = createContext({
  results: [],
  setResults: () => {}
});

export default SearchResultsContext;

export const useSearchResultsContext = () => useContext(SearchResultsContext);
