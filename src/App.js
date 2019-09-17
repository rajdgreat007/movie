import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Search from "./pages/search/Search";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Route path="/" exact component={Search} />
          <Route path="/popular" component={Search} />
          <Route path="/trending" component={Search} />
          <Route path="/newest" component={Search} />
          <Route path="/toprated" component={Search} />
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
