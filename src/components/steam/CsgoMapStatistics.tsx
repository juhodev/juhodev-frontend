import * as React from 'react';
import { CsgoMap, MapStatistics } from '../../api/types';
import PieChart from '../utils/PieChart';
import MapStats from './MapStats';

type Props = {
	statistics: MapStatistics;
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
				<div className="mx-2 my-2">
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

	return (
		<div className="">
			{chart}
			<div
				className="mt-2 flex"
				style={{ flexWrap: 'wrap', justifyContent: 'space-evenly' }}
			>
				{mapStats}
			</div>
		</div>
	);
};

export default CsgoMapStatistics;
