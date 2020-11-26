import * as React from 'react';
import { ClipSubmission } from '../../api/types';
import TextIcon from '../utils/TextIcon';

import Eye from '../../../assets/eye.svg';
import Text from '../utils/Text';
import { dateFormat, formatSeconds } from '../../ts/timeUtils';

type Props = {
	clip: ClipSubmission;
};

const Clip = (props: Props) => {
	const { clip } = props;

	const searchParams: URLSearchParams = new URLSearchParams(
		clip.original_link.split('watch')[1],
	);
	const videoId: string = searchParams.get('v');
	const youtubeURL: string = `https://www.youtube.com/embed/${videoId}?start=${
		clip.clip_start
	}&end=${clip.clip_start + clip.clip_length}`;

	return (
		<div className="flex flex-col border-solid border-2 border-gray-800 xl:m-4 m-2">
			<div className="w-full h-96 flex justify-center items-center bg-gray-700">
				{clip.original_link !== '' && (
					<iframe className="w-full h-96" src={youtubeURL}></iframe>
				)}
			</div>
			<div className="px-4 pb-2">
				<div className="my-4">
					<div className="flex flex-row text-gray-100">
						<span className="font-bold text-2xl text-purple-800 flex-1">
							{clip.name}
						</span>
						<TextIcon src={Eye} text={clip.views.toString()} />
					</div>
				</div>
				<div className="flex flex-row">
					<div className="flex flex-col">
						<Text
							title="Submitted by"
							subText={clip.submission_by}
						/>
						<Text
							title="Start"
							subText={formatSeconds(clip.clip_start)}
						/>
					</div>
					<div className="flex flex-col">
						<Text
							title="Time"
							subText={dateFormat(new Date(clip.submission_date))}
						/>
						<Text
							title="Length"
							subText={clip.clip_length.toString()}
						/>
					</div>
				</div>
				<Text
					title="Original link"
					subText={clip.original_link}
					truncate={true}
					link={true}
				/>
			</div>
		</div>
	);
};

export default Clip;
