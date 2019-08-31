import React from "react";
import { Redirect } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
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
          <img src={logo} className="Logo" alt="logo" />
        </header>
        <ErrorBoundary>
          <SearchBar onSearchSubmit={this.onSearchSubmit} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Home;
