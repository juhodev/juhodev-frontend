import * as React from 'react';
import { CsgoMap, MapStatistics } from '../../../../api/types';
import MapStats from '../../MapStats';

type Props = {
	mapStatistics: MapStatistics;
};

const CsgoMapHistory = (props: Props) => {
	const sortedMaps: CsgoMap[] = props.mapStatistics.maps
		.sort((a, b) => a.timesPlayed - b.timesPlayed)
		.reverse();

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

	console.log(sortedMaps);

	return (
		<div className="w-full px-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{mapStats}
		</div>
	);
};

export default CsgoMapHistory;
