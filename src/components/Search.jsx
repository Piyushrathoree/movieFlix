import React from "react";

const Search = (props) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="Search Icon" />
        <input
          type="text"
          value={props.searchTerm}
          placeholder="Search for Thousands of Movies..."
          onChange={(e) => {
            props.setSearchTerm(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Search;
