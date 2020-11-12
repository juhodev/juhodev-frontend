import * as React from 'react';
import { fetchCsgoMatchesForUser } from '../../api/api';
import { GameWithStats, SteamGamesResponse, SteamUser } from '../../api/types';
import CsgoMatchPreview from './CsgoMatchPreview';

type Props = {
	steamId: string;
	page: number;
};

const { useState, useEffect } = React;

const CsgoMatches = (props: Props) => {
	const [games, setGames] = useState<GameWithStats[]>([]);

	console.log(props.page);

	useEffect(() => {
		fetchData();
	}, [props.page]);

	const fetchData = async () => {
		const response: SteamGamesResponse = await fetchCsgoMatchesForUser(
			props.steamId,
			props.page,
		);

		setGames(response.games);
	};

	const gameComponents: JSX.Element[] = games.map((game) => {
		return <CsgoMatchPreview match={game} />;
	});

	return <div className="flex flex-col w-1/2">{gameComponents}</div>;
};

export default CsgoMatches;
