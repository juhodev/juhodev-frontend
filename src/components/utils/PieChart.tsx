import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { randomRGBA } from '../../ts/utils';

type Data = {
	name: string;
	num: number;
};

type Props = {
	name: string;
	total: string;
	data: Data[];
};

const PieChart = (props: Props) => {
	const chartData = {
		labels: props.data.map((x) => x.name),
		datasets: [
			{
				label: name,
				data: props.data.map((x) => x.num),
				backgroundColor: props.data.map((x) => randomRGBA()),
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="flex flex-col justify-center items-center w-64">
			<span className="pb-2 text-gray-100">{props.total}</span>
			<Pie
				options={{
					legend: { display: false },
					tooltips: {
						mode: 'label',
						callbacks: {
							title: (tooltipItem, data) => {
								return data.labels[tooltipItem[0].index];
							},
							beforeLabel: (tooltipItem, data) => {
								return undefined;
							},
							label: (tooltipItem, data) => {
								return undefined;
							},
						},
					},
				}}
				data={chartData}
			/>
		</div>
	);
};

export default PieChart;
