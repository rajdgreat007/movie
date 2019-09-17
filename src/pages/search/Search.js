import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ErrorBoundary from "../../components/ErrorBoundary";
import Poster from "../../components/Poster";
import SearchBar from "../../components/SearchBar";
import { getUrl, getImageUrl } from "../../utils/utils";
import "./Search.css";
import Spinner from "../../components/Spinner";
import Discover from "../../components/Discover";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posters: [],
      searchTerm: "popular",
      loading: false,
      sortBy: props.match.path.replace("/","")
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleFetchResponse = response => {
    this.setState({posters: response.data.results});
    this.setState({loading:false});
  };

  handleFetchError = error => {
    console.log(error);
    this.setState({loading:false});
  };

  fetchData = () => {
    const { sortBy } = this.state;

    if (sortBy) {
      this.setState({loading:true});
      const url = getUrl(sortBy+".desc");
      axios
        .get(url)
        .then(response => this.handleFetchResponse(response))
        .catch(error => this.handleFetchError(error));
    }
  };

  onSearchSubmit = searchTerm => {
    if (searchTerm) {
      const filteredPosters = this.state.posters.filter((poster)=>{
        if(!poster.title) return false;
        const title = poster.title.toLowerCase();
        return title.includes(searchTerm.toLowerCase());
      }) || [];

      this.setState({
        posters: filteredPosters
      })
      
    }
  };

  render() {
    const {posters, loading } = this.state;
    return (
      <div className="Search">
        <div className="TopBar">
          <div className="Logo">
            Discover
          </div>

          <div className="Links">
            <Link to="/popular">Popular</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/newest">Newest</Link>
            <Link to="/toprated">Top Rated</Link>
          </div>

          <ErrorBoundary>
            <SearchBar onSearchSubmit={this.onSearchSubmit} />
          </ErrorBoundary>
        </div>
        <div className="Posters">
          {posters.map((poster) => {
            return (
              <Poster
                src={getImageUrl(poster.poster_path || "/zfE0R94v1E8cuKAerbskfD3VfUt.jpg")}
                key={poster.id}
                title={poster.title}
                release={poster.release_date}
                alt={poster.title}
              />
            );
          })}
        </div>
        <Discover />
        {loading && <Spinner />}
      </div>
    );
  }
}

export default Search;
