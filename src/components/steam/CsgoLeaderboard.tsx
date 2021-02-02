import * as React from 'react';
import { fetchCsgoLeaderboard } from '../../api/api';
import { CsgoPlayer, SteamLeaderboardResponse } from '../../api/types';

const { useState, useEffect } = React;

const CsgoLeaderboard = () => {
	const [players, setPlayers] = useState<CsgoPlayer[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response: SteamLeaderboardResponse = await fetchCsgoLeaderboard();
		setPlayers(response.leaderboard);
	};

	const createPlayerRow = (player: CsgoPlayer, i: number): JSX.Element => {
		const {
			name,
			playerId,
			avatar,
			ping,
			kills,
			assists,
			deaths,
			mvps,
			hsp,
			score,
		} = player;

		let trClassName: string;
		if (i % 2 === 0) {
			trClassName = 'text-gray-100 bg-gray-800';
		} else {
			trClassName = 'text-gray-100 bg-transparent';
		}

		return (
			<tr className={trClassName}>
				<td className="px-1 sm:px-4 flex flex-row items-center my-1">
					<img
						className="w-10 h-10 overflow-hidden rounded mr-2"
						src={avatar}
					/>
					<a href={`cs?id=${playerId}`}>
						{name}
					</a>
				</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{ping}</td>
				<td className="px-1 sm:px-4">{kills}</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{assists}</td>
				<td className="px-1 sm:px-4">{deaths}</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{mvps}</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{hsp}</td>
				<td className="px-1 sm:px-4">{score}</td>
			</tr>
		);
	};

	const playerComponents: React.ReactNode = players.map((player, i) => {
		return createPlayerRow(player, i);
	});

	return (
		<div className="">
			<table className="w-full">
				<tbody>
					<tr className="text-gray-500 text-xl">
						<td className="px-1 sm:px-4">Player</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">
							Ping
						</td>
						<td className="px-1 sm:px-4">Kills</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">
							Assists
						</td>
						<td className="px-1 sm:px-4">Deaths</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">
							MVPs
						</td>
						<td className="px-1 sm:table-cell hidden sm:px-4">
							HS %
						</td>
						<td className="px-1 sm:px-4">Score</td>
					</tr>
					{playerComponents}
				</tbody>
			</table>
		</div>
	);
};

export default CsgoLeaderboard;
