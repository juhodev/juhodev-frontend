import { UserSubmission } from '../api/types';

export function filterSearch(
	submissions: UserSubmission[],
	searchTerm: string,
	sortType: string,
) {
	return sortSubmissions(submissions, sortType);
}

function sortSubmissions(
	submissions: UserSubmission[],
	sortType: string,
): UserSubmission[] {
	switch (sortType) {
		case 'SUBMISSION_DATE':
			return submissions
				.sort((a, b) => a.submission_date - b.submission_date)
				.reverse();

		case 'NAME':
			return submissions.sort((a, b) => a.name.localeCompare(b.name));

		case 'SUBMISSION_BY':
			return submissions.sort((a, b) =>
				a.submission_by.localeCompare(b.submission_by),
			);

		case 'VIEWS':
			return submissions.sort((a, b) => a.views - b.views).reverse();
	}
}
