import * as React from 'react';
import { Line } from 'react-chartjs-2';

type Props = {
	name: string;
	data: number[];
	dataFormat?: (data: number) => string;
};

const MetricGraph = (props: Props) => {
	const data = {
		labels:
			props.dataFormat !== undefined
				? props.data.map((x) => props.dataFormat(x))
				: props.data,
		datasets: [
			{
				label: props.name,
				data: props.data,
				backgroundColor: '#00BFFF96',
				lineTension: 0.5,
			},
		],
	};

	return (
		<div className="m-2 flex flex-col justify-center items-center">
			<span className="pb-2 text-gray-100">{props.name}</span>
			<div className="w-full">
				<Line
					options={{
						maintainAspectRatio: false,
						legend: { display: false },
						tooltips: {
							mode: 'label',
							callbacks: {
								title: (tooltipItem, data) => {
									const curr =
										data.labels[tooltipItem[0].index];
									return curr;
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
					data={data}
				/>
			</div>
		</div>
	);
};

export default MetricGraph;
