import * as React from 'react';
import { CsgoMatch, PlayerStatistics } from '../../../../api/types';
import { isNil } from '../../../../ts/utils';

type Props = {
	match: CsgoMatch;
	selectPlayer: (statistics: PlayerStatistics) => void;
	selectedPlayer: PlayerStatistics;
};

const PlayerSelector = (props: Props) => {
	if (isNil(props.match.players)) {
		return <span className="text-red-500 text-lg">ERROR: This match doens't have players!</span>;
	}

	const nonSelected: string = 'bg-gray-800 rounded px-4 py-2 m-2 text-gray-200';
	const selected: string = 'bg-gray-800 rounded px-4 py-2 m-2 text-blue-500 font-bold';

	const players: React.ReactNode[] = props.match.players.map((statistic) => {
		if (statistic.player.id === props.selectedPlayer.player.id) {
			return (
				<button key={statistic.player.id} className={selected} onClick={() => props.selectPlayer(statistic)}>
					{statistic.player.name}
				</button>
			);
		}

		return (
			<button key={statistic.player.id} className={nonSelected} onClick={() => props.selectPlayer(statistic)}>
				{statistic.player.name}
			</button>
		);
	});

	return <div className="flex flex-row justify-evenly">{players}</div>;
};

export default PlayerSelector;
