import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import Poster from "../../components/Poster";
import SearchBar from "../../components/SearchBar";
import { getUrl, getImageUrl, getYear } from "../../utils/utils";
import "./Search.css";
import Spinner from "../../components/Spinner";
import Discover from "../../components/Discover";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posters: [],
      searchTerm: "",
      loading: false,
      sortBy: props.match.path.replace("/", "") || "popular"
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleFetchResponse = response => {
    const posters = response.data.results;
    this.setState({ posters, loading: false, postersCopy: posters });
  };

  handleFetchError = error => {
    console.log(error);
    this.setState({ loading: false });
  };

  fetchData = (search, query) => {
    const { sortBy } = this.state;

    if (sortBy) {
      this.setState({ loading: true });
      let url = getUrl(sortBy + ".desc");
      if (search) url = getUrl(sortBy + ".desc", true, query);
      axios
        .get(url)
        .then(response => this.handleFetchResponse(response))
        .catch(error => this.handleFetchError(error));
    }
  };

  onSearchSubmit = searchTerm => {
    if (searchTerm) {
      this.setState({ searchTerm }, () => {
        this.fetchData(true, searchTerm);
      });
    }
  };

  filterByRating = rating => {
    if (rating) {
      const filteredPosters =
        this.state.postersCopy.filter(poster => {
          if (!poster.vote_average) return false;
          return poster.vote_average >= rating;
        }) || [];

      this.setState({
        posters: filteredPosters
      });
    }
  };

  filterByGenre = genreId => {
    if (genreId) {
      const filteredPosters =
        this.state.postersCopy.filter(poster => {
          if (!poster.genre_ids) return false;
          return poster.genre_ids.includes(genreId);
        }) || [];

      this.setState({
        posters: filteredPosters
      });
    }
  };

  filterByYear = year => {
    if (year) {
      const filteredPosters =
        this.state.postersCopy.filter(poster => {
          if (!poster.release_date) return false;
          const itemYear = getYear(poster.release_date);
          return year == itemYear;
        }) || [];

      this.setState({
        posters: filteredPosters
      });
    }
  };

  getYears = posters => {
    const years = [];
    posters &&
      posters.forEach(poster => {
        if (poster.release_date) {
          const year = getYear(poster.release_date);
          if (!years.includes(year)) {
            years.push(year);
          }
        }
      });
    return years;
  };

  render() {
    const { posters, loading, postersCopy } = this.state;
    return (
      <div className="Search">
        <div className="TopBar">
          <div className="Logo">Discover</div>

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
          {posters.map(poster => {
            return (
              <Poster
                src={getImageUrl(
                  poster.poster_path || "/zfE0R94v1E8cuKAerbskfD3VfUt.jpg"
                )}
                key={poster.id}
                title={poster.title}
                release={poster.release_date}
                alt={poster.title}
              />
            );
          })}
        </div>
        <Discover
          years={this.getYears(postersCopy)}
          onChangeYear={year => this.filterByYear(year)}
          onChangeRating={rating => {
            this.filterByRating(rating);
          }}
        />
        {loading && <Spinner />}
      </div>
    );
  }
}

export default Search;
