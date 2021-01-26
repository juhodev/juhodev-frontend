import * as React from 'react';
import PieChart from '../utils/PieChart';

type Data = {
	name: string;
	num: number;
};

type Props = {
	name: string;
	total: string;
	data: Data[];
};

const MetricPie = (props: Props) => {
	const infoTexts: React.ReactNode[] = props.data.map((x) => (
		<span className="text-gray-200 text-md">{`${x.name}: ${x.num}`}</span>
	));

	return (
		<div className="m-2 flex flex-row">
			<PieChart total={props.total} name={props.name} data={props.data} />
			<div className="flex flex-col">
				<span className="text-gray-200 text-xl mb-4">{props.name}</span>
				{infoTexts}
			</div>
		</div>
	);
};

export default MetricPie;
