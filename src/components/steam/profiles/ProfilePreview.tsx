import * as React from 'react';
import { BuiltProfile } from '../../../api/types';
import { pluralize } from '../../../ts/utils';

type Props = {
	profile: BuiltProfile;
};

const ProfilePreview = (props: Props) => {
	const { profile } = props;

	return (
		<div className="flex flex-col border-2 border-gray-800 md:w-64 w-full p-2">
			<div className="flex items-center">
				<img className="w-10 h-10 rounded" src={profile.avatarLink} />
				<div className="mx-2 flex flex-col self-end">
					<a
						className="text-xl text-gray-100 whitespace-nowrap overflow-hidden truncate w-40"
						href={`${window.location.origin}/steam?id=${profile.id}`}
					>
						{profile.name}
					</a>
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
		</div>
	);
};

export default ProfilePreview;
