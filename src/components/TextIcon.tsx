import * as React from 'react';

type Props = {
	src: string;
	text: string;
};

const TextIcon = (props: Props) => {
	return (
		<div className="flex flex-row mr-2">
			<img src={props.src} className="w-6 h-6" />
			<span className="mx-2">{props.text}</span>
		</div>
	);
};

export default TextIcon;
