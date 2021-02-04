import '@testing-library/jest-dom';

import * as React from 'react';
import { CsgoMatch, PlayerStatistics } from '../../../../../api/types';
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerSelector from '../PlayerSelector';
import { StateMock } from '@react-mock/state';

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

test('renders all names', () => {
	const match: CsgoMatch = createMatch();

	render(<PlayerSelector match={match} selectPlayer={() => {}} selectedPlayer={match.players[0]} />);
	expect(screen.queryByText('joo')).toBeInTheDocument();
});

test('change name highlight', () => {
	const match: CsgoMatch = createMatch();

	const selectPlayer = jest.fn();
	const { getByText } = render(
		<PlayerSelector match={match} selectPlayer={selectPlayer} selectedPlayer={match.players[0]} />,
	);
	fireEvent.click(getByText(/other player/i));
	expect(selectPlayer).toHaveBeenCalled();
});

test('do not crash even if players are undefined or null', () => {
	const match: CsgoMatch = createMatch();
	match.players = undefined;

	render(<PlayerSelector match={match} selectPlayer={() => {}} selectedPlayer={undefined} />);
	expect(screen.queryByText(`ERROR: This match doens't have players!`)).toBeInTheDocument();
});
