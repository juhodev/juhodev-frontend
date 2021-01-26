import * as React from 'react';
import { WorkerStatus } from '../../api/types';
import { millisecondsToSeconds } from '../../ts/timeUtils';
import LineChartWrapper from '../charts/LineChartWrapper';

type Props = {
	status: WorkerStatus;
	name: string;
};

const DemoWorkerStatus = (props: Props) => {
	const { processing } = props.status;

	return (
		<div className="m-2 flex flex-col justify-center items-center">
			<span className="pb-2 text-gray-100">{props.name}</span>
			<div className="flex flex-row w-5/6">
				<div className="flex flex-col text-gray-200 text-md mx-2">
					<span>Alive: {props.status.alive ? 'True' : 'False'}</span>
					<span>Working: {props.status.working ? 'True' : 'False'}</span>
					<span>Processing times:</span>
					<span>{`Average: ${millisecondsToSeconds(processing.average)}s`}</span>
					<span>{`Highest: ${millisecondsToSeconds(processing.longest)}s`}</span>
				</div>
				<div className="w-full">
					<LineChartWrapper
						name={props.name}
						width="100%"
						height={250}
						data={processing.all.map((x) => {
							return { data: millisecondsToSeconds(x) };
						})}
					/>
				</div>
			</div>
		</div>
	);
};

export default DemoWorkerStatus;
