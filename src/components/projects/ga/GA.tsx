import * as React from 'react';
import City from '../../../ts/ga/city';
import geneticAlgorithm, {
	GA_CONFIG,
	GA as GeneticAlgorithm,
	ParentPickType,
} from '../../../ts/ga/geneticAlgorithm';
import Route from '../../../ts/ga/route';
import Canvas from '../../Canvas';

const { useState, useEffect } = React;

const GA = () => {
	const [ga, setGA] = useState<GeneticAlgorithm>(undefined);
	const [config, setConfig] = useState<GA_CONFIG>({
		elitismCount: 1,
		mutationRate: 0.1,
		generationLimit: 400,
		populationSize: 250,
		routeSize: 25,
		parentPickType: ParentPickType.TOURNAMENT,
	});
	const [route, setRoute] = useState<Route>(new Route());

	useEffect(() => {
		setGA(geneticAlgorithm);
		geneticAlgorithm.setRouteListener((route: Route) => {
			setRoute(route);
		});
	}, []);

	const generateRoute = () => {
		const route: Route = new Route();

		for (let i = 0; i < config.routeSize; i++) {
			const x: number = Math.floor(Math.random() * 1000);
			const y: number = Math.floor(Math.random() * 1000);
			route.cities.push(new City(x, y));
		}

		console.log(`Route generated! length: ${route.getRouteLength()}`);
		geneticAlgorithm.init(config, route);
	};

	const draw = (ctx: CanvasRenderingContext2D) => {
		if (route.cities.length === 0) {
			return;
		}

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 1000, 1000);
		ctx.fill();

		for (let i = 0; i < route.cities.length - 1; i++) {
			ctx.fillStyle = '#e3e3e3';
			ctx.beginPath();
			const curr: City = route.cities[i];
			const next: City = route.cities[i + 1];

			ctx.fillRect(curr.x, curr.y, 10, 10);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.strokeStyle = '#FFFFFF';
			ctx.moveTo(curr.x, curr.y);
			ctx.lineTo(next.x, next.y);
			ctx.stroke();
			ctx.closePath();
		}

		ctx.fillStyle = '#e3e3e3';
		ctx.beginPath();
		const last: City = route.cities[route.cities.length - 1];
		const first: City = route.cities[0];

		ctx.fillRect(last.x, last.y, 10, 10);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.strokeStyle = '#FFFFFF';
		ctx.moveTo(last.x, last.y);
		ctx.lineTo(first.x, first.y);
		ctx.stroke();
		ctx.closePath();
	};

	return (
		<div className="">
			<button
				className="bg-gray-700 text-gray-200"
				onClick={generateRoute}
			>
				generate route
			</button>
			<button
				className="mx-4 bg-gray-700 text-gray-200"
				onClick={() => geneticAlgorithm.run()}
			>
				run
			</button>
			<Canvas draw={draw} />;
		</div>
	);
};

export default GA;
