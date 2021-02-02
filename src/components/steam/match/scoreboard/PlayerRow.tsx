import * as React from 'react';
import { CsgoPlayer, PlayerStatistics } from '../../../../api/types';

type Props = {
	player: PlayerStatistics;
	playerIndex: number;
};

const PlayerRow = (props: Props) => {
	const { player, playerIndex } = props;

	let trClassName: string;
	if (playerIndex % 2 === 0) {
		trClassName = 'text-gray-100 bg-gray-800';
	} else {
		trClassName = 'text-gray-100 bg-transparent';
	}

	return (
		<tr className={trClassName}>
			<td className="px-4 flex flex-row items-center my-1">
				<img className="w-8 h-8 overflow-hidden rounded mr-2" src={player.player.avatarLink} />
				<a href={`cs?id=${player.player.id}`}>{player.player.name}</a>
			</td>
			<td className="px-1 xl:table-cell hidden xl:px-4">{player.ping}</td>
			<td className="px-1 sm:px-4">{player.kills}</td>
			<td className="px-1 sm:table-cell hidden sm:px-4">{player.assists}</td>
			<td className="px-1 sm:px-4">{player.deaths}</td>
			<td className="px-1 sm:table-cell hidden sm:px-4">{player.mvps}</td>
			<td className="px-1 sm:table-cell hidden sm:px-4">{player.hsp}</td>
			<td className="px-1 sm:px-4">{player.score}</td>
		</tr>
	);
};

export default PlayerRow;
