import React from "react";
import axios from "axios";
import Gifffer from "gifffer";
import { Redirect } from "react-router-dom";
import throttle from "lodash.throttle";
import ErrorBoundary from "../../components/ErrorBoundary";
import Gif from "../../components/Gif";
import SearchBar from "../../components/SearchBar";
import { getUrl, LIMIT, useMockData } from "../../utils/utils";
import mockImagesFn from "../../mock/images";
import "./Search.css";
import logo from "../../logo.png";
import Spinner from "../../components/Spinner";

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
      loading: false,
      searchTerm: props.match.params.searchTerm,
      redirectToHome: false
    };

    const { searchTerm } = this.state;
    window.history.pushState(this.state, "", searchTerm);

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

  componentWillUnmount() {
    if (this.containerRef.current) {
      this.containerRef.current.removeEventListener(
        "scroll",
        this.throttleFunction
      );
    }

    window.onpopstate = null;
    window.removeEventListener("load", this.handleLoad);

    // stop all pending image requests
    if (window.stop !== undefined) {
      window.stop();
    } else if (document.execCommand !== undefined) {
      document.execCommand("Stop", false);
    }
  }

  handleLoad = () => {
    Gifffer();
  };

  onLastImageLoaded = () => {
    this.setState({ loading: false });
  };

  handleScroll = () => {
    const { fetching, offset, totalCount } = this.state;
    const container = this.containerRef.current;
    if (
      container.scrollHeight - container.scrollTop <
        container.clientHeight + 300 &&
      !fetching &&
      offset < totalCount
    ) {
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

    const { searchTerm, fetching, offset } = this.state;

    if (searchTerm && !fetching) {
      this.setState(() => {
        return { fetching: true, loading: true };
      });
      const url = getUrl(searchTerm, offset, LIMIT);
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
    const { redirectToHome, gifs, loading } = this.state;
    if (redirectToHome) {
      return <Redirect to="/" />;
      // using this hack instead of <Link> because of a bug in react-router-dom that breaks tests
    }
    return (
      <div className="Search">
        <div
          className="Logo"
          onClick={() => this.setState({ redirectToHome: true })}
          onKeyDown={() => {}}
          role="link"
          tabIndex={0}
        >
          <img src={logo} alt="logo" />
        </div>

        <ErrorBoundary>
          <SearchBar onSearchSubmit={this.onSearchSubmit} />
        </ErrorBoundary>
        <div className="Gifs" ref={this.containerRef}>
          {gifs.map((gif, idx) => {
            return (
              <Gif
                src={gif.images.original.url}
                key={gif.id}
                onLastImageLoaded={this.onLastImageLoaded}
                lastImage={gifs.length === idx + 1}
              />
            );
          })}
        </div>
        {loading && <Spinner />}
      </div>
    );
  }
}

export default Search;
