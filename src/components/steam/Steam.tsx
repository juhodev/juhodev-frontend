import * as React from 'react';
import { fetchUserData } from '../../api/api';
import { UserError, UserRouteResponse, UserBasicData } from '../../api/types';
import { jwtDecode } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import User from '../User';
import CsgoLeaderboard from './CsgoLeaderboard';
import CsgoProfileView from './CsgoProfile';
import SteamInput from './SteamInput';
import SteamUploadCode from './SteamUploadCode';

const { useState, useEffect } = React;

const Steam = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [steamId, setSteamId] = useState<string>(undefined);
	const [isPreview, setIsPreview] = useState<boolean>(true);
	const [page, setPage] = useState<string>('search');

	const jwt = localStorage.getItem('jwt');
	if (jwt === null) {
		window.location.href = window.location.origin;
		return;
	}

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);
		const id: string = searchParams.get('id');
		if (id !== null) {
			setSteamId(id);
		} else {
			setSteamId('');
		}

		fetchData();
	}, []);

	const fetchData = async () => {
		const jwt: string = localStorage.getItem('jwt');
		if (jwt === null) {
			window.alert('Please log in');
			return;
		}

		const decodedJWT: any = jwtDecode(jwt);
		if (decodedJWT['payload'].userType === 'PREVIEW_ONLY') {
			setLoading(false);
			return;
		}

		setIsPreview(false);

		const response: UserRouteResponse = await fetchUserData();

		if (response.error) {
			if (response.errorCode === UserError.DISCORD_NOT_AUTHENTICATED) {
				setDiscordAuthenticated(false);
			}

			if (response.errorCode === UserError.USER_NOT_ON_SERVER) {
				window.alert('You are not on the server');
			}

			setLoading(false);
			return;
		}

		setDiscordAuthenticated(true);
		setLoading(false);
	};

	const renderSearchOrLeaderboard = () => {
		if (page === 'search') {
			return <SteamInput onSubmit={(value) => setSteamId(value)} />;
		} else {
			return <CsgoLeaderboard />;
		}
	};

	const searchOrLeaderboardWithControls = () => (
		<div className="">
			<div className="flex flex-row justify-center">
				<button
					className={
						page === 'search' ? selectedClassName : normalClassName
					}
					onClick={() => setPage('search')}
				>
					Search
				</button>
				<button
					className={
						page !== 'search' ? selectedClassName : normalClassName
					}
					onClick={() => setPage('leaderboard')}
				>
					Leaderboard
				</button>
			</div>
			{renderSearchOrLeaderboard()}
		</div>
	);

	if (isPreview && (steamId === undefined || steamId.length === 0)) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="w-2/3">{searchOrLeaderboardWithControls}</div>
			</div>
		);
	}

	if (isPreview && (steamId !== undefined || steamId.length !== 0)) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="w-2/3">
					<CsgoProfileView steamId={steamId} />
				</div>
			</div>
		);
	}

	if ((!discordAuthenticated && !loading) || steamId === undefined) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<LinkDiscord />
			</div>
		);
	}

	const selectedClassName: string =
		'text-lg mx-2 text-gray-200 font-bold border-b-2 border-blue-600';
	const normalClassName: string = 'text-lg mx-2 text-gray-200';

	return (
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="w-2/3">
				{steamId.length === 0 && <SteamUploadCode />}
				{steamId.length === 0 ? (
					searchOrLeaderboardWithControls()
				) : (
					<CsgoProfileView steamId={steamId} />
				)}
			</div>
		</div>
	);
};

export default Steam;
