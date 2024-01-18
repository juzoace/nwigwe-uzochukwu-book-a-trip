// // context/SearchContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import flightListings from "../../flight-listing.json";

// interface Flight {
//   DepartureAirportName: string;
//   ArrivalAirportName: string;
//   // Add other properties as needed
// }

// interface SearchContextProps {
//   formData: any; // Change the type to match your formData structure
//   setFormData: React.Dispatch<React.SetStateAction<any>>;
//   searchResult: Flight[] | null;
//   search: (data: any) => Promise<void>; // Change the type to match your formData structure
// }

// const SearchContext = React.createContext<SearchContextProps | undefined>(undefined);

// export const useSearchContext = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error("useSearchContext must be used within a SearchProvider");
//   }
//   return context;
// };

// interface SearchProviderProps {
//   children: ReactNode;
// }

// export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
//   const [formData, setFormData] = useState<any | null>(null);
//   const [searchResult, setSearchResult] = useState<Flight[] | null>(null);

//   const search = async (data: any) => {
//     // Simulate a delay (3 seconds)
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     // Use your logic to search through the flight-listing.json file
//     // Replace the following line with your actual search logic
//     const result = searchFlightListing(data);

//     setSearchResult(result);
//   };

//   const searchFlightListing = (data: any) => {
//     // Perform the search operation on the flight-listing.json file
//     // Replace this with your actual search logic
//     const { from, to } = data;

//     // Filter the results based on DepartureAirportName and ArrivalAirportName
//     const result = flightListings.filter(
//       (flight) =>
//         flight.DepartureAirportName === from && flight.ArrivalAirportName === to
//     );

//     return result;
//   };

//   const contextValues: SearchContextProps = {
//     formData,
//     setFormData,
//     searchResult,
//     search,
//   };

//   return (
//     <SearchContext.Provider value={contextValues}>
//       {children}
//     </SearchContext.Provider>
//   );
// };
