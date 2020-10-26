import * as React from 'react';
import User from './User';
import { fetchUserData } from '../api/api';
import { ERROR, UserBasicData, UserRouteResponse } from '../api/types';
import SubmissionFeed from './SubmissionFeed';
import { startAuthFlow } from '../ts/auth';
import LinkDiscord from './LinkDiscord';

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

			if (response.errorCode === ERROR.USER_NOT_ON_SERVER) {
				window.alert('You are not on the server');
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
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="">
					<User
						avatar={userData.avatar}
						discordName={userData.discord_name}
						discordTag={userData.discord_tag}
						snowflake={userData.snowflake}
					/>
				</div>
				<LinkDiscord />
			</div>
		);
	}

	return (
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="">
				<User
					avatar={userData.avatar}
					discordName={userData.discord_name}
					discordTag={userData.discord_tag}
					snowflake={userData.snowflake}
				/>
			</div>
			<SubmissionFeed
				title="Your submissions"
				submissions={userData.submissions}
			/>
		</div>
	);
};

export default Home;
