import * as React from 'react';
import { BuiltProfile } from '../../../api/types';
import { pluralize } from '../../../ts/utils';

type Props = {
	profile: BuiltProfile;
};

const ProfilePreview = (props: Props) => {
	const { profile } = props;

	return (
		<a
			className="flex flex-col border-2 border-gray-800 w-full p-2 transition duration-150 ease-in-out hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
			href={`${window.location.origin}/steam?id=${profile.id}`}
		>
			<div className="flex items-center">
				<img className="w-10 h-10 rounded" src={profile.avatarLink} />
				<div className="mx-2 flex flex-col self-end">
					<span className="text-xl text-gray-100 whitespace-nowrap overflow-hidden truncate w-40">
						{profile.name}
					</span>
					<span className="text-gray-500 text-xs leading-none">
						{profile.id}
					</span>
				</div>
			</div>
			<span className="text-gray-200 text-lg mt-4">
				{`${profile.matchesCount} ${pluralize(
					'match',
					'matches',
					profile.matchesCount,
				)} saved`}
			</span>
		</a>
	);
};

export default ProfilePreview;
