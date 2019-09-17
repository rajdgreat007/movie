import React from "react";
import Select from "./Select";

const typeOptions = ["Movie", "Music"];
const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Discover = props => {
  const { years, onChangeYear, onChangeRating } = props;
  return (
    <div className="Discover">
      <h3>Discover Options</h3>
      <Select
        label="Rating"
        options={ratingOptions}
        onChange={rating => onChangeRating(rating)}
      ></Select>
      <Select
        label="Year"
        options={years}
        onChange={year => onChangeYear(year)}
      ></Select>
      <Select label="Type" options={typeOptions} onChange={() => {}}></Select>
      <Select label="Genre" options={typeOptions}></Select>
    </div>
  );
};

export default Discover;
