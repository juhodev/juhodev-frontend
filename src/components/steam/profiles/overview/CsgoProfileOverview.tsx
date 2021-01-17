import * as React from 'react';
import { CsgoProfile, GameWithStats } from '../../../../api/types';
import CsgoKDA from './CsgoKDA';
import CsgoMapHistory from './CsgoMapHistory';
import CsgoUserInfo from './CsgoUserInfo';
import MapFrequency from './MatchFrequency';
import QuickStats from './QuickStats';

type Props = {
	csgoProfile: CsgoProfile;
};

const CsgoProfileOverview = (props: Props) => {
	const { csgoProfile } = props;

	const totalGamesPlayed: number = csgoProfile.mapStatistics.maps
		.map((x) => x.timesPlayed)
		.reduce((prev, curr) => (prev += curr));

	return (
		<div className="flex flex-col w-full">
			<CsgoUserInfo csgoProfile={csgoProfile} />
			<div className="flex xl:flex-row flex-col">
				<MapFrequency mapFrequency={csgoProfile.dateMatches} />
				<CsgoKDA
					kills={csgoProfile.gameAverages.kills.value}
					deaths={csgoProfile.gameAverages.deaths.value}
					assists={csgoProfile.gameAverages.assists.value}
					killDeathRatio={(
						csgoProfile.gameAverages.kills.value /
						csgoProfile.gameAverages.deaths.value
					).toPrecision(3)}
				/>
			</div>
			<div className="mx-0 xl:mx-4 flex flex-col xl:flex-row">
				<QuickStats
					total={totalGamesPlayed}
					won={csgoProfile.won}
					lost={csgoProfile.lost}
					tied={csgoProfile.tied}
					winLossRation={(
						csgoProfile.won / csgoProfile.lost
					).toPrecision(3)}
				/>
				<CsgoMapHistory mapStatistics={csgoProfile.mapStatistics} />
			</div>
		</div>
	);
};

export default CsgoProfileOverview;
