import * as React from 'react';

type Props = {
	name: string;
	data: any[];
	width: number | string;
	height: number | string;
	yAxisName?: string;
};

const { useState, useEffect } = React;

const ScatterChartWrapper = (props: Props) => {
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

	const { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } = recharts;

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
