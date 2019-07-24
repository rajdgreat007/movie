import React from "react";
import axios from "axios";
import Gifffer from "gifffer";
import { Link, BrowserRouter } from "react-router-dom";
import throttle from "lodash.throttle";
import Gif from "../../components/Gif";
import SearchBar from "../../components/SearchBar";
import { getUrl, LIMIT, useMockData } from "../../utils/utils";
import mockImagesFn from "../../mock/images";
import "./Search.css";
import logo from "../../logo.png";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      gifs: [],
      offset: 0,
      fetching: false,
      searchTerm: "",
      totalCount: 0
    };

    this.state = {
      ...this.defaultState,
      searchTerm: this.props.match.params.searchTerm
    };

    window.history.pushState(this.state, "", this.state.searchTerm);

    this.containerRef = React.createRef();
    this.throttleFunction = throttle(this.handleScroll, 500);
  }

  componentDidMount() {
    this.fetchData();
    this.containerRef.current.addEventListener("scroll", this.throttleFunction);
    window.onpopstate = event => {
      if (event.state) {
        this.setState({ ...event.state }, () => {
          this.fetchData();
        });
      }
    };
    window.addEventListener("load", this.handleLoad);
  }

  handleLoad = () => {
    Gifffer();
  };

  handleScroll = () => {
    const container = this.containerRef.current;
    if (
      container.scrollHeight - container.scrollTop <
        container.clientHeight + 300 &&
      !this.state.fetching &&
      this.state.offset < this.state.totalCount
    ) {
      this.setState({ fetching: true });
      this.fetchData();
    }
  };

  setStateWithMockData = () => {
    this.setState(state => {
      return {
        gifs: state.gifs.concat(mockImagesFn()),
        offset: state.offset + LIMIT,
        fetching: false
      };
    });
  };

  handleFetchResponse = response => {
    this.setState(prevState => {
      const totalCount = response.data.pagination.total_count;
      return {
        gifs: prevState.gifs.concat(response.data.data),
        offset: prevState.offset + LIMIT,
        fetching: false,
        totalCount:
          prevState.totalCount !== totalCount
            ? totalCount
            : prevState.totalCount
      };
    });
    Gifffer();
  };

  handleFetchError = error => {
    console.log(error);
  };

  fetchData = () => {
    if (useMockData) {
      this.setStateWithMockData();
      return;
    }

    if (this.state.searchTerm) {
      const url = getUrl(this.state.searchTerm, this.state.offset, LIMIT);
      axios
        .get(url)
        .then(response => this.handleFetchResponse(response))
        .catch(error => this.handleFetchError(error));
    }
  };

  onSearchSubmit = searchTerm => {
    if (searchTerm) {
      const newState = {
        ...this.defaultState,
        searchTerm
      };
      this.setState(newState, () => {
        window.history.pushState(newState, "", searchTerm);
        this.fetchData();
      });
    }
  };

  render() {
    return (
      <div className="Search">
        <div className="Logo">
          <BrowserRouter>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </BrowserRouter>
        </div>

        <SearchBar onSearchSubmit={this.onSearchSubmit} />
        <div className="Gifs" ref={this.containerRef}>
          {this.state.gifs.map(gif => {
            return <Gif src={gif.images.original.url} key={gif.id} />;
          })}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.containerRef.current.removeEventListener(
      "scroll",
      this.throttleFunction
    );
    window.onpopstate = null;
    window.removeEventListener("load", this.handleLoad);
  }
}

export default Search;
