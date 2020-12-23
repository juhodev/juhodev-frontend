import * as React from 'react';
import { fetchHoi4Game } from '../../api/api';
import { Country, Hoi4Save } from '../../api/types';
import { hoi4search, Hoi4SortType } from '../../ts/search';
import Hoi4BasicCountryInfo from './country/Hoi4BasicCountryInfo';
import Hoi4GameInfo from './Hoi4GameInfo';
import Hoi4Search from './Hoi4Search';

const { useState, useEffect } = React;

const Hoi4Game = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [game, setGame] = useState<Hoi4Save>(undefined);
	const [search, setSearch] = useState<string>('');
	const [sortType, setSortType] = useState<Hoi4SortType>(
		Hoi4SortType.NAME,
	);

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);

		const gameId: string = searchParams.get('id');
		if (gameId === undefined) {
			window.location.href = `${window.location.origin}/hoi4`;
			return;
		}

		fetchData(gameId);
	}, []);

	const fetchData = async (gameId: string) => {
		const response = await fetchHoi4Game(gameId);

		if (response.error) {
			window.alert(response.message);
			return;
		}

		setGame(response.game);
		setLoading(false);
	};

	if (loading) {
		return <span>Loading...</span>;
	}

	const countries: Country[] = hoi4search(game.countries, search, sortType);

	const countryCards: React.ReactNode[] = countries.map((country, i) => (
		<Hoi4BasicCountryInfo key={i} country={country} />
	));

	return (
		<div className="flex flex-col">
			<Hoi4GameInfo game={game} />
			<Hoi4Search
				onSearchChange={(search) => setSearch(search)}
				onSortChange={(sortType) => setSortType(sortType)}
			/>
			<div className="grid grid-cols-5">{countryCards}</div>
		</div>
	);
};

export default Hoi4Game;
