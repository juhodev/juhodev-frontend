import * as React from 'react';
import { fetchUserData } from '../../api/api';
import { UserError, UserRouteResponse, UserBasicData } from '../../api/types';
import LinkDiscord from '../LinkDiscord';
import User from '../User';
import CsgoProfileView from './CsgoProfile';
import SteamInput from './SteamInput';
import SteamUploadCode from './SteamUploadCode';

const { useState, useEffect } = React;

const Steam = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [userData, setUserData] = useState<UserBasicData>({
		avatar: '79f69cac11fa3d31848ef11fc2b77c83',
		discord_name: '',
		discord_tag: '',
		submissions: [],
		snowflake: '138256190227480576',
	});
	const [steamId, setSteamId] = useState<string>(undefined);

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
		setUserData(response.userData);
		setLoading(false);
	};

	if ((!discordAuthenticated && !loading) || steamId === undefined) {
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
			<div className="w-1/2">
				{steamId.length === 0 && <SteamUploadCode />}
				{steamId.length === 0 ? (
					<SteamInput
						onSubmit={(value) => {
							setSteamId(value);
						}}
					/>
				) : (
					<CsgoProfileView steamId={steamId} />
				)}
			</div>
		</div>
	);
};

export default Steam;
