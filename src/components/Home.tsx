import * as React from 'react';
import User from './User';
import { fetchUserData } from '../api/api';
import { ERROR, UserBasicData, UserRouteResponse } from '../api/types';
import SubmissionFeed from './SubmissionFeed';
import { startAuthFlow } from '../ts/auth';

const { useState, useEffect } = React;

const Home = () => {
	const [discordAuthenticated, setDiscordAuthenticated] = useState(false);
	const [userData, setUserData] = useState<UserBasicData>({
		avatar: undefined,
		discord_name: 'User',
		discord_tag: '0000',
		snowflake: '',
		submissions: [],
	});

	const jwt = localStorage.getItem('jwt');
	if (jwt === null) {
		window.location.href = window.location.origin;
		return;
	}

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response: UserRouteResponse = await fetchUserData();

		if (response.error) {
			if (response.errorCode === ERROR.DISCORD_NOT_AUTHENTICATED) {
				setDiscordAuthenticated(false);
			}

			return;
		}

		if (response.userData.snowflake !== undefined) {
			setDiscordAuthenticated(true);
		}
		setUserData(response.userData);
	};

	if (!discordAuthenticated) {
		return (
			<div className="flex flex-row justify-center h-full">
				<div className="">
					<User
						avatar={userData.avatar}
						discordName={userData.discord_name}
						discordTag={userData.discord_tag}
						snowflake={userData.snowflake}
					/>
				</div>
				<div className="flex flex-col border-solid border-2 border-gray-800 w-1/3 p-4 m-4 h-3/4">
					<button
						className="bg-discord px-8 py-2 rounded text-gray-200"
						onClick={() => {
							startAuthFlow();
						}}
					>
						Link your Discord account
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-row justify-center h-full">
			<div className="">
				<User
					avatar={userData.avatar}
					discordName={userData.discord_name}
					discordTag={userData.discord_tag}
					snowflake={userData.snowflake}
				/>
			</div>
			<SubmissionFeed submissions={userData.submissions} />
		</div>
	);
};

export default Home;
