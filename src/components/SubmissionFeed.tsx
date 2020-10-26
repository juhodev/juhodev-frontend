import * as React from 'react';
import { UserSubmission } from '../api/types';
import Submission from './Submission';

type Props = {
	submissions: UserSubmission[];
	title: string;
};

const SubmissionFeed = (props: Props) => {
	const { submissions } = props;

	const submissionComponents: JSX.Element[] = submissions.map(
		(submission, i): JSX.Element => {
			return <Submission key={i} submission={submission} />;
		},
	);

	return (
		<div className="border-solid border-2 border-gray-800 p-4 m-4 overflow-y-scroll">
			<span className="text-gray-100">{props.title}</span>
			{submissionComponents}
		</div>
	);
};

export default SubmissionFeed;
