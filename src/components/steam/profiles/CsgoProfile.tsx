import * as React from 'react';
import { fetchCsgoProfile } from '../../../api/api';
import {
	CsgoMapStats,
	CsgoProfile,
	SteamRouteResponse,
} from '../../../api/types';
import CsgoStats from '../CsgoStats';
import { formatSeconds } from '../../../ts/timeUtils';
import MapStats from '../MapStats';
import CsgoMatchPreview from '../matches/CsgoMatchPreview';

const { useState, useEffect } = React;

type Props = {
	steamId: string;
};

const CsgoProfileView = (props: Props) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [csgoProfile, setCsgoProfile] = useState<CsgoProfile>(undefined);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response: SteamRouteResponse = await fetchCsgoProfile(
			props.steamId,
		);
		setCsgoProfile(response.csgoProfile);
		setLoading(false);
	};

	if (loading) {
		return <h1>Loading</h1>;
	}

	const mapStats: CsgoMapStats[] = [...csgoProfile.mapStats];
	const favoriteMap: CsgoMapStats = mapStats
		.sort((a, b) => a.timesPlayed - b.timesPlayed)
		.reverse()
		.shift();

	const tenGames: JSX.Element[] = csgoProfile.tenBestGames.map((game) => {
		return <CsgoMatchPreview key={game.id} match={game} />;
	});

	let tenKills: number = 0;
	let tenAssists: number = 0;
	let tenDeaths: number = 0;
	let tenScore: number = 0;

	for (const game of csgoProfile.tenBestGames) {
		tenKills += game.player.kills;
		tenAssists += game.player.assists;
		tenDeaths += game.player.deaths;
		tenScore += game.player.score;
	}

	return (
		<div className="flex flex-col border-solid border-2 border-gray-800 m-4 p-4">
			<div className="flex flex-row items-end">
				<div className="flex-1 flex items-center">
					<img className="w-12 h-12" src={csgoProfile.avatarLink} />
					<div className="mx-4 flex flex-col">
						<a
							className="text-3xl text-gray-100 leading-none"
							href={csgoProfile.steamLink}
						>
							{csgoProfile.name}
						</a>
						<span className="text-gray-500">{csgoProfile.id}</span>
					</div>
				</div>
				<div className="flex flex-col">
					<span className="font-bold text-gray-500 text-2xl leading-none">{`${csgoProfile.matchesPlayed} games saved`}</span>
					<a
						className="text-sm text-gray-100 text-right"
						href={`${window.location.origin}/matches?id=${csgoProfile.id}&page=0`}
					>
						View full history
					</a>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-col flex-1">
					<div className="flex flex-col mt-4">
						<span className="font-bold text-2xl text-blue-500">
							KDA
						</span>
						<div className="flex flex-row">
							<CsgoStats
								name="Kills"
								average={Math.round(
									csgoProfile.gameAverages.kills.value,
								).toString()}
								highest={csgoProfile.gameHighest.kills.value.toString()}
								matchId={csgoProfile.gameHighest.kills.matchId}
								standardDeviation={
									csgoProfile.gameAverages.kills
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.kills.standardError
								}
							/>
							<CsgoStats
								name="Deaths"
								average={Math.round(
									csgoProfile.gameAverages.deaths.value,
								).toString()}
								highest={csgoProfile.gameHighest.deaths.value.toString()}
								matchId={csgoProfile.gameHighest.deaths.matchId}
								standardDeviation={
									csgoProfile.gameAverages.deaths
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.deaths
										.standardError
								}
							/>
							<CsgoStats
								name="Assists"
								average={Math.round(
									csgoProfile.gameAverages.assists.value,
								).toString()}
								highest={csgoProfile.gameHighest.assists.value.toString()}
								matchId={
									csgoProfile.gameHighest.assists.matchId
								}
								standardDeviation={
									csgoProfile.gameAverages.assists
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.assists
										.standardError
								}
							/>
						</div>
					</div>
					<div className="flex flex-col mt-4">
						<span className="font-bold text-2xl text-blue-500">
							Misc
						</span>
						<div className="flex flex-row">
							<CsgoStats
								name="HS %"
								average={Math.round(
									csgoProfile.gameAverages.hsp.value,
								).toString()}
								highest={csgoProfile.gameHighest.hsp.value.toString()}
								matchId={csgoProfile.gameHighest.hsp.matchId}
								standardDeviation={
									csgoProfile.gameAverages.hsp
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.hsp.standardError
								}
							/>
							<CsgoStats
								name="MVPs"
								average={Math.round(
									csgoProfile.gameAverages.mvps.value,
								).toString()}
								highest={csgoProfile.gameHighest.mvps.value.toString()}
								matchId={csgoProfile.gameHighest.mvps.matchId}
								standardDeviation={
									csgoProfile.gameAverages.mvps
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.mvps.standardError
								}
							/>
							<CsgoStats
								name="Score"
								average={Math.round(
									csgoProfile.gameAverages.score.value,
								).toString()}
								highest={csgoProfile.gameHighest.score.value.toString()}
								matchId={csgoProfile.gameHighest.score.matchId}
								standardDeviation={
									csgoProfile.gameAverages.score
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.score.standardError
								}
							/>
							<CsgoStats
								name="Ping"
								average={Math.round(
									csgoProfile.gameAverages.ping.value,
								).toString()}
								highest={csgoProfile.gameHighest.ping.value.toString()}
								matchId={csgoProfile.gameHighest.ping.matchId}
								standardDeviation={
									csgoProfile.gameAverages.ping
										.standardDeviation
								}
								standardError={
									csgoProfile.gameAverages.ping.standardError
								}
							/>
						</div>
					</div>
					<div className="flex flex-col mt-4">
						<span className="font-bold text-2xl text-blue-500">
							Matchmaking
						</span>
						<div className="flex flex-row">
							<CsgoStats
								name="Wait time"
								average={formatSeconds(
									csgoProfile.gameAverages.waitTime.value,
								)}
								highest={formatSeconds(
									csgoProfile.gameHighest.waitTime.value,
								)}
								matchId={
									csgoProfile.gameHighest.waitTime.matchId
								}
							/>
							<CsgoStats
								name="Match length"
								average={formatSeconds(
									csgoProfile.gameAverages.matchDuration
										.value,
								)}
								highest={formatSeconds(
									csgoProfile.gameHighest.matchDuration.value,
								)}
								matchId={
									csgoProfile.gameHighest.matchDuration
										.matchId
								}
							/>
							<CsgoStats
								name="Won"
								average={csgoProfile.won.toString()}
							/>
							<CsgoStats
								name="Lost"
								average={csgoProfile.lost.toString()}
							/>
							<CsgoStats
								name="Tied"
								average={csgoProfile.tied.toString()}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-end">
					<span className="font-bold text-2xl text-blue-500">
						Favorite map
					</span>
					<MapStats
						map={favoriteMap.name}
						matchDuration={favoriteMap.averageMatchDuration}
						waitTime={favoriteMap.averageWaitTime}
						timesPlayed={favoriteMap.timesPlayed}
					/>
				</div>
			</div>
			<div className="flex flex-col mt-4">
				<span className="text-blue-500 text-2xl font-bold">
					Ten best games in a row
				</span>
				<div className="flex flex-row">
					<CsgoStats
						name="Total kills"
						average={tenKills.toString()}
					/>
					<CsgoStats
						name="Total assists"
						average={tenAssists.toString()}
					/>
					<CsgoStats
						name="Total deaths"
						average={tenDeaths.toString()}
					/>
					<CsgoStats
						name="Total score"
						average={tenScore.toString()}
					/>
				</div>
				{tenGames}
			</div>
		</div>
	);
};

export default CsgoProfileView;
