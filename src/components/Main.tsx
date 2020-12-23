import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Landing = React.lazy(() => import('./Landing'));
const Navigation = React.lazy(() => import('./Navigation'));
const Hoi4Dashboard = React.lazy(() => import('./hoi4/Hoi4Dashboard'));
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
					<Route path="/home" render={() => <Home />} />
					<Route path="/images" render={() => <Images />} />
					<Route path="/image" render={() => <ImageView />} />
					<Route path="/clips" render={() => <Clips />} />
					<Route path="/clip" render={() => <ClipView />} />
					<Route path="/profile" render={() => <Profile />} />
					<Route path="/match" render={() => <CsgoMatchView />} />
					<Route path="/auth" render={() => <Auth />} />
					<Route path="/matches" render={() => <CsgoMatchesView />} />
					<Route path="/metrics" render={() => <Metrics />} />
					<Route
						path="/workermetrics"
						render={() => <DemoWorkerDashboard />}
					/>
					<Route path="/hoi4" render={() => <Hoi4Dashboard />} />
				</Switch>
			</Router>
		</React.Suspense>
	);
};

export default Main;
