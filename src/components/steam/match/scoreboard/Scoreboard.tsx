import * as React from 'react';
import { PlayerStatistics } from '../../../../api/types';
import Sort from '../../../utils/Sort';
import PlayerRow from './PlayerRow';

const { useState } = React;

type Props = {
	terroristTeam: PlayerStatistics[];
	counterTerroristTeam: PlayerStatistics[];
	terroristRounds: number;
	counterTerroristRounds: number;
};

enum SortType {
	SCORE = 'SCORE',
	KILLS = 'KILLS',
	DEATHS = 'DEATHS',
	MVPS = 'MVPS',
}

const Scoreboard = (props: Props) => {
	const [sortType, setSortType] = useState<string>(SortType.SCORE);

	const sortPlayers = (players: PlayerStatistics[]): PlayerStatistics[] => {
		switch (sortType) {
			default:
			case SortType.SCORE:
				return players.sort((a, b) => a.score - b.score).reverse();

			case SortType.KILLS:
				return players.sort((a, b) => a.kills - b.kills).reverse();

			case SortType.DEATHS:
				return players.sort((a, b) => a.deaths - b.deaths).reverse();

			case SortType.MVPS:
				return players.sort((a, b) => a.mvps - b.mvps).reverse();
		}
	};

	const sortedTSide: PlayerStatistics[] = sortPlayers(props.terroristTeam);
	const sortedCTSide: PlayerStatistics[] = sortPlayers(props.counterTerroristTeam);

	return (
		<>
			<div className="flex w-full justify-end my-2">
				<span className="text-lg text-gray-200 mr-2">Sort by</span>
				<Sort
					sortTypes={[
						{ sortType: SortType.SCORE, displayName: 'Score' },
						{ sortType: SortType.KILLS, displayName: 'Kills' },
						{ sortType: SortType.DEATHS, displayName: 'Deaths' },
						{ sortType: SortType.MVPS, displayName: 'MVPs' },
					]}
					onChange={(type) => setSortType(type.sortType)}
				/>
			</div>
			<table className="w-full">
				<tbody>
					<tr className="text-gray-500 text-xl">
						<td className="px-1 sm:px-4">Player</td>
						<td className="px-1 xl:table-cell hidden xl:px-4">Ping</td>
						<td className="px-1 sm:px-4">Kills</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">Assists</td>
						<td className="px-1 sm:px-4">Deaths</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">MVPs</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">HS %</td>
						<td className="px-1 sm:px-4">Score</td>
					</tr>
					<tr>
						<td className="pl-8 text-yellow-400 font-bold text-xl">{`T - ${props.terroristRounds}`}</td>
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
		</>
	);
};

export default Scoreboard;
