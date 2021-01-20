import * as React from 'react';
import { fetchCsgoMatch } from '../../../api/api';
import { CsgoMatch, CsgoPlayer, SteamMatchResponse } from '../../../api/types';
import MapBanner from './MapBanner';
import Scoreboard from './scoreboard/Scoreboard';
import UnnecessaryStats from './UnnecessaryStats';

const { useState, useEffect } = React;

const Match = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [csgoMatch, setCsgoMatch] = useState<CsgoMatch>(undefined);

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
		setLoading(false);
	};

	if (loading) {
		// TODO: Add a better loading page
		return <h1>Loading</h1>;
	}

	const terroristPlayers: CsgoPlayer[] = csgoMatch.players.filter(
		(player) => player.side === 'T',
	);

	const counterTerroristPlayers: CsgoPlayer[] = csgoMatch.players.filter(
		(player) => player.side === 'CT',
	);

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
			</div>
		</div>
	);
};

export default Match;
