import { createContext, useState, useContext } from 'react';

const contextSearchFilter = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchIndex, setSearchIndex] = useState({
    filter: {},
    search: {},
  });
  return (
    <contextSearchFilter.Provider
      value={{ searchIndex, setSearchIndex }}
    >
      {children}
    </contextSearchFilter.Provider>
  );
};

export const useSearch = () => useContext(contextSearchFilter);
