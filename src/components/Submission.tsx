import * as React from 'react';
import {
	ClipSubmission,
	ImageSubmission,
	QuoteSubmission,
	SubmissionType,
	UserSubmission,
} from '../api/types';
import { timeSince } from '../ts/timeUtils';
import TextIcon from './TextIcon';

import Person from '../../assets/person.svg';
import Paint from '../../assets/paint.svg';
import Today from '../../assets/today.svg';
import Eye from '../../assets/eye.svg';
import Source from '../../assets/source.svg';
import More from '../../assets/more.svg';

type Props = { submission: UserSubmission };

const Submission = (props: Props) => {
	const { submission } = props;

	let submissionContent: string;

	if (submission.submission_type === SubmissionType.CLIP) {
		submissionContent = (submission as ClipSubmission).original_link;
	} else if (submission.submission_type === SubmissionType.IMAGE) {
		submissionContent = (submission as ImageSubmission).original_link;
	} else {
		submissionContent = (submission as QuoteSubmission).content;
	}

	const beautifyType = (type: SubmissionType) => {
		switch (type) {
			case SubmissionType.CLIP:
				return 'Clip';

			case SubmissionType.IMAGE:
				return 'Image';

			case SubmissionType.QUOTE:
				return 'Quote';
		}
	};

	return (
		<div className="flex flex-col">
			<div className="flex flex-row text-gray-100">
				<span className="font-bold text-xl text-purple-800 flex-1">
					{submission.name}
				</span>
				<TextIcon
					src={Today}
					text={`${timeSince(
						new Date(submission.submission_date),
					)} ago`}
				/>
				<img src={More} className="w-6 h-6 cursor-pointer" />
			</div>
			<div className="flex items-center">
				<img
					className="w-24 h-12 rounded-sm"
					src="http://placekitten.com/500/500"
				/>
				<div className="flex flex-row text-lg text-gray-100 ml-4">
					<div className="flex flex-col">
						<TextIcon
							src={Eye}
							text={submission.views.toString()}
						/>
						<TextIcon
							src={Person}
							text={submission.submission_by}
						/>
					</div>
					<div className="flex flex-col">
						<TextIcon
							src={Paint}
							text={beautifyType(submission.submission_type)}
						/>
						<TextIcon src={Source} text={submissionContent} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Submission;
