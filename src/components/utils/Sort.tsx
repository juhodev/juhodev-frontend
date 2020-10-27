import * as React from 'react';
import { SortType } from '../../ts/search';

import ArrowDown from '../../../assets/arrow_down.svg';

type Props = {
	onChange: (sortType: SortType) => void;
};

type BeautifiedSortType = {
	sortType: SortType;
	displayName: string;
};

const Sort = (props: Props) => {
	const sortTypes: BeautifiedSortType[] = [
		{
			displayName: 'Submission date',
			sortType: SortType.SUBMISSION_DATE,
		},
		{
			displayName: 'Name',
			sortType: SortType.NAME,
		},
		{
			displayName: 'Submission by',
			sortType: SortType.SUBMISSION_BY,
		},
		{
			displayName: 'Views',
			sortType: SortType.VIEWS,
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
		<div className="flex flex-row text-base items-center border-b-2 border-gray-500">
			<img src={ArrowDown} />
			<select
				id="sort-by-select"
				className="block pl-2 appearance-none bg-transparent border-none focus:outline-none text-gray-200"
				onChange={(e) =>
					props.onChange(
						sortTypes.find(
							(type) => type.displayName === e.target.value,
						).sortType,
					)
				}
			>
				{options}
			</select>
		</div>
	);
};

export default Sort;
