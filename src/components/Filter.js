import React from "react";

function Filter({ searchInput, onSearchChange, sort, onSortChange }) {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Search by exercise name or date"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="flex gap-2 w-full max-w-xs">
        <label className="label">
          <span className="label-text">Sort by: </span>
        </label>
        <select
          value={sort}
          onChange={onSortChange}
          className="select select-bordered"
        >
          <option value="Recent">Recent</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
