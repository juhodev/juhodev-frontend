import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Auth = React.lazy(() => import('./Auth'));
const Clips = React.lazy(() => import('./clips/Clips'));
const ClipView = React.lazy(() => import('./clips/ClipView'));
const Home = React.lazy(() => import('./Home'));
const Images = React.lazy(() => import('./images/Images'));
const ImageView = React.lazy(() => import('./images/ImageView'));
const Landing = React.lazy(() => import('./Landing'));
const Navigation = React.lazy(() => import('./Navigation'));
const Profile = React.lazy(() => import('./profile/Profile'));
const CsgoMatchesView = React.lazy(() => import('./steam/matches/CsgoMatchesView'));
const Steam = React.lazy(() => import('./steam/Steam'));
const DemoWorkerDashboard = React.lazy(() => import('./demoworker/DemoWorkerDashboard'));
const Metrics = React.lazy(() => import('./metrics/Metrics'));
const GA = React.lazy(() => import('./projects/ga/GA'));
const Match = React.lazy(() => import('./steam/match/Match'));
const Login = React.lazy(() => import('./Login'));
const CsgoProfileView = React.lazy(() => import('./steam/profiles/CsgoProfileView'));
const Todo = React.lazy(() => import('./todo/Todo'));

const Main = () => {
	return (
		<Router>
			<React.Suspense fallback={<span>Loading...</span>}>
				<Navigation />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/home" component={Home} />
					<Route path="/images" component={Images} />
					<Route path="/image" component={ImageView} />
					<Route path="/clips" component={Clips} />
					<Route path="/clip" component={ClipView} />
					<Route path="/profile" component={Profile} />
					<Route path="/steam" component={Steam} />
					<Route path="/match" component={Match} />
					<Route path="/auth" component={Auth} />
					<Route path="/matches" component={CsgoMatchesView} />
					<Route path="/metrics" component={Metrics} />
					<Route path="/workermetrics" component={DemoWorkerDashboard} />
					<Route path="/ga" component={GA} />
					<Route path="/login" component={Login} />
					<Route path="/cs" component={CsgoProfileView} />
					<Route path="/todo" component={Todo} />
				</Switch>
			</React.Suspense>
		</Router>
	);
};

export default Main;
