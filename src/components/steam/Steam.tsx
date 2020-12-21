import * as React from 'react';
import { fetchUserData } from '../../api/api';
import { UserError, UserRouteResponse, UserBasicData } from '../../api/types';
import { jwtDecode, redirectFrom } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import CsgoLeaderboard from './CsgoLeaderboard';
import LinkSteamAccount from './LinkSteamAccount';
import CsgoProfileView from './profiles/CsgoProfileView';
import ProfilePreviews from './profiles/ProfilePreviews';
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

	useEffect(() => {
		const jwt = localStorage.getItem('jwt');

		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);
		const id: string = searchParams.get('id');
		if (id !== null) {
			if (jwt === null) {
				redirectFrom(window.location.origin, `steam?id=${id}`);
				return;
			}
			setSteamId(id);
		} else {
			if (jwt === null) {
				redirectFrom(window.location.origin, 'steam');
				return;
			}
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
			return (
				<>
					<SteamInput onSubmit={(value) => setSteamId(value)} />
					<ProfilePreviews />
				</>
			);
		} else if (page === 'leaderboard') {
			return <CsgoLeaderboard />;
		} else {
			return <LinkSteamAccount />;
		}
	};

	const selectedClassName: string =
		'text-lg mx-2 text-gray-200 font-bold border-b-2 border-blue-600';
	const normalClassName: string = 'text-lg mx-2 text-gray-200';

	const paths: string[] = ['Search', 'Leaderboard', 'Track'];
	const pathComponents: React.ReactNode = paths.map((path) => (
		<button
			className={
				page === path.toLowerCase()
					? selectedClassName
					: normalClassName
			}
			onClick={() => setPage(path.toLowerCase())}
		>
			{path}
		</button>
	));

	const searchOrLeaderboardWithControls = () => (
		<div className="">
			<div className="flex flex-row justify-center">{pathComponents}</div>
			{renderSearchOrLeaderboard()}
		</div>
	);

	if (isPreview && (steamId === undefined || steamId.length === 0)) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="2xl:w-2/3 xl:w-5/6 w-full">
					{searchOrLeaderboardWithControls()}
				</div>
			</div>
		);
	}

	if (isPreview && (steamId !== undefined || steamId.length !== 0)) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="2xl:w-2/3 xl:w-5/6 w-full">
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

	return (
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="2xl:w-2/3 xl:w-5/6 w-full">
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
