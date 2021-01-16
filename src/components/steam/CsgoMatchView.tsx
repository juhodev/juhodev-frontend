import * as React from 'react';
import { fetchCsgoMatch } from '../../api/api';
import {
	UserData,
	CsgoMatch,
	SteamMatchResponse,
	UserError,
	CsgoPlayer,
} from '../../api/types';
import { LOGIN_PAGE } from '../../ts/constants';
import { dateFormat, formatSeconds } from '../../ts/timeUtils';
import { redirectFrom } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import StatHighlight from './profiles/StatHighlight';

const { useState, useEffect } = React;

const CsgoMatchView = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [csgoMatch, setCsgoMatch] = useState<CsgoMatch>({
		date: 0,
		map: '',
		players: [],
		matchDuration: 0,
		waitTime: 0,
		ctRounds: 0,
		tRounds: 0,
		winner: '',
	});
	const [img, setImg] = useState<string>('');

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);

		if (!searchParams.has('id')) {
			return;
		}

		const id: number = parseInt(searchParams.get('id'));
		fetchData(id);
	}, []);

	const fetchData = async (matchId: number) => {
		const response: SteamMatchResponse = await fetchCsgoMatch(matchId);

		setCsgoMatch(response.csgoMatch);
		updateResource(response.csgoMatch.map);
		setLoading(false);
	};

	const lazyLoadImage = async (map: string) => {
		let file: string;

		switch (map) {
			case 'train':
			case 'vertigo':
			case 'overpass':
			case 'breach':
			case 'cache':
				file = `${map}.png`;
				break;

			case 'nuke':
			case 'inferno':
			case 'dust ii':
			case 'cobblestone':
			case 'canals':
			case 'mirage':
				file = `${map}.jpg`;
				break;

			default:
				file = `not_found.jpg`;
				break;
		}

		const asset = await import(
			/* webpackMode: "lazy-once" */
			`../../../assets/${file}`
		);
		return asset.default;
	};

	const updateResource = async (csgoMap: string) => {
		const resource = await lazyLoadImage(csgoMap.toLowerCase());
		setImg(resource);
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
				<td className="px-4 flex flex-row items-center my-1">
					<img
						className="w-8 h-8 overflow-hidden rounded mr-2"
						src={avatar}
					/>
					<a href={`${window.location.origin}/steam?id=${playerId}`}>
						{name}
					</a>
				</td>
				<td className="px-1 xl:table-cell hidden xl:px-4">{ping}</td>
				<td className="px-1 sm:px-4">{kills}</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{assists}</td>
				<td className="px-1 sm:px-4">{deaths}</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{mvps}</td>
				<td className="px-1 sm:table-cell hidden sm:px-4">{hsp}</td>
				<td className="px-1 sm:px-4">{score}</td>
			</tr>
		);
	};

	const tPlayers: CsgoPlayer[] = csgoMatch.players
		.filter((p) => p.side === 'T')
		.sort((a, b) => a.score - b.score)
		.reverse();
	const ctPlayers: CsgoPlayer[] = csgoMatch.players
		.filter((p) => p.side === 'CT')
		.sort((a, b) => a.score - b.score)
		.reverse();

	const tRows: JSX.Element[] = tPlayers.map((player, i) => {
		return createPlayerRow(player, i);
	});

	const ctRows: JSX.Element[] = ctPlayers.map((player, i) => {
		return createPlayerRow(player, i);
	});

	const renderScoreboard = () => {
		return (
			<div className="flex flex-col mx-2">
				<div className="flex flex-col rounded-b-lg bg-gray-800 p-4 mb-8">
					<div className="flex items-center">
						<div className="w-32 h-16 overflow-hidden rounded items-center justify-center">
							<img className="w-full" src={img} />
						</div>
						<div className="mx-4 flex flex-col">
							<span className="text-3xl text-gray-100 leading-none">
								{csgoMatch.map}
							</span>
							<span className="text-gray-500">
								{dateFormat(new Date(csgoMatch.date))}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<table className="w-full">
						<tbody>
							<tr className="text-gray-500 text-xl">
								<td className="px-1 sm:px-4">Player</td>
								<td className="px-1 xl:table-cell hidden xl:px-4">
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
							<tr>
								<td className="pl-8 text-yellow-400 font-bold text-xl">
									{`T - ${csgoMatch.tRounds}`}
								</td>
							</tr>
							{tRows}
							<tr>
								<td className="pl-8 text-blue-500 font-bold text-xl">
									{`CT - ${csgoMatch.ctRounds}`}
								</td>
							</tr>
							{ctRows}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	const renderHighlights = () => {
		if (loading) {
			return undefined;
		}

		// Not the most efficient way but fastest to write
		// TODO: refactor this later
		const sortedByKills: CsgoPlayer = csgoMatch.players.sort(
			(a, b) => a.kills - b.kills,
		)[csgoMatch.players.length - 1];

		const sortedByDeaths: CsgoPlayer = csgoMatch.players.sort(
			(a, b) => a.deaths - b.deaths,
		)[csgoMatch.players.length - 1];

		const mostAssists: CsgoPlayer = csgoMatch.players.sort(
			(a, b) => a.assists - b.assists,
		)[csgoMatch.players.length - 1];

		const mostMVPs: CsgoPlayer = csgoMatch.players.sort(
			(a, b) => a.mvps - b.mvps,
		)[csgoMatch.players.length - 1];

		const mostScore: CsgoPlayer = csgoMatch.players.sort(
			(a, b) => a.score - b.score,
		)[csgoMatch.players.length - 1];

		return (
			<div className="grid grid-cols-5 gap-2">
				<StatHighlight
					profile={sortedByKills}
					text="Most kills"
					count={sortedByKills.kills}
				/>
				<StatHighlight
					profile={sortedByDeaths}
					text="Most deaths"
					count={sortedByDeaths.deaths}
				/>
				<StatHighlight
					profile={mostAssists}
					text="Most assists"
					count={mostAssists.assists}
				/>
				<StatHighlight
					profile={mostMVPs}
					text="Most MVPs"
					count={mostMVPs.mvps}
				/>
				<StatHighlight
					profile={mostScore}
					text="Most score"
					count={mostScore.score}
				/>
			</div>
		);
	};

	return (
		<div className="flex flex-col items-center">
			<div className="w-full lg:w-2/3">
				{renderScoreboard()}
				{renderHighlights()}
			</div>
		</div>
	);
};

export default CsgoMatchView;
