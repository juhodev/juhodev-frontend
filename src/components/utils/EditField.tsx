import * as React from 'react';

type Props = {
	title: string;
	value: string;
	onChange: (value: string) => void;
}

const EditField = (props: Props) => {
	return (
		<div className="flex flex-col">
			<span className="text-gray-200 text-lg">{props.title}</span>
			<input className="text-gray-200 rounded p-1 bg-gray-700" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
		</div>
	);
};

export default EditField;
