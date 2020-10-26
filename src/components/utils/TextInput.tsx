import * as React from 'react';

type Props = {
	title: string;
	value: string;
	onChange: (str: string) => void;
};

const TextInput = (props: Props) => {
	return (
		<div className="flex flex-col my-2">
			<span className="text-lg text-gray-100">{props.title}</span>
			<input
				className="bg-transparent border-b-2 border-gray-500 text-gray-100 pt-2"
				value={props.value}
				onChange={(evt) => props.onChange(evt.target.value)}
			/>
		</div>
	);
};

export default TextInput;
