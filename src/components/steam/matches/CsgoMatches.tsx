import * as React from 'react';
import { fetchCsgoMatchesForUser } from '../../../api/api';
import { GameWithStats, MatchWithPlayerStats, SteamGamesResponse } from '../../../api/types';
import CsgoMatchesControls from './CsgoMatchesControls';
import CsgoMatchPreview from './CsgoMatchPreview';

type Props = {
	steamId: string;
};

const { useState, useEffect } = React;

const CsgoMatches = (props: Props) => {
	const [page, setPage] = useState<number>(0);
	const [matches, setMatches] = useState<MatchWithPlayerStats[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const searchParams: URLSearchParams = new URLSearchParams(window.location.search);

		const newPage = searchParams.get('page');
		if (page !== null) {
			setPage(parseInt(newPage));
		} else {
			setPage(0);
		}

		const response: SteamGamesResponse = await fetchCsgoMatchesForUser(props.steamId, parseInt(newPage));
		setMatches(response.matches);
	};

	const changePage = (by: number) => {
		const newPage: number = page + by;
		if (newPage < 0) {
			return;
		}

		setPage(newPage);
		window.history.pushState(undefined, 'Csgo match history', `/matches?id=${props.steamId}&page=${newPage}`);
		fetchData();
	};

	const gameComponents: JSX.Element[] = matches.map((match) => {
		return <CsgoMatchPreview key={match.id} match={match} />;
	});

	return (
		<div className="flex flex-col xl:w-2/3 w-full">
			{gameComponents}
			<CsgoMatchesControls changePage={changePage} currentPage={page} />
		</div>
	);
};

export default CsgoMatches;
