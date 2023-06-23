import React from "react";

function Filter({ searchInput, onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Search by exercise name or date"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}

export default Filter;
