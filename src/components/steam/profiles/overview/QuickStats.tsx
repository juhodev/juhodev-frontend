import * as React from 'react';

type Props = {
	won: number;
	lost: number;
	tied: number;
	total: number;
	winLossRation: string;
};

const QuickStats = (props: Props) => {
	const stats = [
		{ name: 'Total', count: props.total },
		{ name: 'Won', count: props.won },
		{ name: 'Lost', count: props.lost },
		{ name: 'Tied', count: props.tied },
		{ name: 'W/L ratio', count: props.winLossRation },
	];

	const statsComponents = stats.map((stat) => (
		<div
			key={stat.name}
			className="flex flex-col bg-gray-800 rounded w-32 justify-center items-center my-2 py-1 shadow-lg mx-2 xl:mx-0"
		>
			<span className="text-blue-500 text-xl font-bold">
				{stat.name}
			</span>
			<span className="text-gray-100 text-lg">{stat.count}</span>
		</div>
	));

	return <div className="flex flex-row xl:flex-col">{statsComponents}</div>;
};

export default QuickStats;
