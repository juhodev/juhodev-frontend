import { Country, UserSubmission } from '../api/types';

export enum SortType {
	SUBMISSION_DATE = 'SUBMISSION_DATE',
	NAME = 'NAME',
	SUBMISSION_BY = 'SUBMISSION_BY',
	VIEWS = 'VIEWS',
}

export function filterSearch(
	submissions: UserSubmission[],
	searchTerm: string,
	sortType: SortType,
) {
	return sortSubmissions(submissions, sortType);
}

function sortSubmissions(
	submissions: UserSubmission[],
	sortType: SortType,
): UserSubmission[] {
	switch (sortType) {
		case SortType.SUBMISSION_DATE:
			return submissions
				.sort((a, b) => a.submission_date - b.submission_date)
				.reverse();

		case SortType.NAME:
			return submissions.sort((a, b) => a.name.localeCompare(b.name));

		case SortType.SUBMISSION_BY:
			return submissions.sort((a, b) =>
				a.submission_by.localeCompare(b.submission_by),
			);

		case SortType.VIEWS:
			return submissions.sort((a, b) => a.views - b.views).reverse();
	}
}

export enum Hoi4SortType {
	STABILITY = 'STABILITY',
	NAME = 'NAME',
}

export function hoi4search(
	countries: Country[],
	search: string,
	sortType: Hoi4SortType,
) {
	const filteredCountries: Country[] = countries.filter((country) =>
		country.name.toLowerCase().startsWith(search.toLowerCase()),
	);

	switch (sortType) {
		case Hoi4SortType.STABILITY:
			return filteredCountries
				.sort((a, b) => a.stability - b.stability)
				.reverse();

		case Hoi4SortType.NAME:
			return filteredCountries.sort((a, b) =>
				a.name.localeCompare(b.name),
			);

		default:
			return filteredCountries;
	}
}
