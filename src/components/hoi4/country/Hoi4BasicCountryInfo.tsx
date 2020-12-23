import * as React from 'react';
import { Country, PoliticalParty } from '../../../api/types';

type Props = {
	country: Country;
};

const Hoi4BasicCountryInfo = (props: Props) => {
	const rulingParty: PoliticalParty = props.country.politics.parties.find(
		(party) => party.type === props.country.politics.rulingParty,
	);

	return (
		<div className="flex flex-col rounded bg-gray-800 m-4 transition duration-150 ease-in-out hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 cursor-pointer">
			<div className="flex w-full h-48 items-center justify-center overflow-hidden">
				<img src="http://via.placeholder.com/1000x1000" />
			</div>
			<div className="p-2 flex flex-col">
				<span className="text-3xl text-blue-500 font-bold">
					{props.country.name}
				</span>
				<span className="text-md text-gray-500 leading-none">
					Stability
				</span>
				<span className="text-lg text-gray-200">
					{props.country.stability}
				</span>
				<span className="text-md text-gray-500 leading-none">
					Country leader
				</span>
				<span className="text-lg text-gray-200">
					{rulingParty.countryLeaders[0].name}
				</span>
			</div>
		</div>
	);
};

export default Hoi4BasicCountryInfo;
