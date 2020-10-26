import {
	ClipsRouteResponse,
	CodeResponse,
	ImageRouteResponse,
	UserRouteResponse,
} from './types';

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
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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

export async function fetchImages(): Promise<ImageRouteResponse> {
	const response = await fetch(`${getURL()}/api/images`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchClips(): Promise<ClipsRouteResponse> {
	const response = await fetch(`${getURL()}/api/clips`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function sendImage(
	name: string,
	link: string,
): Promise<ImageRouteResponse> {
	const response = await fetch(`${getURL()}/api/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
		body: JSON.stringify({ name, link }),
	});

	return response.json();
}

function getURL() {
	const { hostname } = window.location;

	if (hostname === 'localhost') {
		return 'http://localhost:8080';
	}

	return window.location.origin;
}
