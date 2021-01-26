import * as React from 'react';
import { fetchCsgoStatistics } from '../../../../api/api';
import { SteamStatisticsResponse } from '../../../../api/types';
import ScatterChartWrapper from '../../../charts/ScatterChartWrapper';
import StatsTypeSelection, { SelectionType } from './StatsTypeSelection';

const { useEffect, useState } = React;

type Props = {
	playerId: string;
	types: SelectionType[];
};

const ScatteredStats = (props: Props) => {
	const [data, setData] = useState<number[]>([]);
	const [currentType, setCurrentType] = useState<SelectionType>(props.types[0]);
	const [onlySoloQueue, setOnlySoloQueue] = useState<boolean>(false);

	useEffect(() => {
		fetchData();
	}, [currentType, onlySoloQueue]);

	const fetchData = async () => {
		const response: SteamStatisticsResponse = await fetchCsgoStatistics(
			props.playerId,
			currentType.type,
			onlySoloQueue,
		);
		setData(response.data);
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
				<div className="mx-2">
					<input type="checkbox" checked={onlySoloQueue} onChange={() => setOnlySoloQueue(!onlySoloQueue)} />
					<span className="ml-2 text-gray-500 text-sm">Only show solo queue games</span>
				</div>
				<div className="flex-1"></div>
			</div>
			<ScatterChartWrapper
				height={250}
				width="100%"
				name={currentType.displayName}
				data={data.map((value, i) => {
					return { data: value };
				})}
			/>
		</div>
	);
};

export default ScatteredStats;
