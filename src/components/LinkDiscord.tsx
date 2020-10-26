import * as React from 'react';
import { startAuthFlow } from '../ts/auth';

const LinkDiscord = () => {
	return (
		<div className="flex flex-col border-solid border-2 border-gray-800 w-1/3 p-4 m-4 h-3/4">
			<button
				className="bg-discord px-8 py-2 rounded text-gray-200"
				onClick={() => {
					startAuthFlow();
				}}
			>
				Link your Discord account
			</button>
		</div>
	);
};

export default LinkDiscord;
