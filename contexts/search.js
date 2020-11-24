import { createContext, useContext } from "react";

const SearchContext = createContext({
  params: {
    filter: {},
    text: '',
    sorter: {}
  },
  setParams: () => {}
});

export default SearchContext;

export const useSearchParamsContext = () => useContext(SearchContext);
