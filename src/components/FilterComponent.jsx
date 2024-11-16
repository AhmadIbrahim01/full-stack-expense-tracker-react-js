import React from 'react';
import "./FilterComponent.css"

const FilterComponent = () => {
  return (
    <div className="filter-div">
      <label htmlFor="filter">Filter: </label>
      <button id="all">All</button>
      <button id="min">Min</button>
      <button id="max">Max</button>
    </div>
  );
};

export default FilterComponent;
