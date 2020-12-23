import * as React from 'react';
import { Hoi4SortType } from '../../ts/search';

import ArrowDown from '../../../assets/arrow_down.svg';

const { useState } = React;

type BeautifiedSortType = {
	sortType: Hoi4SortType;
	displayName: string;
};

type Props = {
	onSearchChange: (value: string) => void;
	onSortChange: (value: Hoi4SortType) => void;
};

const Hoi4Search = (props: Props) => {
	const [search, setSearch] = useState<string>('');

	const sortTypes: BeautifiedSortType[] = [
		{
			displayName: 'Name',
			sortType: Hoi4SortType.NAME,
		},
		{
			displayName: 'Stability',
			sortType: Hoi4SortType.STABILITY,
		},
	];

	const options: JSX.Element[] = sortTypes.map(
		(type): JSX.Element => {
			return (
				<option key={type.sortType} className="bg-gray-700">
					{type.displayName}
				</option>
			);
		},
	);

	return (
		<div className="mx-4 my-2 flex flex-row">
			<input
				className="w-2/3 p-1 rounded"
				value={search}
				onChange={(e) => {
					const value: string = e.target.value;

					setSearch(value);
					props.onSearchChange(value);
				}}
			/>
			<div className="flex flex-row text-base items-center border-b-2 border-gray-500 mx-4">
				<img src={ArrowDown} />
				<select
					id="sort-by-select"
					className="block pl-2 appearance-none bg-transparent border-none focus:outline-none text-gray-200"
					onChange={(e) =>
						props.onSortChange(
							sortTypes.find(
								(type) => type.displayName === e.target.value,
							).sortType,
						)
					}
				>
					{options}
				</select>
			</div>
		</div>
	);
};

export default Hoi4Search;
