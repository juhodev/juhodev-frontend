import * as React from 'react';
import { fetchCsgoMatchesForUser } from '../../api/api';
import {
	GameWithStats,
	MapStatistics,
	SteamGamesResponse,
} from '../../api/types';
import CsgoMapStatistics from './CsgoMapStatistics';
import CsgoMatchPreview from './CsgoMatchPreview';

type Props = {
	steamId: string;
};

const { useState, useEffect } = React;

const CsgoMatches = (props: Props) => {
	const [page, setPage] = useState<number>(0);
	const [games, setGames] = useState<GameWithStats[]>([]);
	const [mapStatistics, setMapStatistics] = useState<MapStatistics>({
		maps: [],
	});

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

		setGames([...response.games]);
		setMapStatistics(response.mapStatistics);
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
		<div className="flex flex-col w-1/2">
			{gameComponents}
			<div className="flex flex-row justify-center items-center">
				<button
					className="text-4xl text-gray-100 cursor-pointer"
					onClick={() => changePage(-1)}
				>
					{'<'}
				</button>
				<span className="text-xl text-gray-100 mx-6">{`Page ${page}`}</span>
				<button
					className="text-4xl text-gray-100 cursor-pointer"
					onClick={() => changePage(1)}
				>
					{'>'}
				</button>
			</div>
			<span className="border-b border-w-2 border-gray-500 my-4"></span>
			<CsgoMapStatistics statistics={mapStatistics} />
		</div>
	);
};

export default CsgoMatches;
