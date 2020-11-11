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

export function dateFormat(date: Date): string {
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${
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
