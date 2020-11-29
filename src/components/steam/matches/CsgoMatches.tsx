import * as React from 'react';
import { fetchCsgoMatchesForUser } from '../../../api/api';
import {
	DateMatches,
	GameWithStats,
	MapStatistics,
	SteamGamesResponse,
} from '../../../api/types';
import CsgoMapStatistics from './CsgoMapStatistics';
import CsgoMatchesControls from './CsgoMatchesControls';
import CsgoMatchPreview from './CsgoMatchPreview';

type Props = {
	steamId: string;
};

const { useState, useEffect, useMemo } = React;

const CsgoMatches = (props: Props) => {
	const [page, setPage] = useState<number>(0);
	const [games, setGames] = useState<GameWithStats[]>([]);
	const [mapStatistics, setMapStatistics] = useState<MapStatistics>({
		maps: [],
	});
	const [dateMatches, setDateMatches] = useState<DateMatches[]>([]);

	useEffect(() => {
		fetchData('initial');
	}, []);

	const fetchData = async (from: string) => {
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

		if (from === 'initial') {
			setMapStatistics(response.mapStatistics);
			setDateMatches(response.matchFrequency);
		}
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
		fetchData('page_change');
	};

	const gameComponents: JSX.Element[] = games.map((game) => {
		return <CsgoMatchPreview key={game.id} match={game} />;
	});

	const mapStatisticsComponent: JSX.Element = useMemo(
		() => (
			<CsgoMapStatistics
				statistics={mapStatistics}
				matches={dateMatches}
			/>
		),
		[mapStatistics, dateMatches],
	);

	return (
		<div className="flex flex-col xl:w-2/3 w-full">
			{gameComponents}
			<CsgoMatchesControls changePage={changePage} currentPage={page} />
			<span className="border-b border-w-2 border-gray-500 my-4"></span>
			{mapStatisticsComponent}
		</div>
	);
};

export default CsgoMatches;
