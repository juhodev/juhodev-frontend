import Genome from './genome';
import Route from './route';

export type GA_CONFIG = {
	mutationRate: number;
	generationLimit: number;
	populationSize: number;
	elitismCount: number;
	routeSize: number;
	parentPickType: ParentPickType;
};

export enum ParentPickType {
	RANDOM = 'random',
	TOURNAMENT = 'tournament',
}

export class GA {
	gaConfig: GA_CONFIG;
	private genomes: Genome[];
	private routeListener: (route: Route) => void;

	constructor() {
		this.gaConfig = {
			mutationRate: 0.1,
			generationLimit: 100,
			elitismCount: 1,
			populationSize: 250,
			routeSize: 25,
			parentPickType: ParentPickType.TOURNAMENT,
		};
		this.genomes = [];
	}

	setRouteListener(listener: (route: Route) => void) {
		this.routeListener = listener;
	}

	init(config: GA_CONFIG, route: Route) {
		for (let i = 0; i < config.populationSize; i++) {
			const genome: Genome = new Genome(route.clone());
			this.genomes.push(genome);
		}

		this.gaConfig = config;
	}

	async run() {
		for (let i = 0; i < this.gaConfig.generationLimit; i++) {
			this.evolve();
			this.printGeneration();
			await this.hack();
		}
	}

	evolve() {
		const newGenomes: Genome[] = [];

		if (this.gaConfig.elitismCount > 0) {
			this.genomes
				.sort((a, b) => a.getFitness() - b.getFitness())
				.reverse();

			for (let i = 0; i < this.gaConfig.elitismCount; i++) {
				const fittestGenome: Genome = this.genomes.pop();
				newGenomes.push(new Genome(fittestGenome.route));
			}
		}

		for (
			let i = 0;
			i < this.genomes.length - this.gaConfig.elitismCount;
			i++
		) {
			switch (this.gaConfig.parentPickType) {
				case ParentPickType.RANDOM:
					this.randomParentPick(newGenomes);
					break;

				case ParentPickType.TOURNAMENT:
					this.tournamentSelection(newGenomes);
					break;
			}
		}

		this.genomes = newGenomes;
	}

	private async hack(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 100);
		});
	}

	private printGeneration() {
		let total: number = 0;
		for (const genome of this.genomes) {
			total += genome.route.getRouteLength();
		}

		this.genomes.sort((a, b) => a.getFitness() - b.getFitness()).reverse();
		this.routeListener(this.genomes[0].route);

		console.log(
			`The average route length was ${total / this.genomes.length}`,
		);
	}

	private randomParentPick(newGenomes: Genome[]) {
		const randomParentA: Genome = this.genomes[
			Math.floor(Math.random() * this.genomes.length)
		];
		const randomParentB: Genome = this.genomes[
			Math.floor(Math.random() * this.genomes.length)
		];

		const offspring: Genome = this.crossover(randomParentA, randomParentB);
		offspring.mutate();
		newGenomes.push(offspring);
	}

	private tournamentSelection(newGenomes: Genome[]) {
		const parentA: Genome = this.runTournament();
		const parentB: Genome = this.runTournament();

		const offspring: Genome = this.crossover(parentA, parentB);
		offspring.mutate();
		newGenomes.push(offspring);
	}

	private runTournament(): Genome {
		const players: Genome[] = [];

		const tournamentSize: number = 16;
		for (let i = 0; i < tournamentSize; i++) {
			players.push(
				this.genomes[Math.floor(Math.random() * this.genomes.length)],
			);
		}

		return this.tournament(players);
	}

	private tournament(players: Genome[]): Genome {
		if (players.length === 2) {
			return this.tournamentDiff(players[0], players[1]);
		}

		const nextRound: Genome[] = [];
		let x: number = 0;
		for (let i = 0; i < players.length / 2; i++) {
			const a: Genome = players[x++];
			const b: Genome = players[x++];

			const better: Genome = this.tournamentDiff(a, b);
			nextRound.push(better);
		}

		return this.tournament(nextRound);
	}

	private tournamentDiff(a: Genome, b: Genome): Genome {
		if (a.getFitness() === b.getFitness()) {
			if (Math.random() < 0.5) {
				return a;
			} else {
				return b;
			}
		}

		if (a.getFitness() > b.getFitness()) {
			return a;
		}

		return b;
	}

	private crossover(parentA: Genome, parentB: Genome): Genome {
		return this.singlePointCrossover(parentA, parentB);
	}

	private singlePointCrossover(parentA: Genome, parentB: Genome): Genome {
		const offspring: Genome = new Genome();

		const middle: number = parentA.route.cities.length / 2;
		const randomAmount: number = Math.floor((Math.random() * middle) / 2);
		const citiesFromMoreFitParent: number = middle + randomAmount;

		for (let i = 0; i < citiesFromMoreFitParent; i++) {
			if (parentA.getFitness() > parentB.getFitness()) {
				offspring.route.cities.push(parentA.route.cities[i]);
			} else {
				offspring.route.cities.push(parentB.route.cities[i]);
			}
		}

		if (parentA.getFitness() < parentB.getFitness()) {
			for (const city of parentA.route.cities) {
				const alreadyInOffspring: boolean = offspring.route.cities.some(
					(c) => c.equals(city),
				);

				if (!alreadyInOffspring) {
					offspring.route.cities.push(city);
				}
			}
		} else {
			for (const city of parentB.route.cities) {
				const alreadyInOffspring: boolean = offspring.route.cities.some(
					(c) => c.equals(city),
				);

				if (!alreadyInOffspring) {
					offspring.route.cities.push(city);
				}
			}
		}

		return offspring;
	}
}

const geneticAlgorithm = new GA();
export default geneticAlgorithm;
