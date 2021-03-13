import * as React from 'react';
import {
	ImageError,
	ImageRouteResponse,
	ImageSubmission,
	UserData,
} from '../../api/types';
import { fetchImages } from '../../api/api';
import User from '../User';
import SubmissionFeed from '../discord/SubmissionFeed';
import LinkDiscord from '../LinkDiscord';
import ImageUpload from './ImageUpload';
import { redirectFrom } from '../../ts/utils';
import { LOGIN_PAGE } from '../../ts/constants';

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
		redirectFrom(LOGIN_PAGE, 'images');
		return;
	}

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response: ImageRouteResponse = await fetchImages();
		handleResponse(response);
	};

	const handleResponse = (response: ImageRouteResponse) => {
		if (response.error) {
			if (response.errorCode === ImageError.DISCORD_NOT_AUTHENTICATED) {
				setDiscordAuthenticated(false);
			}

			if (response.errorCode === ImageError.USER_NOT_ON_SERVER) {
				window.alert('You are not on the server');
			}

			if (response.errorCode === ImageError.NAME_ALREADY_EXISTS) {
				window.alert('Image with that name already exists!');
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
		<div className="flex xl:flex-row flex-col xl:justify-center overflow-auto">
				<div className="">
					<User
						avatar={userData.avatar}
						discordName={userData.name}
						discordTag={userData.tag}
						snowflake={userData.snowflake}
					/>
				</div>
				<div className="flex flex-col overflow-auto">
					<ImageUpload
						onUpdate={(response) => handleResponse(response)}
					/>
					<SubmissionFeed
						title="Submissions"
						submissions={submissions}
					/>
				</div>
		</div>
	);
};

export default Images;
