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
			'text-gray-100 text-lg whitespace-nowrap w-64 overflow-hidden truncate';
	} else {
		subTextClass = 'text-gray-100 text-lg';
	}

	return (
		<div className="xl:pb-4 xl:pr-4 mr-2 flex flex-col justify-center xl:justify-start">
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
