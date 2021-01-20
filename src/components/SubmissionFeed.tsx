import * as React from 'react';
import { ImageSubmission, SubmissionType, UserSubmission } from '../api/types';
import { filterSearch } from '../ts/search';
import Submission from './Submission';
import Sort from './utils/Sort';

const { useState } = React;

type Props = {
	submissions: UserSubmission[];
	title: string;
};

enum SubmissionSortType {
	SUBMISSION_DATE = 'SUBMISSION_DATE',
	NAME = 'NAME',
	SUBMISSION_BY = 'SUBMISSION_BY',
	VIEWS = 'VIEWS',
}

const SubmissionFeed = (props: Props) => {
	const [sortType, setSortType] = useState<string>(
		SubmissionSortType.SUBMISSION_DATE,
	);
	const { submissions } = props;

	const sortedSubmissions: UserSubmission[] = filterSearch(
		submissions,
		'',
		sortType,
	);
	const submissionComponents: JSX.Element[] = sortedSubmissions.map(
		(submission, i): JSX.Element => {
			return <Submission key={i} submission={submission} />;
		},
	);

	const emptyUserSubmission: ImageSubmission = {
		name: 'Nothing here',
		original_link:
			'https://cdn.discordapp.com/attachments/324620441195118592/770571708365013032/xkcd.PNG',
		submission_by: 'User#0000',
		submission_date: 0,
		submission_type: SubmissionType.IMAGE,
		views: 0,
	};

	return (
		<div className="border-solid border-2 border-gray-800 xl:p-4 p-2 xl:m-4 m-2 overflow-y-scroll">
			<div className="flex flex-row mb-2">
				<span className="text-gray-100 flex-1">{props.title}</span>
				<Sort
					onChange={(sortType) => setSortType(sortType.sortType)}
					sortTypes={[
						{
							sortType: SubmissionSortType.NAME,
							displayName: 'Name',
						},
						{
							sortType: SubmissionSortType.SUBMISSION_BY,
							displayName: 'Submission by',
						},
						{
							sortType: SubmissionSortType.SUBMISSION_DATE,
							displayName: 'Submission date',
						},
						{
							sortType: SubmissionSortType.VIEWS,
							displayName: 'Views',
						},
					]}
				/>
			</div>
			{submissionComponents.length === 0 && (
				<Submission submission={emptyUserSubmission} />
			)}
			{submissionComponents}
		</div>
	);
};

export default SubmissionFeed;
