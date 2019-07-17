import React from "react";
import axios from "axios";
import throttle from "lodash.throttle";
import Gif from "../../components/Gif";
import SearchBar from "../../components/SearchBar";
import { getUrl, LIMIT, useMockData } from "../../utils/utils";
import mockImagesFn from "../../mock/images";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      offset: 0,
      fetching: false
    };

    this.totalCount = 0;
    this.containerRef = React.createRef();
    this.throttleFunction = throttle(this.handleScroll, 500);
  }

  componentDidMount() {
    this.fetchData();
    this.containerRef.current.addEventListener("scroll", this.throttleFunction);
  }

  handleScroll = () => {
    const container = this.containerRef.current;
    if (
      container.scrollHeight - container.scrollTop <
        container.clientHeight + 300 &&
      !this.state.fetching &&
      this.state.offset < this.totalCount
    ) {
      this.setState({ fetching: true });
      this.fetchData();
    }
  };

  fetchData = () => {
    if (useMockData) {
      this.setState(state => {
        return {
          gifs: state.gifs.concat(mockImagesFn()),
          offset: state.offset + LIMIT,
          fetching: false
        };
      });
      return;
    }
    const searchTerm = this.props.match.params.searchTerm;
    if (searchTerm) {
      const url = getUrl(searchTerm, this.state.offset, LIMIT);
      axios
        .get(url)
        .then(response => {
          this.setState(state => {
            return {
              gifs: state.gifs.concat(response.data.data),
              offset: state.offset + LIMIT,
              fetching: false
            };
          });
          if (!this.totalCount)
            this.totalCount = response.data.pagination.total_count;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <SearchBar />
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
  }
}

export default Search;
