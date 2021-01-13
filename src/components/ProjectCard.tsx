import * as React from 'react';

type Props = {
	name: string;
	img?: string;
	link?: string;
	backgroundColor?: string;
};

const ProjectCard = (props: Props) => {
	let background: string;
	if (props.backgroundColor !== undefined) {
		background = props.backgroundColor;
	} else {
		background = 'bg-gray-700';
	}

	const className: string = `flex flex-col h-full ${background} rounded-xl transition duration-150 ease-in-out hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 hover:bg-opacity-50`;

	return (
		<a
			href={props.link !== undefined ? props.link : '#'}
			className={className}
		>
			{props.img !== undefined && (
				<div className="mt-8 flex justify-center items-center">
					<img className="w-24 h-24" src={props.img} />
				</div>
			)}
			<span className="text-gray-200 text-3xl text-center mt-24">
				{props.name}
			</span>
		</a>
	);
};

export default ProjectCard;
