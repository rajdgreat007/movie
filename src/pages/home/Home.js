import React from "react";
import { Redirect } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import "./Home.css";
import logo from "../../logo.png";

class Home extends React.Component {
  state = { redirect: false };
  searchTerm = "";
  onSearchSubmit = searchTerm => {
    this.searchTerm = searchTerm;
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/search/${this.searchTerm}`} />;
    }
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
        </header>
        <SearchBar onSearchSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default Home;
