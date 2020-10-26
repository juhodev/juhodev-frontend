import * as React from 'react';
import {
	ImageError,
	ImageRouteResponse,
	ImageSubmission,
	UserData,
} from '../api/types';
import { fetchImages } from '../api/api';
import User from './User';
import { startAuthFlow } from '../ts/auth';
import SubmissionFeed from './SubmissionFeed';
import LinkDiscord from './LinkDiscord';

const { useState, useEffect } = React;

const Images = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [submissions, setSubmissions] = useState<ImageSubmission[]>([]);
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
		const response: ImageRouteResponse = await fetchImages();

		if (response.error) {
			if (response.errorCode === ImageError.DISCORD_NOT_AUTHENTICATED) {
				setDiscordAuthenticated(false);
			}

			if (response.errorCode === ImageError.USER_NOT_ON_SERVER) {
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
			<SubmissionFeed title="Submissions" submissions={submissions} />
		</div>
	);
};

export default Images;
