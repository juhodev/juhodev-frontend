import * as React from 'react';
import { Hoi4Save } from '../../api/types';

type Props = {
	game: Hoi4Save;
};

const Hoi4GameInfo = (props: Props) => {
	const modComponents: React.ReactNode[] = props.game.mods.map((mod) => (
		<span className="text-sm text-gray-500">{mod}</span>
	));

	return (
		<div className="flex flex-col rounded-b-lg bg-gray-800 p-4">
			<div className="flex flex-col lg:flex-row lg:items-end">
				<div className="flex-1 flex items-center">
					<div className="mx-4 flex flex-col">
						<span className="text-3xl text-gray-100 leading-none">
							{props.game.date}
						</span>
						<div className="">{modComponents}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hoi4GameInfo;
