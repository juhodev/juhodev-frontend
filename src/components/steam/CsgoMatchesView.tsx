import * as React from 'react';
import { fetchCsgoUser } from '../../api/api';
import { SteamUser, SteamUserResponse } from '../../api/types';
import CsgoMatches from './CsgoMatches';

const { useState, useEffect } = React;

const CsgoMatchesView = () => {
	const [steamId, setSteamId] = useState<string>('');
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
	}, []);

	const fetchData = async (id: string) => {
		const response: SteamUserResponse = await fetchCsgoUser(id);
		setUser(response.user);
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
			<CsgoMatches steamId={steamId} />
		</div>
	);
};

export default CsgoMatchesView;
