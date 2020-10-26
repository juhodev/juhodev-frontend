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

	return <div className="pl-12 mt-2 mb-4 mx-1/5">{links}</div>;
};

export default Navigation;
