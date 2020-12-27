import * as React from 'react';
import User from './User';
import { fetchUserData } from '../api/api';
import { ERROR, UserBasicData, UserRouteResponse } from '../api/types';
import SubmissionFeed from './SubmissionFeed';
import LinkDiscord from './LinkDiscord';
import { redirectFrom } from '../ts/utils';
import { LOGIN_PAGE } from '../ts/constants';

const { useState, useEffect } = React;

const Home = () => {
	const [loading, setLoading] = useState<boolean>(true);
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
		redirectFrom(LOGIN_PAGE, 'home');
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

			setLoading(false);
			return;
		}

		if (response.userData.snowflake !== undefined) {
			setDiscordAuthenticated(true);
		}
		setUserData(response.userData);
		setLoading(false);
	};

	if (!discordAuthenticated && !loading) {
		return (
			<div className="flex xl:flex-row flex-col xl:justify-center overflow-auto flex-1">
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
		<div className="flex xl:flex-row flex-col xl:justify-center overflow-auto flex-1">
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
