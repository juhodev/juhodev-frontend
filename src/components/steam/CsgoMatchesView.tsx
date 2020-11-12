import * as React from 'react';
import { fetchCsgoUser } from '../../api/api';
import { SteamUser, SteamUserResponse } from '../../api/types';
import CsgoMatches from './CsgoMatches';

const { useState, useEffect } = React;

const CsgoMatchesView = () => {
	const [steamId, setSteamId] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [user, setUser] = useState<SteamUser>({
		steamLink: '',
		name: '',
		avatar: 'https://i.redd.it/n8hw1yq02o011.jpg',
		steamId: '',
	});

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);
		const id: string = searchParams.get('id');
		if (id !== null) {
			setSteamId(id);
			fetchData(id);
		} else {
			setSteamId('');
		}

		const page = searchParams.get('page');
		if (page !== null) {
			setPage(parseInt(page));
		} else {
			setPage(0);
		}
	}, []);

	const fetchData = async (id: string) => {
		const response: SteamUserResponse = await fetchCsgoUser(id);
		setUser(response.user);
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
			`/matches?id=${steamId}&page=${newPage}`,
		);
	};

	const jwt = localStorage.getItem('jwt');
	if (jwt === null) {
		window.location.href = window.location.origin;
		return;
	}

	if (steamId === '') {
		return <h1>Loading</h1>;
	}

	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="flex flex-row w-1/2 mb-4">
				<div className="flex justify-center items-center overflow-hidden w-16 h-16 rounded-full bg-gray-800">
					<img className="w-16 h-16" src={user.avatar} />
				</div>
				<div className="flex flex-col ml-4">
					<a
						href={user.steamLink}
						className="text-gray-100 text-2xl leading-none"
					>
						{user.name}
					</a>
					<span className="text-gray-500 text-sm">
						{user.steamId}
					</span>
				</div>
			</div>
			<CsgoMatches steamId={steamId} page={page} />
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
		</div>
	);
};

export default CsgoMatchesView;