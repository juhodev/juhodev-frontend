import * as React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from '../ts/utils';

const { useState, useEffect } = React;

type Path = {
	to: string;
	name: string;
};

const Navigation = () => {
	const [currentTab, setCurrentTab] = useState(window.location.pathname);
	const [paths, setPaths] = useState<Path[]>([
		{ to: '/', name: 'Home' },
		{ to: '/steam', name: 'Steam' },
	]);
	const [userType, setUserType] = useState<string>('NOT_LOGGED_IN');

	useEffect(() => {
		const jwt: string = localStorage.getItem('jwt');

		if (jwt === null) {
			setUserType('PREVIEW_ONLY');
			return;
		}
		const decodedJWT: any = jwtDecode(jwt);
		const userType: string = decodedJWT['payload'].userType;
		setUserType(userType);

		// If the user has connected their discord account then display all the paths. Otherwise only so the /steam route.
		if (userType === 'DISCORD_LOGIN') {
			const loggedInPaths = [
				{ to: '/', name: 'Home' },
				{ to: '/home', name: 'Discord' },
				{ to: '/images', name: 'Images' },
				{ to: '/clips', name: 'Clips' },
				{ to: '/profile', name: 'Profile' },
				{ to: '/steam', name: 'Steam' },
			];

			setPaths(loggedInPaths);
			return;
		}
	}, []);

	const updateTab = (newTab: string) => {
		if (currentTab.toLowerCase() === '/steam' && currentTab === newTab) {
			// This refreshes the page. Profiles have the same url as the search page so by clicking the Steam link
			// on a profile page would not refresh the page but only change the url to /steam (you would not get to the search
			// page that would be the expected behavior)
			window.location.replace('/steam');
			return;
		}

		setCurrentTab(newTab);
	};

	const links: JSX.Element[] = paths.map(
		(path): JSX.Element => {
			let className = 'sm:mx-5 text-gray-200 mx-2';

			if (currentTab === path.to) {
				className += ' font-bold border-b-2 border-blue-600';
			}

			return (
				<Link
					key={path.name}
					className={className}
					to={path.to}
					onClick={() => updateTab(path.to)}
				>
					{path.name}
				</Link>
			);
		},
	);

	const logout = () => {
		localStorage.clear();
		window.location.reload();
	};

	if (userType === 'NOT_LOGGED_IN' || currentTab === '/') {
		return null;
	}

	return (
		<div className="flex flex-row md:text-3xl text-lg justify-evenly my-2">
			<div className="flex justify-center">{links}</div>
			<button
				className="mx-5 text-gray-200 cursor-pointer"
				onClick={logout}
			>
				Logout
			</button>
		</div>
	);
};

export default Navigation;
