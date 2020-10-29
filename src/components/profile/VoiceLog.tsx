import * as React from 'react';
import { UserVoiceLog } from '../../api/types';
import { msToTime } from '../../ts/timeUtils';
import PieChart from '../utils/PieChart';

type Props = {
	userVoiceLogs: UserVoiceLog[];
};

const VoiceLog = (props: Props) => {
	const sortedLogs: UserVoiceLog[] = props.userVoiceLogs
		.sort((a, b) => a.time - b.time)
		.reverse();

	const voiceLogComponents: JSX.Element[] = sortedLogs.map(
		(log): JSX.Element => {
			return (
				<div className="flex flex-1 pr-2">
					<span className="text-gray-100 flex-1">{log.channel}</span>
					<span className="text-gray-100 text-right">
						{msToTime(log.time)}
					</span>
				</div>
			);
		},
	);

	if (sortedLogs.length === 0) {
		sortedLogs.push({ channel: '', time: 0 });
	}

	const totalTimeInVoiceChannels: number = sortedLogs
		.map((log) => log.time)
		.reduce((a, b) => (a += b));

	return (
		<div className="p-3">
			<span className="text-gray-500">Voice channels</span>
			<div className="flex flex-row">
				<div className="h-48 overflow-y-scroll flex-1">
					<div className="flex flex-col">{voiceLogComponents}</div>
				</div>
				<PieChart
					name="Channels"
					total={msToTime(totalTimeInVoiceChannels)}
					data={sortedLogs.map((x) => {
						return {
							name: x.channel,
							num: x.time,
						};
					})}
				/>
			</div>
		</div>
	);
};

export default VoiceLog;
