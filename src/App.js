import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import './App.css';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/search" component={Search} />
			</Switch>
		</div>
	);
}

export default App;
