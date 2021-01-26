import * as React from 'react';

type Props = {
	name: string;
	data: any[];
	width: number | string;
	height: number | string;
	yAxisName?: string;
};

const { useState, useEffect } = React;

const LineChartWrapper = (props: Props) => {
	const { name, data, width, height, yAxisName } = props;
	const [recharts, setRecharts] = useState<any>(undefined);

	useEffect(() => {
		loadRecharts();
	}, []);

	const loadRecharts = async () => {
		setRecharts(await import('recharts'));
	};

	if (recharts === undefined) {
		return <span>Loading...</span>;
	}

	const { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } = recharts;

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
