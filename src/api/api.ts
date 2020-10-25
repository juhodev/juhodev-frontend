import { CodeResponse, UserRouteResponse } from './types';

export async function fetchUserData(): Promise<UserRouteResponse> {
	const response = await fetch(`${getURL()}/api/user`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function sendUserCode(code: string): Promise<CodeResponse> {
	const response = await fetch(`${getURL()}/api/auth/code`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	});
	const json = await response.json();
	return json as CodeResponse;
}

export async function getToken(password: string): Promise<string> {
	const response = await fetch(`${getURL()}/api/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password }),
	});
	const json = await response.json();

	return json['token'];
}

function getURL() {
	return window.location.origin;
}
