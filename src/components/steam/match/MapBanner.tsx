import * as React from 'react';
import { dateFormat } from '../../../ts/timeUtils';
import MapImage from './MapImage';

type Props = {
	map: string;
	date: number;
};

const MapBanner = (props: Props) => {
	return (
		<div className="flex flex-col rounded-b-lg bg-gray-800 p-4 mb-8">
			<div className="flex items-center">
				<MapImage map={props.map} />
				<div className="mx-4 flex flex-col">
					<span className="text-3xl text-gray-100 leading-none">
						{props.map}
					</span>
					<span className="text-gray-500 text-sm">
						{dateFormat(new Date(props.date))}
					</span>
				</div>
			</div>
		</div>
	);
};

export default MapBanner;
