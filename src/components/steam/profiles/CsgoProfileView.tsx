import * as React from 'react';
import { fetchCsgoProfile } from '../../../api/api';
import { CsgoProfile, SteamRouteResponse } from '../../../api/types';
import CsgoProfileOverview from './CsgoProfileOverview';

const { useState, useEffect } = React;

type Props = {
	steamId: string;
};

const CsgoProfileView = (props: Props) => {
	const [csgoProfile, setCsgoProfile] = useState<CsgoProfile>(undefined);

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

	return <CsgoProfileOverview csgoProfile={csgoProfile} />;
};

export default CsgoProfileView;
