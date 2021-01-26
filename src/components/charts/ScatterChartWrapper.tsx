import * as React from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
	name: string;
	data: any[];
	width: number | string;
	height: number | string;
	yAxisName?: string;
};

const ScatterChartWrapper = (props: Props) => {
	const { name, data, width, height, yAxisName } = props;

	return (
		<ResponsiveContainer width={width} height={height}>
			<ScatterChart margin={{ bottom: 0, top: 0, left: -20, right: 0 }}>
				<XAxis dataKey="name" name={yAxisName} />
				<YAxis type="number" dataKey="y" name={name} />
				<CartesianGrid vertical={false} />
				<Tooltip />
				<Legend />
				<Scatter className="" name={name} data={data} fill="#3182CE" />
			</ScatterChart>
		</ResponsiveContainer>
	);
};

export default ScatterChartWrapper;
