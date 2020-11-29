import * as React from 'react';
import {
	CsgoMap,
	DateMatches,
	GameWithStats,
	MapStatistics,
} from '../../../api/types';
import LineChart from '../../utils/LineChart';
import PieChart from '../../utils/PieChart';
import MapStats from '../MapStats';

type Props = {
	statistics: MapStatistics;
	matches: DateMatches[];
};

const CsgoMapStatistics = (props: Props) => {
	if (props.statistics.maps.length === 0) {
		return <h1>Loading</h1>;
	}

	const sortedMaps: CsgoMap[] = props.statistics.maps
		.sort((a, b) => a.timesPlayed - b.timesPlayed)
		.reverse();

	const total: number = sortedMaps
		.map((x) => x.timesPlayed)
		.reduce((prev, curr) => (prev += curr));

	const mapStats: JSX.Element[] = sortedMaps.map(
		(x): JSX.Element => {
			return (
				<div className="mx-2 my-2" key={x.name}>
					<MapStats
						map={x.name}
						timesPlayed={x.timesPlayed}
						compact={true}
					/>
				</div>
			);
		},
	);

	const chart: JSX.Element = (
		<PieChart
			name="Maps"
			total={`Total ${total}`}
			data={props.statistics.maps.map((x) => {
				return {
					name: x.name,
					num: x.timesPlayed,
				};
			})}
		/>
	);

	const lineChart: JSX.Element = (
		<LineChart name="Match frequency" dates={props.matches} />
	);

	return (
		<div className="w-full">
			<div className="md:flex flex-row h-32 p-4 my-8 hidden">
				{chart}
				{lineChart}
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{mapStats}
			</div>
		</div>
	);
};

export default CsgoMapStatistics;
