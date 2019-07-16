import React from "react";
import axios from "axios";
import Gif from "../../components/Gif";
import "./Search.css";
import { getUrl } from "../../utils/utils";

class Search extends React.Component {
  state = { gifs: [] };

  componentDidMount() {
    const searchTerm = this.props.match.params.searchTerm;
    if (searchTerm) {
      const url = getUrl(searchTerm);
      axios
        .get(url)
        .then(response => {
          this.setState({ gifs: response.data.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <h1>Search Page</h1>
        <div className="Gifs">
          {this.state.gifs.map(gif => {
            return <Gif src={gif.images.original.url} key={gif.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default Search;
