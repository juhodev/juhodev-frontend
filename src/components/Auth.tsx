import * as React from 'react';
import { sendUserCode } from '../api/api';
import { CodeResponse } from '../api/types';

const { useEffect, useState } = React;

const Auth = () => {
	const [hasNewToken, setHasNewToken] = useState(false);

	const sendUserCodeToBackend = async () => {
		const searchParams: URLSearchParams = new URLSearchParams(
			window.location.search,
		);

		const code: string = searchParams.get('code');
		const state: string = searchParams.get('state');

		const localState: string = localStorage.getItem('auth_state');
		if (localState !== state) {
			window.alert('State comparison failed!!');
			return;
		}

		if (code !== null) {
			const response: CodeResponse = await sendUserCode(code);
			if (response.jwt !== undefined) {
				localStorage.setItem('jwt', response.jwt);
				setHasNewToken(true);

				setTimeout(() => {
					window.location.replace('/home');
				}, 3000);
			}
		} else {
			console.log('code not found');
		}
	};

	useEffect(() => {
		sendUserCodeToBackend();
	}, []);

	if (hasNewToken) {
		return (
			<span className="text-5xl text-center text-gray-100">
				You will be redirected in a moment
			</span>
		);
	} else {
		return (
			<span className="text-5xl text-center text-gray-100">
				Authenticating
			</span>
		);
	}
};

export default Auth;
