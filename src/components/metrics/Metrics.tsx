import * as React from 'react';
import { fetchDemoWorkerStatus, fetchMetrics } from '../../api/api';
import { SiteMetric } from '../../api/types';
import { formatSeconds, millisecondsToSeconds } from '../../ts/timeUtils';
import MetricGraph from './MetricGraph';

const { useEffect, useState } = React;

const Metrics = () => {
	const [metrics, setMetrics] = useState<SiteMetric[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetchMetrics();

		if (response.error) {
			return;
		}

		const workerResponse = await fetchDemoWorkerStatus();

		if (workerResponse.error) {
			window.alert(`Can't fetch status`);
			return;
		}

		const metrics = [...response.siteMetrics];
		const workerData = workerResponse.status.map(
			(stat) => stat.processing.all,
		);

		metrics.push(
			...workerData.map((x, i) => {
				return { name: `worker_${i}_demo_processing`, values: x };
			}),
		);

		setMetrics(metrics);
	};

	const graphs: React.ReactNode[] = metrics.map((metric, i) => (
		<MetricGraph
			key={i}
			name={metric.name}
			data={metric.values}
			dataFormat={(data) => `${Math.round(data)}ms`}
		/>
	));

	return <div className="grid grid-cols-3 gap-4">{graphs}</div>;
};

export default Metrics;
