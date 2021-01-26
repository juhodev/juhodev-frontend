import * as React from 'react';
import { DateMatches } from '../../../../api/types';
import { dateFormat } from '../../../../ts/timeUtils';
import ScatterChartWrapper from '../../../charts/ScatterChartWrapper';

type Props = {
	mapFrequency: DateMatches[];
};

const MapFrequency = (props: Props) => {
	return (
		<div className="flex flex-col mt-4 mb-2 p-4 flex-1 h-full">
			<span className="text-2xl text-gray-100 mb-2">Matches played per day</span>
			<ScatterChartWrapper
				name="Matches played"
				data={props.mapFrequency.map((date, i) => {
					return { x: i, y: date.matches, name: `${dateFormat(new Date(date.date), true)}` };
				})}
				width="100%"
				height={400}
				yAxisName="Date"
			/>
		</div>
	);
};

export default MapFrequency;
