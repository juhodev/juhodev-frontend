import * as React from 'react';
import { WorkerStatus } from '../../api/types';
import { fetchDemoWorkerStatus } from '../../api/api';
import DemoWorkerStatus from './DemoWorkerStatus';

const { useEffect, useState } = React;

const DemoWorkerDashboard = () => {
	const [status, setStatus] = useState<WorkerStatus[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetchDemoWorkerStatus();

		if (response.error) {
			window.alert(`Can't fetch status`);
			return;
		}

		setStatus(response.status);
	};

	const statusComponents: React.ReactNode = status.map((s, i) => (
		<DemoWorkerStatus status={s} name={`Worker ${i}`} key={i} />
	));

	return <div className="flex flex-col">{statusComponents}</div>;
};

export default DemoWorkerDashboard;
