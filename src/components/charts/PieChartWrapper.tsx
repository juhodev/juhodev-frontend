import * as React from 'react';
import { randomRGBA } from '../../ts/utils';

type Props = {
	data: any[];
	width: number | string;
	height: number | string;
	formatter?: Function;
};

const { useState, useEffect } = React;

const PieChartWrapper = (props: Props) => {
	const { data, width, height, formatter } = props;
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

	const { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } = recharts;

	return (
		<ResponsiveContainer width={width} height={height}>
			<PieChart>
				<Tooltip formatter={formatter} />
				<Pie dataKey="value" nameKey="name" data={data} cx="50%" cy="50%" outerRadius={50}>
					{data.map((_, index) => (
						<Cell key={`cell-${index}`} fill={randomRGBA()} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default PieChartWrapper;
