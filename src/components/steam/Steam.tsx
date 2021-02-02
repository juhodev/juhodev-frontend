import * as React from 'react';
import CsgoLeaderboard from './CsgoLeaderboard';
import LinkSteamAccount from './LinkSteamAccount';
import ProfilePreviews from './profiles/ProfilePreviews';
import SteamInput from './SteamInput';

const { useState, useEffect } = React;

const Steam = () => {
	const [page, setPage] = useState<string>('search');

	const renderSearchOrLeaderboard = () => {
		if (page === 'search') {
			return (
				<>
					<SteamInput />
					<ProfilePreviews />
				</>
			);
		} else if (page === 'leaderboard') {
			return <CsgoLeaderboard />;
		} else {
			return <LinkSteamAccount />;
		}
	};

	const selectedClassName: string = 'text-lg mx-2 text-gray-200 font-bold border-b-2 border-blue-600';
	const normalClassName: string = 'text-lg mx-2 text-gray-200';

	const paths: string[] = ['Search', 'Track'];
	const pathComponents: React.ReactNode = paths.map((path) => (
		<button
			className={page === path.toLowerCase() ? selectedClassName : normalClassName}
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

	return (
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="2xl:w-2/3 xl:w-5/6 w-full">{searchOrLeaderboardWithControls()}</div>
		</div>
	);
};

export default Steam;
