import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  // componentDidCatch(err, errInfo) {
  //   console.log(err, errInfo);
  // }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    return error ? (
      <div>
        <p>Oops, something went wrong</p>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
