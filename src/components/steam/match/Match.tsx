import * as React from 'react';
import { fetchCsgoMatch } from '../../../api/api';
import { CsgoMatch, PlayerStatistics, SteamMatchResponse } from '../../../api/types';
import { isNil } from '../../../ts/utils';
import HeatmapContainer from './heatmap/HeatmapContainer';
import MapBanner from './MapBanner';
import Scoreboard from './scoreboard/Scoreboard';
import UnnecessaryStats from './UnnecessaryStats';

const { useState, useEffect } = React;

const Match = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [csgoMatch, setCsgoMatch] = useState<CsgoMatch>(undefined);

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(window.location.search);

		if (!searchParams.has('id')) {
			console.error('Search params does not have `id`');
			return;
		}

		const id: number = parseInt(searchParams.get('id'));
		fetchData(id);
	}, []);

	const fetchData = async (matchId: number) => {
		const response: SteamMatchResponse = await fetchCsgoMatch(matchId);

		if (isNil(response.csgoMatch)) {
			setCsgoMatch(null);
			setLoading(false);
			return;
		}

		// console.log('got response', response);
		setCsgoMatch(response.csgoMatch);
		setLoading(false);
	};

	if (loading) {
		// TODO: Add a better loading page
		return <h1>Loading</h1>;
	}

	if (csgoMatch === null) {
		return (
			<div className="flex justify-center">
				<div className="w-full lg:w-2/3">
					<span className="text-gray-200 text-xl">Game not found!</span>
				</div>
			</div>
		);
	}

	const terroristPlayers: PlayerStatistics[] = csgoMatch.players.filter((player) => player.side === 'T');
	const counterTerroristPlayers: PlayerStatistics[] = csgoMatch.players.filter((player) => player.side === 'CT');

	return (
		<div className="flex justify-center">
			<div className="w-full lg:w-2/3">
				<MapBanner map={csgoMatch.map} date={csgoMatch.date} />
				<Scoreboard
					terroristRounds={csgoMatch.tRounds}
					counterTerroristRounds={csgoMatch.ctRounds}
					terroristTeam={terroristPlayers}
					counterTerroristTeam={counterTerroristPlayers}
				/>
				<UnnecessaryStats match={csgoMatch} />
				{!isNil(terroristPlayers[0].unnecessaryStats?.firingHeatmap) && <HeatmapContainer match={csgoMatch} />}
			</div>
		</div>
	);
};

export default Match;
