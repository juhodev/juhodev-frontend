import * as React from 'react';
import PieChartWrapper from '../charts/PieChartWrapper';

type Data = {
	name: string;
	value: number;
};

type Props = {
	name: string;
	total: string;
	data: Data[];
};

const MetricPie = (props: Props) => {
	const infoTexts: React.ReactNode[] = props.data.map((x) => (
		<span key={x.name} className="text-gray-200 text-md">{`${x.name}: ${x.value}`}</span>
	));

	return (
		<div className="m-2 flex flex-row">
			<PieChartWrapper data={props.data} width={200} height={200} />
			<div className="flex flex-1 flex-col">
				<span className="text-gray-200 text-xl mb-4">{props.name}</span>
				{infoTexts}
			</div>
		</div>
	);
};

export default MetricPie;
