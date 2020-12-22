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
				lineTension: 0,
			},
		],
	};

	const average: number =
		props.data
			.slice(props.data.length * 0.7, props.data.length)
			.reduce((prev, curr) => (prev += curr)) / props.data.length;
	const highest: number = props.data
		.slice(props.data.length * 0.7, props.data.length)
		.reduce((prev, curr) => (prev <= curr ? (prev = curr) : prev));

	const averageFormat: string | number =
		props.dataFormat !== undefined ? props.dataFormat(average) : average;
	const highestFormat: string | number =
		props.dataFormat !== undefined ? props.dataFormat(highest) : highest;

	return (
		<div className="m-2 flex flex-col justify-center items-center">
			<span className="pb-2 text-gray-100">{`${props.name} (last 30% avg: ${averageFormat}, ${highestFormat})`}</span>
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
						elements: {
							point: {
								radius: 0,
							},
						},
					}}
					data={data}
				/>
			</div>
		</div>
	);
};

export default MetricGraph;
