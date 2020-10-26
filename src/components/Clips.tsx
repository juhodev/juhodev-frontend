import * as React from 'react';
import { fetchClips } from '../api/api';
import {
	ClipSubmission,
	UserData,
	ClipsRouteResponse,
	ClipsError,
} from '../api/types';
import { startAuthFlow } from '../ts/auth';
import SubmissionFeed from './SubmissionFeed';
import User from './User';

const { useState, useEffect } = React;

const Clips = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [submissions, setSubmissions] = useState<ClipSubmission[]>([]);
	const [userData, setUserData] = useState<UserData>({
		avatar: 'http://placekitten/500/500',
		name: 'User',
		snowflake: '',
		tag: '0000',
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
		const response: ClipsRouteResponse = await fetchClips();

		if (response.error) {
			if (response.errorCode === ClipsError.DISCORD_NOT_AUTHENTICATED) {
				setDiscordAuthenticated(false);
			}

			if (response.errorCode === ClipsError.USER_NOT_ON_SERVER) {
				window.alert('You are not on the server');
			}

			return;
		}

		setDiscordAuthenticated(true);
		setSubmissions(response.submissions);
		setUserData(response.userData);
		setLoading(false);
	};

	if (!discordAuthenticated) {
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
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="">
				<User
					avatar={userData.avatar}
					discordName={userData.name}
					discordTag={userData.tag}
					snowflake={userData.snowflake}
				/>
			</div>
			<SubmissionFeed title="Submissions" submissions={submissions} />
		</div>
	);
};

export default Clips;
