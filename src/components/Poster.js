import React from "react";
import "./Poster.css";

const Poster = (props) => {
  const { src, title, release, alt } = props;
  let year = "";
  if(release){
    year = release.split("-")[0];
  }
  return (
    <div className="Poster">
      <img src={src} alt={alt} />
      <div className="title">{title}</div>
      <div className="year">{year}</div>
    </div>
  );
}

export default Poster;
