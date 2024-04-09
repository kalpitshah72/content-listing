import React from "react";
import Back from "../assets/images/Back.png";
import Search from "../assets/images/search.png";

const StickyHeader = ({
  title = "Romantic Comedy",
  setSearchQuery,
  searchQuery,
  setPageNumber,
  items,
  setItems,
  fetchData,
}) => {
  // Function to handle search
  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  // Function to filter search results
  function handleSearchResults() {
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(results);
  }

  // Function to handle back button
  function handleBackButton() {
    setPageNumber(1);
    fetchData(1, true);
    setSearchQuery("");
  }

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0">
        <div className="flex justify-between items-center p-3 sticky bg-[url('assets/images/nav_bar.png')]">
          <div className="flex items-center">
            <img
              src={Back}
              className="w-5 h-5"
              alt="Back Button"
              onClick={handleBackButton}
            />
            <span className="p-2 text-lg">{title}</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="text-[#000000]"
              minLength={2}
              maxLength={20}
            />
          </div>
          <img
            src={Search}
            className="w-5 h-5"
            alt="Search Button"
            onClick={handleSearchResults}
          />
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
