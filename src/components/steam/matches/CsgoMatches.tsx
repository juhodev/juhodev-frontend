import * as React from 'react';
import { fetchCsgoMatchesForUser, fetchUniqueMaps } from '../../../api/api';
import { MatchWithPlayerStats, SteamGamesResponse, SteamUniqueMapsResponse } from '../../../api/types';
import Sort from '../../utils/Sort';
import CsgoMatchesControls from './CsgoMatchesControls';
import CsgoMatchPreview from './CsgoMatchPreview';

type Props = {
	steamId: string;
};

const { useState, useEffect } = React;

const CsgoMatches = (props: Props) => {
	const [page, setPage] = useState<number>(0);
	const [matches, setMatches] = useState<MatchWithPlayerStats[]>([]);
	const [maps, setMaps] = useState<string[]>(['All']);
	const [selectedMap, setSelectedMap] = useState<string>('all');

	useEffect(() => {
		fetchData();
		fetchMaps();
	}, []);

	const fetchData = async (map?: string) => {
		const searchParams: URLSearchParams = new URLSearchParams(window.location.search);

		const newPage = searchParams.get('page');
		if (page !== null) {
			setPage(parseInt(newPage));
		} else {
			setPage(0);
		}

		const response: SteamGamesResponse = await fetchCsgoMatchesForUser(
			props.steamId,
			parseInt(newPage),
			map || selectedMap,
		);
		setMatches(response.matches);
	};

	const changePage = (by: number, map?: string) => {
		const newPage: number = page + by;
		if (newPage < 0) {
			return;
		}

		setPage(newPage);
		window.history.pushState(undefined, 'Csgo match history', `/matches?id=${props.steamId}&page=${newPage}`);
		fetchData(map);
	};

	const fetchMaps = async () => {
		const response: SteamUniqueMapsResponse = await fetchUniqueMaps(props.steamId);
		setMaps(['All', ...response.data]);
	};

	const changeMap = (map: string) => {
		const changePageBy: number = page * -1;

		// This is special behavior for the `all` filter. Should have thought about this
		// but now I'll do it this way and I'm not changing it 😡
		if (map === 'All') {
			setSelectedMap('all');
			changePage(changePageBy, 'all');
			return;
		}

		setSelectedMap(map);
		changePage(changePageBy, map);
	};

	const gameComponents: JSX.Element[] = matches.map((match) => {
		return <CsgoMatchPreview key={match.id} match={match} />;
	});

	return (
		<div className="flex flex-col xl:w-2/3 w-full">
			<div className="flex">
				<div className="flex-1"></div>
				<Sort
					sortTypes={maps.map((map) => {
						return {
							displayName: map,
							sortType: map,
						};
					})}
					onChange={(map) => {
						changeMap(map.sortType);
					}}
				/>
			</div>
			{gameComponents}
			<CsgoMatchesControls changePage={changePage} currentPage={page} />
		</div>
	);
};

export default CsgoMatches;
