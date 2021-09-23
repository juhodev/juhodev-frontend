import * as React from 'react';

type Props = {
	text: string;
	onClick: () => void;
};

const Button = (props: Props) => {
	return (
		<button className="p-2 bg-blue-600 w-32 rounded text-lg" onClick={props.onClick}>
			{props.text}
		</button>
	);
};

export default Button;
