import {
	ClipsRouteResponse,
	CodeResponse,
	ImageRouteResponse,
	ProfileRouteResponse,
	SteamMatchResponse,
	SteamRouteResponse,
	SteamSearchResponse,
	UserRouteResponse,
	SteamUploadCodeResponse,
	SteamGamesResponse,
	SteamUserResponse,
	SteamLeaderboardResponse,
	SteamStatisticsResponse,
	SteamLinkResponse,
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

export async function getPreviewToken(): Promise<string> {
	const response = await fetch(`${getURL()}/api/auth/preview`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
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

export async function fetchImage(image: string): Promise<ImageRouteResponse> {
	const response = await fetch(`${getURL()}/api/images/${image}`, {
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

export async function fetchClip(clip: string): Promise<ClipsRouteResponse> {
	const response = await fetch(`${getURL()}/api/clips/${clip}`, {
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

export async function fetchProfile(
	snowflake: string,
): Promise<ProfileRouteResponse> {
	let url: string;
	if (snowflake === null) {
		url = `${getURL()}/api/profile`;
	} else {
		url = `${getURL()}/api/profile/${snowflake}`;
	}

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});

	return response.json();
}

export async function fetchCsgoProfile(
	id: string,
): Promise<SteamRouteResponse> {
	const response = await fetch(`${getURL()}/api/steam/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchSearch(q: string): Promise<SteamSearchResponse> {
	const response = await fetch(`${getURL()}/api/steam/search?q=${q}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchCsgoMatch(
	matchId: number,
): Promise<SteamMatchResponse> {
	const response = await fetch(`${getURL()}/api/steam/match?id=${matchId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchCsgoUploadCode(): Promise<SteamUploadCodeResponse> {
	const response = await fetch(`${getURL()}/api/steam/uploadCode`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchCsgoMatchesForUser(
	id: string,
	page: number,
): Promise<SteamGamesResponse> {
	const response = await fetch(
		`${getURL()}/api/steam/games?id=${id}&page=${page}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
		},
	);
	return response.json();
}

export async function fetchCsgoUser(id: string): Promise<SteamUserResponse> {
	const response = await fetch(`${getURL()}/api/steam/user?id=${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchCsgoLeaderboard(): Promise<SteamLeaderboardResponse> {
	const response = await fetch(`${getURL()}/api/steam/leaderboard`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchBuiltCsgoProfiles(): Promise<SteamLeaderboardResponse> {
	const response = await fetch(`${getURL()}/api/steam/profiles`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export async function fetchCsgoStatistics(
	playerId: string,
	type: string,
	soloQueue: boolean,
): Promise<SteamStatisticsResponse> {
	const response = await fetch(
		`${getURL()}/api/steam/statistics?playerId=${playerId}&type=${type}&soloQueue=${soloQueue}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
		},
	);
	return response.json();
}

export async function linkSteamAccount(
	profileLink: string,
	authCode: string,
	sharingCode: string,
): Promise<SteamLinkResponse> {
	const response = await fetch(`${getURL()}/api/steam/link`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			profile: profileLink,
			authenticationCode: authCode,
			knownCode: sharingCode,
		}),
	});

	return response.json();
}

export async function fetchDemoWorkerStatus() {
	const response = await fetch(`${getURL()}/api/demoworker/status`);
	return response.json();
}

export function getURL() {
	const { port } = window.location;

	if (port === '8888') {
		const localApi: string = `http://${window.location.hostname}:8080`;
		return localApi;
	}

	return window.location.origin;
}
