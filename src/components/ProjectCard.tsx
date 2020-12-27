import * as React from 'react';

type Props = {
	name: string;
	link?: string;
};

const ProjectCard = (props: Props) => {
	return (
		<a
			href={props.link !== undefined ? props.link : '#'}
			className="flex flex-col h-full bg-gray-700 rounded-xl transition duration-150 ease-in-out hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-800"
		>
			<span className="text-gray-200 text-3xl text-center mt-24">{props.name}</span>
		</a>
	);
};

export default ProjectCard;
