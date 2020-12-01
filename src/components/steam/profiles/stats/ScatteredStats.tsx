import * as React from 'react';
import { Scatter } from 'react-chartjs-2';
import { fetchCsgoStatistics } from '../../../../api/api';
import { SteamStatisticsResponse } from '../../../../api/types';
import StatsTypeSelection, { SelectionType } from './StatsTypeSelection';

const { useEffect, useState } = React;

type Props = {
	playerId: string;
	types: SelectionType[];
};

const ScatteredStats = (props: Props) => {
	const [data, setData] = useState<number[]>([]);
	const [currentType, setCurrentType] = useState<SelectionType>(
		props.types[0],
	);

	useEffect(() => {
		fetchData();
	}, [currentType]);

	const fetchData = async () => {
		const response: SteamStatisticsResponse = await fetchCsgoStatistics(
			props.playerId,
			currentType.type,
		);
		setData(response.data);
	};

	const chartData = {
		labels: props.types[0],
		datasets: [
			{
				fill: false,
				backgroundColor: '#3182CE',
				data: data.map((value, i) => {
					return { x: i, y: value };
				}),
			},
		],
	};

	return (
		<div className="flex flex-col flex-1 mx-2">
			<div className="flex mb-2 mx-2">
				<StatsTypeSelection
					types={props.types}
					onChange={(type) => {
						setCurrentType(type);
					}}
				/>
				<div className="flex-1"></div>
			</div>
			<Scatter
				height={50}
				options={{
					maintainAspectRation: false,
					legend: { display: false },
					tooltips: {
						mode: 'label',
						callbacks: {
							title: (tooltipItem, _) => {
								return `${data[tooltipItem[0].index]} ${
									currentType.type
								}`;
							},
							beforeLabel: (tooltipItem, data) => {
								return undefined;
							},
							label: (tooltipItem, data) => {
								return undefined;
							},
						},
					},
					scales: {
						xAxes: [
							{
								display: false,
							},
						],
						yAxes: [
							{
								gridLines: { color: '#3d3d3d' },
							},
						],
					},
				}}
				data={chartData}
			/>
		</div>
	);
};

export default ScatteredStats;
