import * as React from 'react';
import { fetchCsgoUploadCode } from '../../api/api';
import { SteamUploadCodeResponse } from '../../api/types';

const { useState, useEffect } = React;

const SteamUploadCode = () => {
	const [code, setCode] = useState<string>('########');

	const getUploadCode = async () => {
		const response: SteamUploadCodeResponse = await fetchCsgoUploadCode();
		setCode(response.uploadCode);
	};

	useEffect(() => {
		getUploadCode();
	}, []);

	return (
		<div className="flex flex-col border-solid border-2 border-gray-800 xl:m-4 m-2 xl:p-4 p-2">
			<span className="text-gray-500 text-sm">Upload code</span>
			<div className="flex flex-row">
				<span className="text-gray-500 text-xl mr-1">
					Your upload code is
				</span>
				<span className="text-gray-100 text-xl">{code}</span>
			</div>
			<span className="text-sm text-gray-500">
				You can upload CSGO games with your upload code. Ask zoo for
				more details.
			</span>
		</div>
	);
};

export default SteamUploadCode;
