import * as React from 'react';
import { fetchDemoWorkerStatus, fetchMetrics } from '../../api/api';
import { SiteMetric } from '../../api/types';
import { formatSeconds, millisecondsToSeconds } from '../../ts/timeUtils';
import PieChart from '../utils/PieChart';
import MetricGraph from './MetricGraph';
import MetricPie from './MetricPie';

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

	// If the metric doesn't start with `cache` then it'll be a line chart
	const lineCharts: React.ReactNode[] = metrics
		.filter((metric) => !metric.name.startsWith('cache'))
		.map((metric, i) => (
			<MetricGraph
				key={i}
				name={metric.name}
				data={metric.values}
				dataFormat={(data) => `${Math.round(data)}ms`}
			/>
		));

	const cacheData: SiteMetric[] = metrics.filter((metric) =>
		metric.name.startsWith('cache'),
	);
	console.log(cacheData);
	const pieCharts: React.ReactNode[] = cacheData.map((data, i) => (
		<MetricPie
			key={i}
			name={data.name}
			total={data.values.length.toString()}
			data={[
				{
					name: 'Cache hits',
					num: data.values.filter((x) => x === 1).length,
				},
				{
					name: 'Cache misses',
					num: data.values.filter((x) => x === 0).length,
				},
			]}
		/>
	));

	return (
		<div className="grid grid-cols-3 gap-4">
			{[...lineCharts, ...pieCharts]}
		</div>
	);
};

export default Metrics;
