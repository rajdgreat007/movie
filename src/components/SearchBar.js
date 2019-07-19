import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { searchTerm: "" };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            className="SearchInput"
            value={this.state.searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
            onClick={e => this.setState({ searchTerm: "" })}
            placeholder="Search for awesome gifs"
            autoFocus
          />
          <button type="submit" className="SearchButton">
            <i className="material-icons">search</i>
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
