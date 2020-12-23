import * as React from 'react';
import { Hoi4Save } from '../../api/types';
import Hoi4GameInfo from './Hoi4GameInfo';
import Hoi4Games from './Hoi4Games';
import Hoi4Upload from './Hoi4Upload';

const { useState } = React;

const Hoi4Dashboard = () => {
	return (
		<div className="flex flex-col w-full h-full items-center justify-center">
			<Hoi4Upload />
			<Hoi4Games />
		</div>
	);
};

export default Hoi4Dashboard;
