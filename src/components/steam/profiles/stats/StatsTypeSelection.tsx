import * as React from 'react';
import ArrowDown from '../../../../../assets/arrow_down.svg';

export type SelectionType = {
	type: string;
	displayName: string;
};

type Props = {
	types: SelectionType[];
	onChange: (type: SelectionType) => void;
};

const StatsTypeSelection = (props: Props) => {
	const { types } = props;

	const options: JSX.Element[] = types.map(
		(type): JSX.Element => {
			return (
				<option key={type.type} className="bg-gray-700">
					{type.displayName}
				</option>
			);
		},
	);

	return (
		<div className="flex flex-row text-base items-center border-b-2 border-gray-500">
			<img src={ArrowDown} />
			<select
				id="sort-by-select"
				className="block pl-2 appearance-none bg-transparent border-none focus:outline-none text-gray-200"
				onChange={(e) =>
					props.onChange(
						types.find(
							(type) => type.displayName === e.target.value,
						),
					)
				}
			>
				{options}
			</select>
		</div>
	);
};

export default StatsTypeSelection;
