import { useEffect, useState } from "react";

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const array = [
    {
      name: "ram",
      lname: "gupta",
    },
    {
      name: "harry",
      lname: "james",
    },
  ];

  useEffect(() => {
    const results = [];
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        array[i].lname.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        results.push(array[i]);
      }
    }
    if (results.length > 0) {
      setFilteredResults(results);
    } else if (results.length === 0 && searchQuery) {
      setFilteredResults([{ "error": "no results found" }]);
    } else {
      setFilteredResults(array);
    }
  }, [searchQuery]);
  return { filteredResults, searchQuery, setSearchQuery };
};
export default SearchFilter;
