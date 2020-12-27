import * as React from 'react';
import ProjectCard from './ProjectCard';

const Landing = () => {
	return (
		<div className="px-1/5 grid grid-cols-3 gap-12 h-full py-32">
			<ProjectCard name="Discord" link="/home" />
			<ProjectCard name="Steam" link="/steam" />
			<ProjectCard name="?" />
		</div>
	);
};

export default Landing;
