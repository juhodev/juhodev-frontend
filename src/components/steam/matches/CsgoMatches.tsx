import * as React from 'react';
import { fetchCsgoMatchesForUser } from '../../../api/api';
import { GameWithStats, SteamGamesResponse } from '../../../api/types';
import CsgoMapStatistics from './CsgoMapStatistics';
import CsgoMatchesControls from './CsgoMatchesControls';
import CsgoMatchPreview from './CsgoMatchPreview';

type Props = {
	steamId: string;
};

const { useState, useEffect } = React;

const CsgoMatches = (props: Props) => {
	const [page, setPage] = useState<number>(0);
	const [games, setGames] = useState<GameWithStats[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);

		const newPage = searchParams.get('page');
		if (page !== null) {
			setPage(parseInt(newPage));
		} else {
			setPage(0);
		}

		const response: SteamGamesResponse = await fetchCsgoMatchesForUser(
			props.steamId,
			parseInt(newPage),
		);

		setGames(response.games);
	};

	const changePage = (by: number) => {
		const newPage: number = page + by;
		if (newPage < 0) {
			return;
		}

		setPage(newPage);
		window.history.pushState(
			undefined,
			'Csgo match history',
			`/matches?id=${props.steamId}&page=${newPage}`,
		);
		fetchData();
	};

	const gameComponents: JSX.Element[] = games.map((game) => {
		return <CsgoMatchPreview key={game.id} match={game} />;
	});

	return (
		<div className="flex flex-col xl:w-2/3 w-full">
			{gameComponents}
			<CsgoMatchesControls changePage={changePage} currentPage={page} />
		</div>
	);
};

export default CsgoMatches;
