import * as React from 'react';
import ProjectCard from './ProjectCard';

import Discord from '../../assets/discord.svg';
import Steam from '../../assets/steam.svg';
import Todo from '../../assets/checkbox_checked.svg';

const Landing = () => {
	return (
		<div className="px-2 lg:px-1/5 grid grid-cols-1 lg:grid-cols-3 gap-2 xl:gap-12 h-full py-32">
			<ProjectCard name="Discord" link="/home" img={Discord} backgroundColor={'bg-discord'} />
			<ProjectCard name="Steam" link="/steam" img={Steam} />
			<ProjectCard name="Todo" link="/todo" img={Todo} />
		</div>
	);
};

export default Landing;
