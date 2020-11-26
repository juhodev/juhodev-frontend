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
		textClass = 'lg:mx-2 mx-1 whitespace-nowrap lg:w-64 md:w-48 w-32 overflow-hidden truncate lg:text-xl md:text-md text-sm';
	} else {
		textClass = 'lg:mx-2 mx-1 lg:text-xl md:text-md text-sm';
	}

	return (
		<div className="flex flex-row xl:mr-2 mr-0 items-center">
			<img src={props.src} className="lg:w-6 lg:h-6 md:w-5 md:h-5 w-4 h-4" />
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
