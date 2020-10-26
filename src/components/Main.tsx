import * as React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './Auth';
import Clips from './Clips';
import Home from './Home';
import Images from './Images';
import Landing from './Landing';
import Navigation from './Navigation';

const Main = () => {
	return (
		<Router>
			<Navigation />
			<Route exact path="/" component={Landing} />
			<Route path="/home" component={Home} />
			<Route path="/images" component={Images} />
			<Route path="/clips" component={Clips} />
			<Route path="/auth" component={Auth} />
		</Router>
	);
};

export default Main;
