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
		{ to: '/steam', name: 'Steam' },
	]);
	const [userType, setUserType] = useState<string>('NOT_LOGGED_IN');

	useEffect(() => {
		const jwt: string = localStorage.getItem('jwt');

		if (jwt === null) {
			return;
		}
		const decodedJWT: any = jwtDecode(jwt);
		const userType: string = decodedJWT['payload'].userType;
		setUserType(userType);

		// If the user has connected their discord account then display all the paths. Otherwise only so the /steam route.
		if (userType === 'DISCORD_LOGIN') {
			const loggedInPaths = [
				{ to: '/home', name: 'Home' },
				{ to: '/images', name: 'Images' },
				{ to: '/clips', name: 'Clips' },
				{ to: '/profile', name: 'Profile' },
				{ to: '/steam', name: 'Steam' },
			];

			setPaths(loggedInPaths);
			return;
		}
	}, []);

	const links: JSX.Element[] = paths.map(
		(path): JSX.Element => {
			let className = 'mx-5 text-3xl text-gray-200';

			if (currentTab === path.to) {
				className += ' font-bold border-b-2 border-blue-600';
			}

			return (
				<Link
					key={path.name}
					className={className}
					to={path.to}
					onClick={() => setCurrentTab(path.to)}
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

	if (userType === 'NOT_LOGGED_IN') {
		return null;
	}

	return (
		<div className="flex flex-row pl-12 mt-2 mb-4 mx-1/5">
			<div className="flex-1">{links}</div>
			<button
				className="mx-5 text-3xl text-gray-200 cursor-pointer"
				onClick={logout}
			>
				Logout
			</button>
		</div>
	);
};

export default Navigation;
