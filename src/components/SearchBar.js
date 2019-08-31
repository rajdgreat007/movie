import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  onFormSubmit = e => {
    const { onSearchSubmit } = this.props;
    const { searchTerm } = this.state;
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="SearchBar">
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            className="SearchInput"
            value={searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
            onClick={() => this.setState({ searchTerm: "" })}
            placeholder="Search for awesome gifs"
            // eslint-disable-next-line jsx-a11y/no-autofocus
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
