import * as React from 'react';
import { UserSubmission } from '../api/types';
import { filterSearch, SortType } from '../ts/search';
import Submission from './Submission';
import Sort from './utils/Sort';

const { useState } = React;

type Props = {
	submissions: UserSubmission[];
	title: string;
};

const SubmissionFeed = (props: Props) => {
	const [sortType, setSortType] = useState<SortType>(
		SortType.SUBMISSION_DATE,
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

	return (
		<div className="border-solid border-2 border-gray-800 p-4 m-4 overflow-y-scroll">
			<div className="flex flex-row mb-2">
				<span className="text-gray-100 flex-1">{props.title}</span>
				<Sort onChange={(sortType) => setSortType(sortType)} />
			</div>
			{submissionComponents}
		</div>
	);
};

export default SubmissionFeed;
