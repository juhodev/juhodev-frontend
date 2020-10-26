import * as React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Landing from './Landing';
import Navigation from './Navigation';

const Main = () => {
	return (
		<Router>
			<Navigation />
			<Route exact path="/" component={Landing} />
			<Route path="/home" component={Home} />
			<Route path="/auth" component={Auth} />
		</Router>
	);
};

export default Main;
