import * as React from 'react';
import { Link } from 'react-router-dom';

const { useState } = React;

type Path = {
	to: string;
	name: string;
};

const Navigation = () => {
	const [currentTab, setCurrentTab] = useState(window.location.pathname);

	const paths: Path[] = [
		{ to: '/home', name: 'Home' },
		{ to: '/images', name: 'Images' },
		{ to: '/clips', name: 'Clips' },
		{ to: '/profile', name: 'Profile' },
		{ to: '/steam', name: 'Steam' },
	];

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

	return (
		<div className="flex flex-row pl-12 mt-2 mb-4 mx-1/5">
			<div className="flex-1">{links}</div>
			<span
				className="mx-5 text-3xl text-gray-200 cursor-pointer"
				onClick={logout}
			>
				Logout
			</span>
		</div>
	);
};

export default Navigation;
