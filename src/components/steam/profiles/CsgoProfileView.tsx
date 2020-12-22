import * as React from 'react';
import { fetchCsgoProfile } from '../../../api/api';
import { CsgoProfile, SteamRouteResponse } from '../../../api/types';
import CsgoProfileOverview from './overview/CsgoProfileOverview';
import CsgoProfileStats from './stats/CsgoProfileStats';

const { useState, useEffect } = React;

type Props = {
	steamId: string;
};

const CsgoProfileView = (props: Props) => {
	const [csgoProfile, setCsgoProfile] = useState<CsgoProfile>(undefined);
	const [currentTab, setCurrentTab] = useState<string>('overview');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response: SteamRouteResponse = await fetchCsgoProfile(
			props.steamId,
		);

		setCsgoProfile(response.csgoProfile);
	};

	if (csgoProfile === undefined) {
		return <h1>Loading</h1>;
	}

	const currentComponent: React.ReactNode =
		currentTab === 'overview' ? (
			<CsgoProfileOverview csgoProfile={csgoProfile} />
		) : (
			<CsgoProfileStats csgoProfile={csgoProfile} />
		);

	const selectedClassName: string =
		'text-lg text-gray-100 border-b-2 border-blue-500 font-bold cursor-pointer';
	const notSelectedClassName: string = 'text-lg text-gray-100 cursor-pointer';

	return (
		<div className="flex flex-row">
			<div className="flex flex-col mr-6">
				<span
					className={
						currentTab === 'overview'
							? selectedClassName
							: notSelectedClassName
					}
					onClick={() => setCurrentTab('overview')}
				>
					Overview
				</span>
				<span
					className={
						currentTab === 'detailed'
							? selectedClassName
							: notSelectedClassName
					}
					onClick={() => setCurrentTab('detailed')}
				>
					Detailed
				</span>
			</div>
			{currentComponent}
		</div>
	);
};

export default CsgoProfileView;
