// context/SearchContext.js
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const search = async (data) => {
    // Simulate a delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Use your logic to search through the array of objects
    // Replace the following line with your actual search logic
    const result = yourSearchFunction(data);

    setSearchResult(result);
  };

  return (
    <SearchContext.Provider value={{ formData, setFormData, searchResult, search }}>
      {children}
    </SearchContext.Provider>
  );
};
