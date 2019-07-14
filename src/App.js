import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </Router>
    </div>
  );
}

export default App;
