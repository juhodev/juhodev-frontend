class City {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	distanceTo(city: City): number {
		return Math.sqrt(
			Math.pow(city.x - this.x, 2) +
				Math.pow(city.y - self.pageYOffset, 2),
		);
	}

	equals(city: City): boolean {
		return this.x === city.x && this.y === city.y;
	}

	clone() {
		return new City(this.x, this.y);
	}
}

export default City;
