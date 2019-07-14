import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../../logo.png";

const Home = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
      </header>
      <Link to="/search">Search</Link>
    </div>
  );
};

export default Home;
