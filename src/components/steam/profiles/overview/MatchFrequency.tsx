import * as React from 'react';
import { DateMatches } from '../../../../api/types';
import { Scatter } from 'react-chartjs-2';
import { dateFormat } from '../../../../ts/timeUtils';

type Props = {
	mapFrequency: DateMatches[];
};

const MapFrequency = (props: Props) => {
	const data = {
		labels: 'Map frequency',
		datasets: [
			{
				label: 'Map frequency',
				fill: false,
				backgroundColor: '#3182CE',
				data: props.mapFrequency.map((date, i) => {
					return { x: i, y: date.matches };
				}),
			},
		],
	};

	return (
		<div className="flex flex-col mt-4 mb-2 p-4 flex-1 h-full">
			<span className="text-2xl text-gray-100 mb-2">
				Matches played per day
			</span>
			<Scatter
				height={70}
				options={{
					maintainAspectRation: false,
					legend: { display: false },
					tooltips: {
						mode: 'label',
						callbacks: {
							title: (tooltipItem, data) => {
								return `${dateFormat(
									new Date(
										props.mapFrequency[
											tooltipItem[0].index
										].date,
									),
									true,
								)} - ${
									props.mapFrequency[tooltipItem[0].index]
										.matches
								} matches`;
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
				data={data}
			/>
		</div>
	);
};

export default MapFrequency;
