import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { searchTerm: "" };

  render() {
    return (
      <div className="SearchBar">
        <input
          type="text"
          className="SearchInput"
          value={this.state.searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
          placeholder="Search for an awesome gif"
        />
        <button
          className="SearchButton"
          onClick={() => this.props.onSearchSubmit(this.state.searchTerm)}
        >
          <i className="material-icons">search</i>
        </button>
      </div>
    );
  }
}

export default SearchBar;
