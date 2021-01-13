import Route from './route';
import geneticAlgorithm from './geneticAlgorithm';

class Genome {
	route: Route;
	private cachedRouteLength: number;

	constructor(route?: Route) {
		this.route = route || new Route();
		this.cachedRouteLength = -1;
	}

	getFitness(): number {
		if (this.cachedRouteLength === -1) {
			this.cachedRouteLength = this.route.getRouteLength();
		}

		return 1 / this.cachedRouteLength;
	}

	mutate() {
		for (let i = 0; i < this.route.cities.length; i++) {
			if (Math.random() < geneticAlgorithm.gaConfig.mutationRate) {
				const randomCityIndex: number = Math.floor(
					Math.random() * this.route.cities.length,
				);

				this.route.swap(i, randomCityIndex);
			}
		}
	}
}

export default Genome;
