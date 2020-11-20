// https://stackoverflow.com/a/3177838
export function timeSince(date: Date): string {
	const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;

	if (interval > 1) {
		return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;

	if (interval > 1) {
		return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;

	if (interval > 1) {
		return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;

	if (interval > 1) {
		return Math.floor(interval) + ' minutes';
	}

	return Math.floor(seconds) + ' seconds';
}

export function dateFormat(date: Date, onlyDate?: boolean): string {
	const realDate: number = date.getDate();
	const month: number = date.getMonth() + 1;
	const year: number = date.getFullYear();

	if (onlyDate) {
		return `${realDate}.${month}.${year}`;
	}

	return `${realDate}.${month}.${year} ${
		date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
}

export function formatSeconds(seconds: number): string {
	const minutes: number = Math.floor(seconds / 60);
	const leftoverSeconds: number = seconds - minutes * 60;

	return `${Math.round(minutes)}:${
		leftoverSeconds < 10
			? '0' + Math.round(leftoverSeconds)
			: Math.round(leftoverSeconds)
	}`;
}
export function msToTime(ms: number) {
	const hours = Math.floor(ms / (1000 * 60 * 60));
	const minutes = Math.floor((ms / (1000 * 60)) % 60);

	return `${hours} hours ${minutes} minutes`;
}

export function getAllDatesBetweenTwoDates(
	firstDate: Date,
	lastDate: Date,
): Date[] {
	const array: Date[] = [];
	const dayInMilliseconds: number = 1000 * 60 * 60 * 24;

	let currentDate: Date = firstDate;
	while (currentDate.getTime() < lastDate.getTime()) {
		array.push(new Date(currentDate.getTime()));
		currentDate = new Date(currentDate.getTime() + dayInMilliseconds);
	}

	return array;
}
