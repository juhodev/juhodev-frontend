import * as React from 'react';
import { getPreviewToken, getToken } from '../api/api';

const { useState } = React;

const Landing = () => {
	const [password, setPassword] = useState('');

	if (localStorage.getItem('jwt') !== null) {
		window.location.href = `${window.location.origin}/home`;
		return;
	}

	const sendPassword = async () => {
		const token: string = await getToken(password);

		if (token !== undefined) {
			const searchParams: URLSearchParams = new URLSearchParams(
				window.location.search,
			);
			const from: string = searchParams.get('from');

			localStorage.setItem('jwt', token);
			window.location.href = `${window.location.origin}/${from}`;
		} else {
			window.alert('Wrong password');
		}
	};

	const fetchPreviewToken = async () => {
		const token: string = await getPreviewToken();

		if (token !== undefined) {
			const searchParams: URLSearchParams = new URLSearchParams(
				window.location.search,
			);
			const from: string = searchParams.get('from');

			localStorage.setItem('jwt', token);
			window.location.href = `${window.location.origin}/${from}`;
		} else {
			window.alert('Something went wrong');
		}
	};

	return (
		<div className="flex h-full justify-center items-center flex-col">
			<div className="flex flex-col my-4">
				<button
					className="bg-discord px-8 py-2 rounded text-gray-200 my-2"
					onClick={() => fetchPreviewToken()}
				>
					Preview
				</button>
				<span className="text-gray-200 text-center">Or</span>
			</div>
			<div className="flex flex-row">
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
		</div>
	);
};

export default Landing;
