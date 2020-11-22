import * as React from 'react';
import { fetchProfile } from '../../api/api';
import {
	UserProfile,
	UserData,
	ProfileRouteResponse,
	UserError,
} from '../../api/types';
import { redirectFrom } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import User from '../User';
import CommandLog from './CommandLog';
import VoiceLog from './VoiceLog';

const { useState, useEffect } = React;

const Profile = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [userProfile, setUserProfile] = useState<UserProfile>({
		commandLog: [],
		voiceLog: [],
	});
	const [userData, setUserData] = useState<UserData>({
		avatar: 'http://placekitten/500/500',
		name: 'User',
		snowflake: '',
		tag: '0000',
	});

	const jwt = localStorage.getItem('jwt');
	if (jwt === null) {
		redirectFrom(window.location.origin, 'profile');
		return;
	}

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);
		const snowflake: string = searchParams.get('snowflake');

		fetchData(snowflake);
	}, []);

	const fetchData = async (snowflake: string) => {
		const response: ProfileRouteResponse = await fetchProfile(snowflake);

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
		setUserProfile(response.userProfile);
		setUserData(response.userData);
		setLoading(false);
	};

	if (!discordAuthenticated && !loading) {
		return (
			<div className="flex flex-row justify-center overflow-auto flex-1">
				<div className="">
					<User
						avatar={userData.avatar}
						discordName={userData.name}
						discordTag={userData.tag}
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
					discordName={userData.name}
					discordTag={userData.tag}
					snowflake={userData.snowflake}
				/>
			</div>
			<div className="flex flex-col border-solid border-2 border-gray-800 m-4 w-1/2">
				<VoiceLog userVoiceLogs={userProfile.voiceLog} />
				<CommandLog userCommandLog={userProfile.commandLog} />
			</div>
		</div>
	);
};

export default Profile;
