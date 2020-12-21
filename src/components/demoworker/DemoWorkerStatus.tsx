import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { WorkerStatus } from '../../api/types';
import { millisecondsToSeconds } from '../../ts/timeUtils';

type Props = {
	status: WorkerStatus;
	name: string;
};

const DemoWorkerStatus = (props: Props) => {
	const { processing } = props.status;

	const chartData = {
		labels: processing.all.map((data) => millisecondsToSeconds(data)),
		datasets: [
			{
				label: props.name,
				data: processing.all,
				backgroundColor: '#00BFFF96',
				lineTension: 0.5,
			},
		],
	};

	return (
		<div className="m-2 flex flex-col justify-center items-center">
			<span className="pb-2 text-gray-100">{props.name}</span>
			<div className="flex flex-row w-5/6">
				<div className="flex flex-col text-gray-200 text-md mx-2">
					<span>Alive: {props.status.alive ? 'True' : 'False'}</span>
					<span>
						Working: {props.status.working ? 'True' : 'False'}
					</span>
					<span>Processing times:</span>
					<span>
						{`Average: ${millisecondsToSeconds(
							processing.average,
						)}s`}
					</span>
					<span>
						{`Highest: ${millisecondsToSeconds(
							processing.longest,
						)}s`}
					</span>
				</div>
				<div className="w-full">
					<Line
						options={{
							maintainAspectRatio: false,
							legend: { display: false },
							tooltips: {
								mode: 'label',
								callbacks: {
									title: (tooltipItem, data) => {
										return `${
											data.labels[tooltipItem[0].index]
										}s`;
									},
									beforeLabel: (tooltipItem, data) => {
										return undefined;
									},
									label: (tooltipItem, data) => {
										return undefined;
									},
								},
							},
							scales: {
								xAxes: [
									{
										display: false,
									},
								],
								yAxes: [
									{
										gridLines: { color: '#3d3d3d' },
										ticks: {
											beginAtZero: true,
										},
									},
								],
							},
						}}
						data={chartData}
					/>
				</div>
			</div>
		</div>
	);
};

export default DemoWorkerStatus;
