import * as React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
	name: string;
	data: any[];
	width: number | string;
	height: number | string;
	yAxisName?: string;
};

const LineChartWrapper = (props: Props) => {
	const { name, data, width, height, yAxisName } = props;

	return (
		<ResponsiveContainer width={width} height={height}>
			<LineChart data={data} margin={{ bottom: 0, top: 0, left: -20, right: 0 }}>
				<XAxis dataKey="name" name={yAxisName} />
				<YAxis />
				<CartesianGrid vertical={false} />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="data" name={name} stroke="#3182CE" strokeWidth={2} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LineChartWrapper;
