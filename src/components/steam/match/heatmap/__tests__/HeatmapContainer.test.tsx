import { CsgoMatch, PlayerStatistics } from '../../../../../api/types';
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeatmapContainer from '../HeatmapContainer';

const createMatch = (): CsgoMatch => {
	const firstSelected: PlayerStatistics = {
		assists: 0,
		deaths: 0,
		hsp: 0,
		kills: 0,
		mvps: 0,
		ping: 0,
		player: { avatarLink: '', id: '123', name: 'joo', steamLink: '' },
		score: 0,
		side: 'T',
		unnecessaryStats: undefined,
	};

	const secondSelected: PlayerStatistics = {
		assists: 0,
		deaths: 0,
		hsp: 0,
		kills: 0,
		mvps: 0,
		ping: 0,
		player: { avatarLink: '', id: '666', name: 'other player', steamLink: '' },
		score: 0,
		side: 'T',
		unnecessaryStats: undefined,
	};

	const match: CsgoMatch = {
		ctRounds: 0,
		date: 0,
		map: 'Dust',
		matchDuration: 0,
		players: [firstSelected, secondSelected],
		tRounds: 0,
		waitTime: 0,
		winner: 'T',
	};

	return match;
};

test('clicking player name changes selected player', () => {
	const match: CsgoMatch = createMatch();

	const { getByText } = render(<HeatmapContainer match={match} />);
	expect(screen.queryByText('joo')).toHaveClass('text-blue-500');
	expect(screen.queryByText('other player')).toHaveClass('text-gray-200');
	fireEvent.click(getByText('other player'));
	expect(screen.queryByText('other player')).toHaveClass('text-blue-500');
	expect(screen.queryByText('joo')).toHaveClass('text-gray-200');
});
