import * as React from 'react';

import ArrowDown from '../../../assets/arrow_down.svg';

type Props = {
	sortTypes: SortType[];
	onChange: (sortType: SortType) => void;
};

type SortType = {
	sortType: string;
	displayName: string;
};

const Sort = (props: Props) => {
	const options: JSX.Element[] = props.sortTypes.map(
		(type): JSX.Element => {
			return (
				<option key={type.sortType} className="bg-gray-700">
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
						props.sortTypes.find(
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

export default Sort;
