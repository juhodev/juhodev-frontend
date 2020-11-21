import { jwtDecode, makeid } from './utils';

const DISCORD_CLIENT_ID = '764492992949780520';

export const startAuthFlow = () => {
	const jwt: string = localStorage.getItem('jwt');

	if (jwt === null) {
		window.alert('Please log in with a password');
		return;
	}

	const decodedJWT: any = jwtDecode(jwt);
	if (decodedJWT['payload'].userType === 'PREVIEW_ONLY') {
		window.alert('Please log in with a password');
		return;
	}

	const randomState: string = makeid(12);
	localStorage.setItem('auth_state', randomState);

	let redirectUrl: string;

	if (window.location.hostname === 'localhost') {
		redirectUrl = 'http%3A%2F%2Flocalhost%3A8888%2Fauth';
	} else {
		redirectUrl = 'https%3A%2F%2Fjuho.dev%2Fauth';
	}

	const discordUrl: string = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&scope=identify&state=${randomState}&redirect_uri=${redirectUrl}&prompt=consent`;
	window.location.href = discordUrl;
};
