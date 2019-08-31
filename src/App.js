import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/search/:searchTerm" component={Search} />
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
