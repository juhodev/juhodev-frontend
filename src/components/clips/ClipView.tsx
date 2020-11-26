import * as React from 'react';
import { fetchClip } from '../../api/api';
import {
	ClipsRouteResponse,
	ClipSubmission,
	ERROR,
	SubmissionType,
	UserData,
} from '../../api/types';
import { redirectFrom } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import User from '../User';
import Clip from './Clip';

const { useState, useEffect } = React;

const ClipView = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [submission, setSubmission] = useState<ClipSubmission>({
		name: 'Loading',
		original_link: '',
		clip_length: 30,
		clip_start: 0,
		submission_by: 'User#0000',
		submission_date: 0,
		submission_type: SubmissionType.CLIP,
		views: 0,
	});
	const [userData, setUserData] = useState<UserData>({
		avatar:
			'https://cdn.discordapp.com/attachments/324620441195118592/770571708365013032/xkcd.PNG',
		name: 'User',
		snowflake: '',
		tag: '0000',
	});

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);
		const image: string = searchParams.get('clip');

		const jwt = localStorage.getItem('jwt');
		if (jwt === null) {
			redirectFrom(window.location.origin, `clip?clip=${image}`);
			return;
		}

		fetchData(image);
	}, []);

	const fetchData = async (clip: string) => {
		const response: ClipsRouteResponse = await fetchClip(clip);

		if (response.error) {
			switch (response.errorCode) {
				case ERROR.DISCORD_NOT_AUTHENTICATED:
					setDiscordAuthenticated(false);
					break;

				case ERROR.USER_NOT_ON_SERVER:
					window.alert('You are not on the server');
					break;

				case ERROR.CLIP_DOES_NOT_EXIST:
					setDiscordAuthenticated(true);
					setSubmission(response.submissions[0]);
					setUserData(response.userData);
					break;
			}

			setLoading(false);
			return;
		}

		setDiscordAuthenticated(true);
		setSubmission(response.submissions[0]);
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
			<div className="xl:w-1/3">
				<Clip clip={submission} />
			</div>
		</div>
	);
};

export default ClipView;
