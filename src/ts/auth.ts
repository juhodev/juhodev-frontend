import { makeid } from './utils';

const DISCORD_CLIENT_ID = '764492992949780520';

export const startAuthFlow = () => {
	const randomState: string = makeid(12);
	localStorage.setItem('auth_state', randomState);

	let redirectUrl: string;

	if (window.location.origin === 'http://localhost:8080') {
		redirectUrl = 'http%3A%2F%2Flocalhost%3A8888%2Fauth';
	} else {
		redirectUrl = 'https%3A%2F%2Fjuho.dev%2Fauth';
	}

	const discordUrl: string = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&scope=identify&state=${randomState}&redirect_uri=${redirectUrl}&prompt=consent`;
	window.location.href = discordUrl;
};
