import * as React from 'react';

type Props = {
	title: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const ToggleButton = (props: Props) => {
	return (
		<div className="flex flex-row justify-between items-center">
			<span className="text-lg">{props.title}</span>
			<input type="checkbox" checked={props.checked} onChange={(e) => props.onChange(!props.checked)} />
		</div>
	);
};

export default ToggleButton;
