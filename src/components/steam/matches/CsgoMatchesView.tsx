import * as React from 'react';
import { fetchCsgoUser } from '../../../api/api';
import { SteamUser, SteamUserResponse } from '../../../api/types';
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

	if (steamId === '') {
		return <h1>Loading</h1>;
	}

	return (
		<div className="flex flex-col m-2 lg:m-4 p-2 lg:p-4">
			<div className="flex-1 flex flex-col items-center">
				<div className="xl:w-2/3 w-full flex flex-col rounded-b-lg bg-gray-800 p-4 mb-8">
					<div className="flex flex-col lg:flex-row lg:items-end">
						<img className="w-12 h-12" src={user.avatar} />
						<div className="mx-4 flex flex-col">
							<a
								className="text-3xl text-gray-100 leading-none"
								href={user.steamLink}
							>
								{user.name}
							</a>
							<span className="text-gray-500">
								{user.steamId}
							</span>
						</div>
					</div>
				</div>
				<CsgoMatches steamId={steamId} />
			</div>
		</div>
	);
};

export default CsgoMatchesView;
