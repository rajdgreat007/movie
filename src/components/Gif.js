import React from "react";
import "./Gif.css";

class Gif extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = { rows: 0 };
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.onLoadImage);
  }

  onLoadImage = () => {
    const height = this.imageRef.current.clientHeight;
    this.setState({ rows: Math.ceil(height / 10) });
    if (this.props.lastImage) this.props.onLastImageLoaded();
  };

  render() {
    return (
      <div className="Gif" style={{ gridRowEnd: `span ${this.state.rows}` }}>
        <img
          ref={this.imageRef}
          data-gifffer={this.props.src}
          alt={this.props.alt}
        />
      </div>
    );
  }

  componentWillUnmount() {
    this.imageRef.current.removeEventListener("load", this.onLoadImage);
  }
}

export default Gif;
