import * as React from 'react';
import '@testing-library/jest-dom';
import { PlayerStatistics } from '../../../../../api/types';
import { render, screen } from '@testing-library/react';
import PlayerRow from '../PlayerRow';

test('should render dark background for even index', () => {
	const player: PlayerStatistics = {
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
		score: 0,
		side: 'T',
		unnecessaryStats: undefined,
	};

	const table = document.createElement('tbody');
	const { container } = render(<PlayerRow player={player} playerIndex={0} />, {
		container: document.body.appendChild(table),
	});
	expect(container.querySelector('tr')).toHaveClass('bg-gray-800');
});

test('should render transparent background for odd index', () => {
	const player: PlayerStatistics = {
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
		score: 0,
		side: 'T',
		unnecessaryStats: undefined,
	};

	const table = document.createElement('tbody');
	const { container } = render(<PlayerRow player={player} playerIndex={1} />, {
		container: document.body.appendChild(table),
	});
	expect(container.querySelector('tr')).toHaveClass('bg-transparent');
});
