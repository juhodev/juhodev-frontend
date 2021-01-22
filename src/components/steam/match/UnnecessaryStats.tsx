import * as React from 'react';
import { CsgoMatch, CsgoPlayer } from '../../../api/types';
import StatHighlight from '../profiles/StatHighlight';

type Props = {
	match: CsgoMatch;
};

type PlayerHighlight = {
	type: string;
	count: number;
	player: CsgoPlayer;
};

const HighlightDisplayName = {
	kills: 'Most kills',
	deaths: 'Most deaths',
	assists: 'Most assists',
	mvps: 'Most MVPs',
	score: 'Most score',
	jumps: 'Most jumps',
	bombPlants: 'Most bomb plants',
	reloads: 'Most reloads',
	footsteps: 'Most footsteps',
	blind: 'Most seconds blind',
};

const UnnecessaryStats = (props: Props) => {
	const standardStats: string[] = [
		'kills',
		'deaths',
		'assists',
		'mvps',
		'score',
	];
	const unnecessaryStats: string[] = [
		'jumps',
		'bombPlants',
		'reloads',
		'footsteps',
	];

	const highest: PlayerHighlight[] = [];

	for (const stat of standardStats) {
		let most: PlayerHighlight = undefined;

		for (const player of props.match.players) {
			if (most === undefined || player[stat] > most.player[stat]) {
				most = { type: stat, count: player[stat], player };
			}
		}

		highest.push(most);
	}

	if (props.match.players[0].unnecessaryStats !== undefined) {
		for (const stat of unnecessaryStats) {
			let most: PlayerHighlight = undefined;
			for (const player of props.match.players) {
				if (
					most === undefined ||
					player['unnecessaryStats'][stat] >
						most.player['unnecessaryStats'][stat]
				) {
					most = {
						type: stat,
						count: player.unnecessaryStats[stat],
						player,
					};
				}
			}

			highest.push(most);
		}

		let most: PlayerHighlight = undefined;
		for (const player of props.match.players) {
			if (
				most === undefined ||
				player.unnecessaryStats.blind.duration >
					player.unnecessaryStats.blind.duration
			) {
				most = {
					type: 'blind',
					count: Math.round(player.unnecessaryStats.blind.duration),
					player,
				};
			}
		}

		highest.push(most);
	}

	return (
		<div className="mt-4 grid xl:grid-cols-4 lg:grid-cols-3 gap-2">
			{highest.map((highlight) => (
				<StatHighlight
					text={HighlightDisplayName[highlight.type]}
					profile={highlight.player}
					count={highlight.count}
				/>
			))}
		</div>
	);
};

export default UnnecessaryStats;
