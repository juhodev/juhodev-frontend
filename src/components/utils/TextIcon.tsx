import * as React from 'react';

type Props = {
	src: string;
	text: string;
	truncate?: boolean;
	link?: boolean;
};

const TextIcon = (props: Props) => {
	let textClass: string;

	if (props.truncate) {
		textClass = 'mx-2 whitespace-no-wrap w-64 overflow-hidden truncate';
	} else {
		textClass = 'mx-2';
	}

	return (
		<div className="flex flex-row mr-2">
			<img src={props.src} className="w-6 h-6" />
			<span className={textClass}>
				{props.link ? (
					<a href={props.text}>{props.text}</a>
				) : (
					<span>{props.text}</span>
				)}
			</span>
		</div>
	);
};

export default TextIcon;
