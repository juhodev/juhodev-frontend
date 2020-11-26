import * as React from 'react';
import { fetchCsgoUser } from '../../../api/api';
import { SteamUser, SteamUserResponse } from '../../../api/types';
import { redirectFrom } from '../../../ts/utils';
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
		redirectFrom(window.location.origin, 'matches');
		return;
	}

	if (steamId === '') {
		return <h1>Loading</h1>;
	}

	return (
		<div className="flex flex-col m-2 lg:m-4 p-2 lg:p-4">
			<div className="flex-1 flex flex-col items-center">
				<div className="flex flex-row xl:w-2/3 w-full mb-4 mx-2 border-2 border-gray-800 xl:p-4 p-2">
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
		</div>
	);
};

export default CsgoMatchesView;
