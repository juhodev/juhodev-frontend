import * as React from 'react';
import { GameInfo } from '../../api/types';
import { fetchHoi4Games } from '../../api/api';

const { useEffect, useState } = React;

const Hoi4Games = () => {
	const [games, setGames] = useState<GameInfo[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetchHoi4Games();

		if (response.error) {
			window.alert('not work');
			return;
		}

		setGames(response.games);
	};

	const gameComponents: React.ReactNode[] = games.map((game) => (
		<a
			className="flex flex-col bg-gray-800 rounded px-4 py-2"
			href={`/game?id=${game.id}`}
		>
			<span className="text-xl text-gray-200 leading-none">
				{game.name}
			</span>
			<span className="text-sm text-gray-500 leading-none">
				#{game.id}
			</span>
		</a>
	));

	return <div className="grid grid-cols-4 gap-3 m-2">{gameComponents}</div>;
};

export default Hoi4Games;
