import * as React from 'react';
import { CsgoPlayer } from '../../../../api/types';
import PlayerRow from './PlayerRow';

type Props = {
	terroristTeam: CsgoPlayer[];
	counterTerroristTeam: CsgoPlayer[];
	terroristRounds: number;
	counterTerroristRounds: number;
};

const Scoreboard = (props: Props) => {
	const sortedTSide: CsgoPlayer[] = props.terroristTeam
		.sort((a, b) => a.score - b.score)
		.reverse();

	const sortedCTSide: CsgoPlayer[] = props.counterTerroristTeam
		.sort((a, b) => a.score - b.score)
		.reverse();

	return (
		<table className="w-full">
			<tbody>
				<tr className="text-gray-500 text-xl">
					<td className="px-1 sm:px-4">Player</td>
					<td className="px-1 xl:table-cell hidden xl:px-4">Ping</td>
					<td className="px-1 sm:px-4">Kills</td>
					<td className="px-1 sm:table-cell hidden sm:px-4">
						Assists
					</td>
					<td className="px-1 sm:px-4">Deaths</td>
					<td className="px-1 sm:table-cell hidden sm:px-4">MVPs</td>
					<td className="px-1 sm:table-cell hidden sm:px-4">HS %</td>
					<td className="px-1 sm:px-4">Score</td>
				</tr>
				<tr>
					<td className="pl-8 text-yellow-400 font-bold text-xl">
						{`T - ${props.terroristRounds}`}
					</td>
				</tr>
				{sortedTSide.map((player, index) => (
					<PlayerRow player={player} playerIndex={index} />
				))}
				<tr>
					<td className="pl-8 text-blue-500 font-bold text-xl">
						{`CT - ${props.counterTerroristRounds}`}
					</td>
				</tr>
				{sortedCTSide.map((player, index) => (
					<PlayerRow player={player} playerIndex={index} />
				))}
			</tbody>
		</table>
	);
};

export default Scoreboard;
