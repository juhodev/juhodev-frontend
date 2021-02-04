import * as React from 'react';
import { CsgoMatch, PlayerStatistics } from '../../../../api/types';
import Heatmap from './Heatmap';
import PlayerSelector from './PlayerSelector';

const { useState } = React;

type Props = {
	match: CsgoMatch;
};

const HeatmapContainer = (props: Props) => {
	const [selectedPlayer, setSelectedPlayer] = useState<PlayerStatistics>(props.match.players[0]);

	return (
		<div className="flex flex-col">
			<PlayerSelector
				match={props.match}
				selectPlayer={(player) => setSelectedPlayer(player)}
				selectedPlayer={selectedPlayer}
			/>
			<Heatmap map={props.match.map} positions={selectedPlayer.unnecessaryStats?.firingHeatmap} />
		</div>
	);
};

export default HeatmapContainer;
