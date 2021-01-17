import * as React from 'react';

type Props = {
	kills: number;
	deaths: number;
	assists: number;
	killDeathRatio: string;
};

const CsgoKDA = (props: Props) => {
	const stats = [
		{ name: 'Avg. kills', count: Math.round(props.kills) },
		{ name: 'Avg. deaths', count: Math.round(props.deaths) },
		{ name: 'Avg. assists', count: Math.round(props.assists) },
		{ name: 'K/D ratio', count: props.killDeathRatio },
	];

	const statsComponents = stats.map((stat) => (
		<div
			key={stat.name}
			className="flex flex-col bg-gray-800 rounded w-32 justify-center items-center my-2 py-1 shadow-lg mx-2 xl:mx-0"
		>
			<span className="text-blue-500 text-xl font-bold">{stat.name}</span>
			<span className="text-gray-100">{stat.count}</span>
		</div>
	));

	return <div className="flex flex-row xl:flex-col mt-0 xl:mt-4">{statsComponents}</div>;
};

export default CsgoKDA;
