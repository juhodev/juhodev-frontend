import * as React from 'react';
import { CsgoProfile } from '../../../../api/types';
import { formatSeconds } from '../../../../ts/timeUtils';
import StatsSection from './StatsSection';

type Props = {
	csgoProfile: CsgoProfile;
};

const DetailedStats = (props: Props) => {
	const { csgoProfile } = props;

	return (
		<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
			<StatsSection
				name="Kills / Assists / Deaths"
				data={[
					{
						name: 'Kills',
						average: Math.round(
							csgoProfile.gameAverages.kills.value,
						).toString(),
						highest: csgoProfile.gameHighest.kills.value.toString(),
						highestMatchId: csgoProfile.gameHighest.kills.matchId,
						standardDeviation:
							csgoProfile.gameAverages.kills.standardDeviation,
						standardError:
							csgoProfile.gameAverages.kills.standardError,
					},
					{
						name: 'Assists',
						average: Math.round(
							csgoProfile.gameAverages.assists.value,
						).toString(),
						highest: csgoProfile.gameHighest.assists.value.toString(),
						highestMatchId: csgoProfile.gameHighest.assists.matchId,
						standardDeviation:
							csgoProfile.gameAverages.assists.standardDeviation,
						standardError:
							csgoProfile.gameAverages.assists.standardError,
					},
					{
						name: 'Deaths',
						average: Math.round(
							csgoProfile.gameAverages.deaths.value,
						).toString(),
						highest: csgoProfile.gameHighest.deaths.value.toString(),
						highestMatchId: csgoProfile.gameHighest.deaths.matchId,
						standardDeviation:
							csgoProfile.gameAverages.deaths.standardDeviation,
						standardError:
							csgoProfile.gameAverages.deaths.standardError,
					},
					{
						name: 'K/D ratio',
						average: (
							csgoProfile.gameAverages.kills.value /
							csgoProfile.gameAverages.deaths.value
						).toPrecision(3),
					},
				]}
				types={[
					{ type: 'kills', displayName: 'Kills' },
					{ type: 'deaths', displayName: 'Deaths' },
					{ type: 'assists', displayName: 'Assists' },
				]}
				playerId={csgoProfile.id}
			/>
			<StatsSection
				name="HS % / MVPs / Score / Ping"
				data={[
					{
						name: 'HS %',
						average: Math.round(
							csgoProfile.gameAverages.hsp.value,
						).toString(),
						highest: csgoProfile.gameHighest.hsp.value.toString(),
						highestMatchId: csgoProfile.gameHighest.hsp.matchId,
						standardDeviation:
							csgoProfile.gameAverages.hsp.standardDeviation,
						standardError:
							csgoProfile.gameAverages.hsp.standardError,
					},
					{
						name: 'MVPs',
						average: Math.round(
							csgoProfile.gameAverages.mvps.value,
						).toString(),
						highest: csgoProfile.gameHighest.mvps.value.toString(),
						highestMatchId: csgoProfile.gameHighest.mvps.matchId,
						standardDeviation:
							csgoProfile.gameAverages.mvps.standardDeviation,
						standardError:
							csgoProfile.gameAverages.mvps.standardError,
					},
					{
						name: 'Score',
						average: Math.round(
							csgoProfile.gameAverages.score.value,
						).toString(),
						highest: csgoProfile.gameHighest.score.value.toString(),
						highestMatchId: csgoProfile.gameHighest.score.matchId,
						standardDeviation:
							csgoProfile.gameAverages.score.standardDeviation,
						standardError:
							csgoProfile.gameAverages.score.standardError,
					},
					{
						name: 'Ping',
						average: Math.round(
							csgoProfile.gameAverages.ping.value,
						).toString(),
						highest: csgoProfile.gameHighest.ping.value.toString(),
						highestMatchId: csgoProfile.gameHighest.ping.matchId,
						standardDeviation:
							csgoProfile.gameAverages.ping.standardDeviation,
						standardError:
							csgoProfile.gameAverages.ping.standardError,
					},
				]}
				types={[
					{ type: 'hsp', displayName: 'HS %' },
					{ type: 'mvps', displayName: 'MVPs' },
					{ type: 'score', displayName: 'Score' },
					{ type: 'ping', displayName: 'Ping' },
				]}
				playerId={csgoProfile.id}
			/>
			<StatsSection
				name="Wait time / Match duration"
				data={[
					{
						name: 'Wait time',
						average: formatSeconds(
							csgoProfile.gameAverages.waitTime.value,
						),
						highest: formatSeconds(
							csgoProfile.gameHighest.waitTime.value,
						),
						highestMatchId:
							csgoProfile.gameHighest.waitTime.matchId,
					},
					{
						name: 'Match duration',
						average: formatSeconds(
							csgoProfile.gameAverages.matchDuration.value,
						),
						highest: formatSeconds(
							csgoProfile.gameHighest.matchDuration.value,
						),
						highestMatchId:
							csgoProfile.gameHighest.matchDuration.matchId,
					},
				]}
				playerId={csgoProfile.id}
			/>
		</div>
	);
};

export default DetailedStats;
