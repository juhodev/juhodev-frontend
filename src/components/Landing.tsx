import * as React from 'react';
import { getToken } from '../api/api';

const { useState } = React;

const Landing = () => {
	const [password, setPassword] = useState('');

	if (localStorage.getItem('jwt') !== null) {
		window.location.href = `${window.location.origin}/home`;
		return;
	}

	const sendPassword = async () => {
		const token = await getToken(password);

		if (token !== undefined) {
			localStorage.setItem('jwt', token);
			window.location.href = `${window.location.origin}/home`;
		} else {
			window.alert('Wrong password');
		}
	};

	return (
		<div className="flex w-full h-full justify-center items-center">
			<input
				className="bg-transparent border-b-2 border-discord mr-4 w-80 py-2 text-gray-100"
				type="password"
				value={password}
				onChange={(evt) => setPassword(evt.target.value)}
			/>
			<button
				className="bg-discord px-8 py-2 rounded text-gray-200"
				onClick={() => sendPassword()}
			>
				Log in
			</button>
		</div>
	);
};

export default Landing;
