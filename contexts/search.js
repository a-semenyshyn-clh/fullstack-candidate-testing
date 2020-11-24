import { createContext, useContext } from "react";

const SearchContext = createContext({
  params: {
    filters: {},
    text: '',
    sorter: null
  },
  setParams: () => {}
});

export default SearchContext;

export const useSearchParamsContext = () => useContext(SearchContext);
