import * as React from 'react';
import { fetchCsgoProfile } from '../../../api/api';
import { CsgoProfile, SteamRouteResponse } from '../../../api/types';
import CsgoProfileOverview from './overview/CsgoProfileOverview';
import CsgoProfileStats from './stats/CsgoProfileStats';

const { useState, useEffect } = React;

const CsgoProfileView = () => {
	const [csgoProfile, setCsgoProfile] = useState<CsgoProfile>(undefined);
	const [currentTab, setCurrentTab] = useState<string>('overview');

	useEffect(() => {
		const id: string = getSteamIdFromURL();
		fetchData(id);
	}, []);

	const getSteamIdFromURL = (): string => {
		const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
		const id: string = searchParams.get('id');
		if (id !== null) {
			return id;
		} else {
			window.alert(`The stema id isn't correct! (${id})`);
			return undefined;
		}
	};

	const fetchData = async (steamId: string) => {
		const response: SteamRouteResponse = await fetchCsgoProfile(steamId);
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

	const selectedClassName: string = 'text-lg text-gray-100 border-b-2 border-blue-500 font-bold cursor-pointer';
	const notSelectedClassName: string = 'text-lg text-gray-100 cursor-pointer';

	return (
		<div className="flex flex-row justify-center overflow-auto flex-1">
			<div className="2xl:w-2/3 xl:w-5/6 w-full">
				<div className="flex xl:flex-row flex-col">
					<div className="flex flex-col mr-6">
						<span
							className={currentTab === 'overview' ? selectedClassName : notSelectedClassName}
							onClick={() => setCurrentTab('overview')}
						>
							Overview
						</span>
						<span
							className={currentTab === 'detailed' ? selectedClassName : notSelectedClassName}
							onClick={() => setCurrentTab('detailed')}
						>
							Detailed
						</span>
					</div>
					{currentComponent}
				</div>
			</div>
		</div>
	);
};

export default CsgoProfileView;
