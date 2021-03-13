import * as React from 'react';
import {
	ClipSubmission,
	ImageSubmission,
	QuoteSubmission,
	SubmissionType,
	UserSubmission,
} from '../../api/types';
import { timeSince } from '../../ts/timeUtils';
import TextIcon from '../utils/TextIcon';

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
	} else if (submission.submission_type === SubmissionType.QUOTE) {
		submissionContent = (submission as QuoteSubmission).content;
	} else {
		submissionContent = '';
	}

	const beautifyType = (type: SubmissionType) => {
		switch (type) {
			case SubmissionType.CLIP:
				return 'Clip';

			case SubmissionType.IMAGE:
				return 'Image';

			case SubmissionType.QUOTE:
				return 'Quote';

			case SubmissionType.BAAVO:
				return 'Baavo';
		}
	};

	const getImgSource = (submission: UserSubmission) => {
		if (submission.name === 'Nothing here') {
			return (submission as ImageSubmission).original_link;
		}

		switch (submission.submission_type) {
			case SubmissionType.QUOTE:
			case SubmissionType.CLIP:
				return 'http://placekitten.com/500/500';

			case SubmissionType.IMAGE:
				return `${window.location.origin}/img/${submission.name}`;

			case SubmissionType.BAAVO:
				return `${window.location.origin}/baavo/${submission.name}`;
		}
	};

	const getSubmissionName = (submission: UserSubmission) => {
		switch (submission.submission_type) {
			case SubmissionType.IMAGE:
				return (
					<span className="font-bold lg:text-xl md:text-md sm:text-sm text-purple-800 flex-1">
						<a
							href={`${window.location.origin}/image?image=${submission.name}`}
						>
							{submission.name}
						</a>
					</span>
				);

			case SubmissionType.CLIP:
				return (
					<span className="font-bold lg:text-xl md:text-md sm:text-sm text-purple-800 flex-1">
						<a
							href={`${window.location.origin}/clip?clip=${submission.name}`}
						>
							{submission.name}
						</a>
					</span>
				);

			default:
				return (
					<span className="font-bold lg:text-xl md:text-md sm:text-sm text-purple-800 flex-1">
						{submission.name}
					</span>
				);
		}
	};

	return (
		<div className="flex flex-col py-2 border-b-2 border-gray-800">
			<div className="flex flex-row text-gray-100">
				{getSubmissionName(submission)}
				<TextIcon
					src={Today}
					text={`${timeSince(
						new Date(submission.submission_date),
					)} ago`}
				/>
				<img src={More} className="w-6 h-6 cursor-pointer" />
			</div>
			<div className="flex items-center">
				<div className="md:w-24 md:h-12 w-12 h-6 flex justify-center items-center rounded-sm bg-gray-700">
					<img
						className="md:max-w-full md:max-h-12 max-w-full max-h-6"
						src={getImgSource(submission)}
					/>
				</div>
				<div className="flex flex-row text-lg text-gray-100 ml-4">
					<div className="flex flex-col">
						<TextIcon
							src={Eye}
							text={submission.views.toString()}
							truncate={true}
						/>
						<TextIcon
							src={Person}
							text={submission.submission_by}
							truncate={true}
						/>
					</div>
					<div className="flex flex-col">
						<TextIcon
							src={Paint}
							text={beautifyType(submission.submission_type)}
							truncate={true}
						/>
						{submissionContent.length > 0 && (
							<TextIcon
								src={Source}
								text={submissionContent}
								truncate={true}
								link={
									submission.submission_type !==
									SubmissionType.QUOTE
								}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Submission;
