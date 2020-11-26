import * as React from 'react';
import { fetchBuiltCsgoProfiles } from '../../../api/api';
import { BuiltProfile, SteamProfilesResponse } from '../../../api/types';
import { pluralize } from '../../../ts/utils';
import ProfilePreview from './ProfilePreview';

const { useState, useEffect } = React;

const ProfilePreviews = () => {
	const [profiles, setProfiles] = useState<BuiltProfile[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response: SteamProfilesResponse = await fetchBuiltCsgoProfiles();

		if (!response.error) {
			setProfiles(response.profiles);
		}
	};

	const profileComponents: React.ReactNode = profiles.map((profile) => (
		<ProfilePreview key={profile.id} profile={profile} />
	));

	return (
		<div className="flex flex-col mx-2">
			<span className="text-blue-500 text-xl mb-4 mx-2">
				Quick search
			</span>
			<div className="grid grid-cols-4 gap-2">{profileComponents}</div>
		</div>
	);
};

export default ProfilePreviews;
