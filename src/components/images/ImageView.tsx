import * as React from 'react';
import { fetchImage } from '../../api/api';
import { ImageError, SubmissionType } from '../../api/types';
import { ImageRouteResponse, ImageSubmission, UserData } from '../../api/types';
import { redirectFrom } from '../../ts/utils';
import LinkDiscord from '../LinkDiscord';
import User from '../User';
import Image from './Image';

const { useState, useEffect } = React;

const ImageView = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [discordAuthenticated, setDiscordAuthenticated] = useState<boolean>(
		false,
	);
	const [submission, setSubmission] = useState<ImageSubmission>({
		name: 'Loading',
		original_link:
			'https://cdn.discordapp.com/attachments/324620441195118592/770571708365013032/xkcd.PNG',
		submission_by: 'User#0000',
		submission_date: 0,
		submission_type: SubmissionType.IMAGE,
		views: 0,
	});
	const [userData, setUserData] = useState<UserData>({
		avatar: 'http://placekitten/500/500',
		name: 'User',
		snowflake: '',
		tag: '0000',
	});

	useEffect(() => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);
		const image: string = searchParams.get('image');

		const jwt = localStorage.getItem('jwt');
		if (jwt === null) {
			redirectFrom(window.location.origin, `image?image=${image}`);
			return;
		}

		fetchData(image);
	}, []);

	const fetchData = async (image: string) => {
		const response: ImageRouteResponse = await fetchImage(image);

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

			if (response.errorCode === ImageError.IMAGE_DOES_NOT_EXIST) {
				setDiscordAuthenticated(true);
				setSubmission(response.submissions[0]);
				setUserData(response.userData);
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
			<div className="w-1/3">
				<Image image={submission} />
			</div>
		</div>
	);
};

export default ImageView;
