import * as React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './Auth';
import Clips from './clips/Clips';
import ClipView from './clips/ClipView';
import Home from './Home';
import Images from './images/Images';
import ImageView from './images/ImageView';
import Landing from './Landing';
import Navigation from './Navigation';

const Main = () => {
	return (
		<Router>
			<Navigation />
			<Route exact path="/" component={Landing} />
			<Route path="/home" component={Home} />
			<Route path="/images" component={Images} />
			<Route path="/image" component={ImageView} />
			<Route path="/clips" component={Clips} />
			<Route path="/clip" component={ClipView} />
			<Route path="/auth" component={Auth} />
		</Router>
	);
};

export default Main;
