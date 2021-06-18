import * as React from 'react';
import More from '../../../../assets/more.svg';

const { useState } = React;

type Props = {
	actions: MoreAction[];
};

import { MoreAction } from './types';
const MoreActions = (props: Props) => {
	const [actionsOpen, setActionsOpen] = useState<boolean>(false);

	const renderActions = () => {
		if (!actionsOpen) {
			return null;
		}

		return (
			<div className="z-50 absolute bg-gray-700 shadow-ms flex flex-col rounded">
				{props.actions.map((action, index) => {
					return (
						<span
							key={index}
							className="cursor-pointer m-2 text-gray-200 border-b-2 border-gray-800"
							onClick={action.onClick}
						>
							{action.text}
						</span>
					);
				})}
			</div>
		);
	};

	const toggleActions = () => {
		setActionsOpen(!actionsOpen);
	};

	return (
		<div>
			<img onClick={toggleActions} src={More} className="w-6 h-6 cursor-pointer" />
			{actionsOpen && (
				<div className="absolute z-0 left-0 top-0 w-full h-full" onClick={() => setActionsOpen(false)}></div>
			)}
			{renderActions()}
		</div>
	);
};

export default MoreActions;
