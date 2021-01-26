import * as React from 'react';
import LineChartWrapper from '../charts/LineChartWrapper';

type Props = {
	name: string;
	data: number[];
	dataFormat?: (data: number) => string;
};

const MetricGraph = (props: Props) => {
	const average: number =
		props.data.slice(props.data.length * 0.7, props.data.length).reduce((prev, curr) => (prev += curr)) /
		props.data.length;
	const highest: number = props.data
		.slice(props.data.length * 0.7, props.data.length)
		.reduce((prev, curr) => (prev <= curr ? (prev = curr) : prev));

	const averageFormat: string | number = props.dataFormat !== undefined ? props.dataFormat(average) : average;
	const highestFormat: string | number = props.dataFormat !== undefined ? props.dataFormat(highest) : highest;

	return (
		<div className="m-2 flex flex-col justify-center items-center">
			<span className="pb-2 text-gray-100">{`${props.name} (last 30% avg: ${averageFormat}, ${highestFormat})`}</span>
			<div className="w-full">
				<LineChartWrapper
					name={props.name}
					width="100%"
					height={250}
					data={props.data.map((x) => {
						return { data: x };
					})}
				/>
			</div>
		</div>
	);
};

export default MetricGraph;
