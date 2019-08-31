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

  componentWillUnmount() {
    if (this.imageRef.current) {
      this.imageRef.current.removeEventListener("load", this.onLoadImage);
    }
  }

  onLoadImage = () => {
    const { lastImage, onLastImageLoaded } = this.props;
    const height = this.imageRef.current.clientHeight;
    this.setState({ rows: Math.ceil(height / 10) });
    if (lastImage) onLastImageLoaded();
  };

  render() {
    const { rows } = this.state;
    const { src, alt } = this.props;
    return (
      <div className="Gif" style={{ gridRowEnd: `span ${rows}` }}>
        <img ref={this.imageRef} data-gifffer={src} alt={alt} />
      </div>
    );
  }
}

export default Gif;
