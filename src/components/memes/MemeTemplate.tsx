import * as React from 'react';
import MemeCanvas from './MemeCanvas';
import TextInput from '../utils/TextInput';

const MemeTemplate = () => {
	return (
		<div className="flex flex-row w-full justify-center">
			<MemeCanvas
				templateImage="https://cdn.discordapp.com/attachments/145653278414340096/854444177449025597/SBzeEzn.png"
				onClick={(x, y) => {
					console.log('clicked at', x, y);
				}}
			/>
			<div className="flex flex-col bg-gray-800 rounded p-2 ml-12">
				<div className="">
					<button className="bg-blue-500 px-6 py-1 rounded text-gray-200">Save</button>
					<button className="bg-blue-500 px-6 py-1 rounded text-gray-200 ml-8">Close</button>
				</div>
				<TextInput title="Source" value="" onChange={() => {}} />
			</div>
		</div>
	);
};

export default MemeTemplate;
