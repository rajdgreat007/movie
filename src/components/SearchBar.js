import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { searchTerm: "" };

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchInput">
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
            placeholder="Search for gif"
          />
        </div>
        <div className="SearchButton">
          <input
            type="button"
            value="search"
            onClick={() => this.props.onSearchSubmit(this.state.searchTerm)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
