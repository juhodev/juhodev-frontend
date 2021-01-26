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

	const { CartesianGrid, Legend, ResponsiveContainer, Line, LineChart, Tooltip, XAxis, YAxis } = recharts;

	// This is a hack that makes a linechart to look like a scatterchart
	// I need to do this because when using scatterchart you can't customize the size of the
	// dots, resulting in huge datasets to look bad.
	// I also added a faint line but it's not too visible
	return (
		<ResponsiveContainer width={width} height={height}>
			<LineChart data={data} margin={{ bottom: 0, top: 0, left: -20, right: 0 }}>
				<XAxis dataKey="name" name={yAxisName} />
				<YAxis />
				<CartesianGrid vertical={false} />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					name={name}
					dataKey="data"
					strokeWidth={1}
					strokeOpacity={0.2}
					dot={{ fill: '#3182CE' }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default ScatterChartWrapper;
