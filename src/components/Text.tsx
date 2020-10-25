import * as React from 'react';

type Props = { title: string; subText: string };

const Text = (props: Props) => {
	return (
		<div className="pb-4 flex flex-col">
			<span className="text-gray-500 text-base leading-none">{props.title}</span>
			<span className="text-gray-100 text-lg">{props.subText}</span>
		</div>
	);
};

export default Text;
