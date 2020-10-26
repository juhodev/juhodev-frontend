import * as React from 'react';
import { UserSubmission } from '../api/types';
import Submission from './Submission';

type Props = {
	submissions: UserSubmission[];
};

const SubmissionFeed = (props: Props) => {
	const { submissions } = props;

	const submissionComponents: JSX.Element[] = submissions.map(
		(submission, i): JSX.Element => {
			return <Submission key={i} submission={submission} />;
		},
	);

	return (
		<div className="flex flex-col border-solid border-2 border-gray-800 w-1/3 p-4 m-4 h-3/4 overflow-y-scroll">
			{submissionComponents}
		</div>
	);
};

export default SubmissionFeed;
