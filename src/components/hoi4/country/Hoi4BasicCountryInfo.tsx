import * as React from 'react';
import { Country } from '../../../api/types';

type Props = {
	country: Country;
};

const Hoi4BasicCountryInfo = (props: Props) => {
	return (
		<div className="flex flex-col rounded bg-gray-800 m-4 transition duration-150 ease-in-out hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 cursor-pointer">
			<div className="flex w-full h-48 items-center justify-center overflow-hidden">
				<img src="http://via.placeholder.com/1000x1000" />
			</div>
			<div className="p-2 flex flex-col">
				<span className="text-3xl text-blue-500 font-bold leading-none">
					{props.country.name}
				</span>
				<span className="text-md text-gray-500">{props.country.politics.rulingParty}</span>
				<span className="text-xl text-gray-200">{`Stability ${props.country.stability}`}</span>
			</div>
		</div>
	);
};

export default Hoi4BasicCountryInfo;
