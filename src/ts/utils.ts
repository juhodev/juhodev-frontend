// https://stackoverflow.com/a/1349426
export function makeid(length: number): string {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function randomRGBA(): string {
	const red: number = Math.floor(Math.random() * 255);
	const green: number = Math.floor(Math.random() * 255);
	const blue: number = Math.floor(Math.random() * 255);

	return `rgba(${red}, ${green}, ${blue}, .2)`;
}

// Copied from here https://stackoverflow.com/a/47115113
// DO NOT TRUST THIS JWT
//
// I can't verify the JWT on the client side so it shouldn't be trusted. I decode it
// for a quick check if a user should be able to connect their discord account. If the JWT has been
// changed to something that allows a discord login then we will still verify it on the back end.
export function jwtDecode(t: string) {
	let token: { raw?: string; header?: object; payload?: object } = {};

	token.raw = t;
	token.header = JSON.parse(window.atob(t.split('.')[0]));
	token.payload = JSON.parse(window.atob(t.split('.')[1]));
	return token;
}

export function redirectFrom(to: string, from: string) {
	window.location.href = `${to}?from=${from}`;
}

export function pluralize(text: string, textPlural: string, count: number): string {
	if (count === 1) {
		return text;
	} else {
		return textPlural;
	}
}

export function isNil(value: any): boolean {
	return value === undefined || value === null;
}
