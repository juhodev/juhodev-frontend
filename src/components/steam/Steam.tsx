import * as React from 'react';
import { fetchUserData } from '../../api/api';
import { UserError, UserRouteResponse, UserBasicData } from '../../api/types';
import { LOGIN_PAGE } from '../../ts/constants';
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
	const [steamId, setSteamId] = useState<string>(undefined);
	const [page, setPage] = useState<string>('search');

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
	}, []);

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

	if (steamId === undefined || steamId.length === 0) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="2xl:w-2/3 xl:w-5/6 w-full">
					{searchOrLeaderboardWithControls()}
				</div>
			</div>
		);
	}

	if (steamId !== undefined || steamId.length !== 0) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="2xl:w-2/3 xl:w-5/6 w-full">
					<CsgoProfileView steamId={steamId} />
				</div>
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
