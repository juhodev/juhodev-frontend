import * as React from 'react';
import { fetchHoi4Game } from '../../api/api';
import { Country, Hoi4Save } from '../../api/types';
import { hoi4search, Hoi4SortType } from '../../ts/search';
import Hoi4BasicCountryInfo from './country/Hoi4BasicCountryInfo';
import Hoi4GameInfo from './Hoi4GameInfo';

const { useState, useEffect } = React;

const Hoi4Game = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [game, setGame] = useState<Hoi4Save>(undefined);

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

	const countries: Country[] = hoi4search(
		game.countries,
		'',
		Hoi4SortType.NAME,
	);

	const countryCards: React.ReactNode[] = countries.map((country, i) => (
		<Hoi4BasicCountryInfo key={i} country={country} />
	));

	return (
		<div className="flex flex-col">
			<Hoi4GameInfo game={game} />
			<div className="grid grid-cols-5">{countryCards}</div>
		</div>
	);
};

export default Hoi4Game;
