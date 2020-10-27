import * as React from 'react';
import { ImageSubmission } from '../../api/types';
import { getURL } from '../../api/api';
import TextIcon from '../utils/TextIcon';

import Eye from '../../../assets/eye.svg';
import Text from '../utils/Text';
import { dateFormat } from '../../ts/timeUtils';

type Props = {
	image: ImageSubmission;
};

const Image = (props: Props) => {
	const { image } = props;

	return (
		<div className="flex flex-col border-solid border-2 border-gray-800 m-4">
			<div className="w-full h-80 flex justify-center items-center bg-gray-700">
				<img
					className="max-w-full max-h-80"
					src={`${getURL()}/img/${image.name}`}
				/>
			</div>
			<div className="px-4">
				<div className="my-4">
					<div className="flex flex-row text-gray-100">
						<span className="font-bold text-2xl text-purple-800 flex-1">
							{image.name}
						</span>
						<TextIcon src={Eye} text={image.views.toString()} />
					</div>
				</div>
				<div className="flex flex-row">
					<Text title="Submitted by" subText={image.submission_by} />
					<Text
						title="Time"
						subText={dateFormat(new Date(image.submission_date))}
					/>
				</div>
				<Text
					title="Original link"
					subText={image.original_link}
					truncate={true}
				/>
			</div>
		</div>
	);
};

export default Image;
