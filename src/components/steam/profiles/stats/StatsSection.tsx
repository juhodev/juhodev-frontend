import * as React from 'react';
import ScatteredStats from './ScatteredStats';
import { SelectionType } from './StatsTypeSelection';

type Data = {
	name: string;
	average: string;
	highest?: string;
	highestMatchId?: number;
	standardDeviation?: number;
	standardError?: number;
};

type Props = {
	playerId: string;
	types?: SelectionType[];
	name: string;
	data: Data[];
};

const StatsSection = (props: Props) => {
	const statsComponents = props.data.map((data) => (
		<div className="flex flex-col mx-2">
			<span className="text-lg font-bold text-blue-500">{data.name}</span>
			<div className="">
				<span className="font-bold text-xl text-gray-100 mr-1">
					{data.standardDeviation !== undefined ? (
						<abbr
							title={`SD: ${data.standardDeviation.toFixed(
								3,
							)}, SE: ${data.standardError.toFixed(3)}`}
						>
							{data.average}
						</abbr>
					) : (
						data.average
					)}
				</span>
				{data.highest !== undefined && (
					<a
						href={`${window.location.origin}/match?id=${data.highestMatchId}`}
						className="text-md text-gray-500"
					>{`(${data.highest})`}</a>
				)}
			</div>
		</div>
	));

	return (
		<div className="flex flex-col w-full">
			<span className="rounded-b-lg bg-gray-800 p-4 text-xl text-gray-100">
				{props.name}
			</span>
			<div className="flex flex-row my-4">{statsComponents}</div>
			{props.types !== undefined && (
				<ScatteredStats playerId={props.playerId} types={props.types} />
			)}
		</div>
	);
};

export default StatsSection;
