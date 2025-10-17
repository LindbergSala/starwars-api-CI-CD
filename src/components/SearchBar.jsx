import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search Star Wars..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
