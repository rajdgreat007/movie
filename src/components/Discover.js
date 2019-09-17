import React from 'react';
import Select from "./Select";

const typeOptions = ["Movie", "Music"];
const yearOptions = ["2001", "2002"];

const Discover = () => {
  return (
    <div className="Discover">
      <h3>Discover Options</h3>
      <Select label="Type" options={typeOptions}></Select>
      <Select label="Year" options={yearOptions}></Select>
    </div>
  )
}

export default Discover;