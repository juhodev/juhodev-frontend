import * as React from 'react';

type Props = {
	title: string;
	subText: string;
	truncate?: boolean;
	link?: boolean;
};

const Text = (props: Props) => {
	let subTextClass: string;

	if (props.truncate) {
		subTextClass =
			'text-gray-100 text-lg whitespace-no-wrap w-64 overflow-hidden truncate';
	} else {
		subTextClass = 'text-gray-100 text-lg';
	}

	return (
		<div className="pb-4 pr-4 flex flex-col">
			<span className="text-gray-500 text-base leading-none">
				{props.title}
			</span>
			<span className={subTextClass}>
				{props.link ? (
					<a href={props.subText}>{props.subText}</a>
				) : (
					<span>{props.subText}</span>
				)}
			</span>
		</div>
	);
};

export default Text;
