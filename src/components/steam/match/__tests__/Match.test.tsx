import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Match from '../Match';
import { SteamMatchResponse } from '../../../../api/types';
import * as fetch from 'node-fetch';

const mockResponse: SteamMatchResponse = {
	error: false,
	csgoMatch: {
		date: 0,
		players: [
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
		],
		map: 'Mirage',
		matchDuration: 120,
		waitTime: 0,
		ctRounds: 10,
		tRounds: 16,
		winner: 'T',
	},
};

const handlers = [
	rest.get('http://localhost:8080/api/steam/match', (req, res, ctx) => {
		const id = req.url.searchParams.get('id');
		if (id === '1') {
			return res(ctx.json(mockResponse));
		} else {
			return res(ctx.json({ error: false }));
		}
	}),
];

const server = setupServer(...handlers);

beforeAll(() => {
	//@ts-ignore
	global.fetch = fetch;
	server.listen();
});
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

const setSearch = (matchId: number) => {
	delete window.location;
	//@ts-ignore
	window.location = new URL(`http://localhost:8080?id=${matchId}`);
};

test('loads match', async () => {
	setSearch(1);

	render(<Match />);
	await waitFor(() => screen.getByText('Mirage'));

	expect(screen.findByText('joo')).toBeDefined();
});

test('render an error message if the game is undefined', async () => {
	setSearch(123);

	render(<Match />);
	await waitFor(() => screen.getByText('Game not found!'));

	expect(screen.findByText('Game not found!')).toBeDefined();
});
