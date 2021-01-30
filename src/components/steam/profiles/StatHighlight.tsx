import * as React from 'react';
import { PlayerStatistics } from '../../../api/types';

type Props = { profile: PlayerStatistics; text: string; count: number | string };

const StatHighlight = (props: Props) => {
	const { profile, text, count } = props;

	return (
		<div className="flex flex-col bg-gray-800 p-2 m-2 rounded">
			<div className="flex items-center">
				<img className="w-10 h-10 rounded" src={profile.player.avatarLink} />
				<div className="mx-2 flex flex-col self-end">
					<a
						className="text-xl text-gray-100 whitespace-nowrap overflow-hidden truncate w-32"
						href={`${window.location.origin}/steam?id=${profile.player.id}`}
					>
						{profile.player.name}
					</a>
					<span className="text-gray-500 text-xs leading-none">{profile.player.id}</span>
				</div>
			</div>
			<div className="flex flex-col mt-4">
				<span className="text-gray-500 text-lg leading-none">{text}</span>
				<span className="text-gray-200 text-3xl">{count}</span>
			</div>
		</div>
	);
};

export default StatHighlight;
