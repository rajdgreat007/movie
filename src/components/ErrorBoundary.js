import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(err) {
    return { error: true };
  }

  // componentDidCatch(err, errInfo) {
  //   console.log(err, errInfo);
  // }

  render() {
    return this.state.error ? (
      <div>
        <p>Oops, something went wrong</p>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
