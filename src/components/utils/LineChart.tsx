import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { DateMatches } from '../../api/types';
import { dateFormat } from '../../ts/timeUtils';
import { randomRGBA } from '../../ts/utils';

type Props = {
	dates: DateMatches[];
	name: string;
};

const LineChart = (props: Props) => {
	const chartData = {
		labels: props.dates.map((data) =>
			dateFormat(new Date(data.date), true),
		),
		datasets: [
			{
				label: props.name,
				data: props.dates.map((data) => data.matches),
				backgroundColor: '#7d7d7d',
			},
		],
	};

	return (
		<div className="md:flex flex-col justify-center items-center w-1/2 hidden">
			<span className="pb-2 text-gray-100">{props.name}</span>
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
								} - ${
									props.dates[tooltipItem[0].index].matches
								} matches`;
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
							},
						],
					},
					lineTension: 2,
				}}
				data={chartData}
			/>
		</div>
	);
};

export default LineChart;
