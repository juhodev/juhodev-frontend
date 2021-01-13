import City from './city';

class Route {
	cities: City[];

	constructor(cities?: City[]) {
		this.cities = cities || [];
	}

	swap(aIndex: number, bIndex: number) {
		const temp: City = this.cities[aIndex];
		this.cities[aIndex] = this.cities[bIndex];
		this.cities[bIndex] = temp;
	}

	getRouteLength() {
		let totalLength: number = 0;
		for (let i = 0; i < this.cities.length - 1; i++) {
			const currCity: City = this.cities[i];
			const nextCity: City = this.cities[i + 1];

			totalLength += currCity.distanceTo(nextCity);
		}

		totalLength += this.cities[this.cities.length - 1].distanceTo(
			this.cities[0],
		);

		return totalLength;
	}

	clone(): Route {
		const newCities: City[] = [];
		for (const city of this.cities) {
			newCities.push(city.clone());
		}

		return new Route(newCities);
	}
}

export default Route;
