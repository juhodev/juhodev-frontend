import * as React from 'react';
import { fetchCsgoMatch } from '../../api/api';
import {
	UserData,
	CsgoMatch,
	SteamMatchResponse,
	UserError,
	CsgoPlayer,
} from '../../api/types';
import { formatSeconds } from '../../ts/timeUtils';
import LinkDiscord from '../LinkDiscord';
import User from '../User';

const { useState, useEffect } = React;

const CsgoMatchView = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [userData, setUserData] = useState<UserData>({
		avatar: 'http://placekitten/500/500',
		name: 'User',
		snowflake: '',
		tag: '0000',
	});
	const [csgoMatch, setCsgoMatch] = useState<CsgoMatch>({
		map: '',
		players: [],
		matchDuration: 0,
		waitTime: 0,
	});
	const [img, setImg] = useState<string>('');

	const jwt = localStorage.getItem('jwt');
	if (jwt === null) {
		window.location.href = window.location.origin;
		return;
	}

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

		if (response.error) {
			if (response.errorCode === UserError.DISCORD_NOT_AUTHENTICATED) {
				setDiscordAuthenticated(false);
			}

			if (response.errorCode === UserError.USER_NOT_ON_SERVER) {
				window.alert('You are not on the server');
			}

			setLoading(false);
			return;
		}

		setDiscordAuthenticated(true);
		setCsgoMatch(response.csgoMatch);
		setUserData(response.userData);

		await updateResource(response.csgoMatch.map);
		setLoading(false);
	};

	if (!discordAuthenticated && !loading) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="">
					<User
						avatar={userData.avatar}
						discordName={userData.name}
						discordTag={userData.tag}
						snowflake={userData.snowflake}
					/>
				</div>
				<LinkDiscord />
			</div>
		);
	}

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
			case 'dust':
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
					<img className="mr-2" src={avatar} />
					<a href={`${window.location.origin}/steam?id=${playerId}`}>
						{name}
					</a>
				</td>
				<td className="px-4">{ping}</td>
				<td className="px-4">{kills}</td>
				<td className="px-4">{assists}</td>
				<td className="px-4">{deaths}</td>
				<td className="px-4">{mvps}</td>
				<td className="px-4">{hsp}</td>
				<td className="px-4">{score}</td>
			</tr>
		);
	};

	const sortedPlayers: CsgoPlayer[] = csgoMatch.players
		.sort((a, b) => a.score - b.score)
		.reverse();

	const tableRows: JSX.Element[] = sortedPlayers.map((player, i) => {
		return createPlayerRow(player, i);
	});

	return (
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="">
				<User
					avatar={userData.avatar}
					discordName={userData.name}
					discordTag={userData.tag}
					snowflake={userData.snowflake}
				/>
			</div>
			<div className="flex flex-col m-4 w-1/2">
				<div className="border-solid border-2 border-gray-800 flex flex-row mb-8">
					<div className="w-60 overflow-hidden">
						<img src={img} />
					</div>
					<div className="ml-2 mt-1 flex flex-col">
						<span className="text-gray-100 text-4xl">
							{csgoMatch.map}
						</span>
						<span className="text-gray-500 text-lg">{`Match duration: ${formatSeconds(
							csgoMatch.matchDuration,
						)}`}</span>
					</div>
				</div>
				<div className="border-solid border-2 border-gray-800">
					<table className="w-full">
						<tbody>
							<tr className="text-gray-100 text-xl">
								<td className="px-4 pb-2">Player</td>
								<td className="px-4">Ping</td>
								<td className="px-4">Kills</td>
								<td className="px-4">Assists</td>
								<td className="px-4">Deaths</td>
								<td className="px-4">MVPs</td>
								<td className="px-4">HS %</td>
								<td className="px-4">Score</td>
							</tr>
							{tableRows}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CsgoMatchView;
