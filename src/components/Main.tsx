import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Landing = React.lazy(() => import('./Landing'));
const Navigation = React.lazy(() => import('./Navigation'));
const Hoi4 = React.lazy(() => import('./hoi4/Hoi4Dashboard'));
const Home = React.lazy(() => import('./Home'));
const Images = React.lazy(() => import('./images/Images'));
const ImageView = React.lazy(() => import('./images/ImageView'));
const Clips = React.lazy(() => import('./clips/Clips'));
const ClipView = React.lazy(() => import('./clips/ClipView'));
const Profile = React.lazy(() => import('./profile/Profile'));
const Steam = React.lazy(() => import('./steam/Steam'));
const CsgoMatchView = React.lazy(() => import('./steam/CsgoMatchView'));
const Auth = React.lazy(() => import('./Auth'));
const CsgoMatchesView = React.lazy(
	() => import('./steam/matches/CsgoMatchesView'),
);
const Metrics = React.lazy(() => import('./metrics/Metrics'));
const DemoWorkerDashboard = React.lazy(
	() => import('./demoworker/DemoWorkerDashboard'),
);

const Main = () => {
	return (
		<React.Suspense fallback={<span>Loading...</span>}>
			<Router>
				<Navigation />
				<Switch>
					<Route exact path="/" render={() => <Landing />} />
					<Route path="/steam" render={() => <Steam />} />
					{/* <Route path="/home" component={Home} />
					<Route path="/images" component={Images} />
					<Route path="/image" component={ImageView} />
					<Route path="/clips" component={Clips} />
					<Route path="/clip" component={ClipView} />
					<Route path="/profile" component={Profile} />
					<Route path="/steam" component={Steam} />
					<Route path="/match" component={CsgoMatchView} />
					<Route path="/auth" component={Auth} />
					<Route path="/matches" component={CsgoMatchesView} />
					<Route path="/metrics" component={Metrics} />
					<Route
						path="/workermetrics"
						component={DemoWorkerDashboard}
					/>
					<Route path="/hoi4" component={Hoi4} /> */}
				</Switch>
			</Router>
		</React.Suspense>
	);
};

export default Main;
