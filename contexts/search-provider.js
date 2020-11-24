import { useState, useEffect } from "react";

import SearchContext from "./search";
import SearchResultsContext from "./search-results";

export default function SearchProvider({ children }) {

  const [searchData, setSearchData] = useState({
    filter: {},
    text: '',
    sorter: {}
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log('searchData changed', searchData);
  }, [searchData]);

  return (
    <SearchContext.Provider value={{ params: searchData, setParams: setSearchData }}>
      <SearchResultsContext.Provider value={{ results: searchResults, setResults: setSearchResults }}>
        {children}
      </SearchResultsContext.Provider>
    </SearchContext.Provider>
  );
}