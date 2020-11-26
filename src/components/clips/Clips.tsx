import * as React from 'react';
import { fetchClips } from '../../api/api';
import {
	ClipSubmission,
	UserData,
	ClipsRouteResponse,
	ClipsError,
} from '../../api/types';
import { redirectFrom } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import SubmissionFeed from '../SubmissionFeed';
import User from '../User';

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
		redirectFrom(window.location.origin, 'clips');
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

			setLoading(false);
			return;
		}

		setDiscordAuthenticated(true);
		setSubmissions(response.submissions);
		setUserData(response.userData);
		setLoading(false);
	};

	if (!discordAuthenticated && !loading) {
		return (
			<div className="flex xl:flex-row flex-col justify-center overflow-auto flex-1">
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
		<div className="flex xl:flex-row flex-col justify-center overflow-auto flex-1">
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
