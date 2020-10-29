import * as React from 'react';
import { UserCommandLog, UserVoiceLog } from '../../api/types';
import PieChart from '../utils/PieChart';

type Props = {
	userCommandLog: UserCommandLog[];
};

const CommandLog = (props: Props) => {
	const sortedLogs: UserCommandLog[] = props.userCommandLog
		.sort((a, b) => a.count - b.count)
		.reverse();

	const commandComponents: JSX.Element[] = sortedLogs.map(
		(log): JSX.Element => {
			return (
				<div className="flex flex-1 pr-2">
					<span className="text-gray-100 flex-1">{log.command}</span>
					<span className="text-gray-100 text-right">
						{log.count}
					</span>
				</div>
			);
		},
	);

	if (sortedLogs.length === 0) {
		sortedLogs.push({ command: '', count: 0 });
	}

	const totalNumberOfCommands: number = sortedLogs
		.map((log) => log.count)
		.reduce((a, b) => (a += b));

	return (
		<div className="p-3">
			<span className="text-gray-500">Commands</span>
			<div className="flex flex-row">
				<div className="h-48 overflow-y-scroll flex-1">
					<div className="flex flex-col">{commandComponents}</div>
				</div>
				<PieChart
					name="Commands"
					total={`Total ${totalNumberOfCommands}`}
					data={sortedLogs.map((x) => {
						return {
							name: x.command,
							num: x.count,
						};
					})}
				/>
			</div>
		</div>
	);
};

export default CommandLog;
