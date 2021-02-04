import * as React from 'react';
import '@testing-library/jest-dom';
import { PlayerStatistics } from '../../../../../api/types';

import { fireEvent, render, screen } from '@testing-library/react';
import Scoreboard, { SortType } from '../Scoreboard';

const createTerroristTeam = (): PlayerStatistics[] => {
	return [
		{
			assists: 0,
			deaths: 0,
			hsp: 0,
			kills: 0,
			mvps: 0,
			ping: 0,
			player: {
				avatarLink: '',
				id: '123',
				name: 'joo',
				steamLink: '',
			},
			score: 10,
			side: 'T',
			unnecessaryStats: undefined,
		},
		{
			assists: 0,
			deaths: 0,
			hsp: 0,
			kills: 10,
			mvps: 0,
			ping: 0,
			player: {
				avatarLink: '',
				id: '666',
				name: 'other player',
				steamLink: '',
			},
			score: 0,
			side: 'T',
			unnecessaryStats: undefined,
		},
	];
};

const renderScoreboard = () =>
	render(
		<Scoreboard
			terroristTeam={createTerroristTeam()}
			terroristRounds={16}
			counterTerroristTeam={[]}
			counterTerroristRounds={5}
		/>,
	);

test('by default sort players by score', () => {
	const { container } = renderScoreboard();

	// The child at index 2 is the first player. The first two are the info fields and the next is the team score.
	const firstPlayerName: string = container.querySelector('tbody').children[2].children[0].textContent;
	expect(firstPlayerName).toBe('joo');
});

test('change to sorting by kills', () => {
	const { container } = renderScoreboard();
	const dropdown = container.querySelector('select');
	fireEvent.change(dropdown, {
		target: { value: 'Kills' },
	});

	const firstPlayerName: string = container.querySelector('tbody').children[2].children[0].textContent;
	expect(firstPlayerName).toBe('other player');
});
