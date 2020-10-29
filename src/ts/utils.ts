// https://stackoverflow.com/a/1349426
export function makeid(length: number): string {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength),
		);
	}
	return result;
}

export function randomRGBA(): string {
	const red: number = Math.floor(Math.random() * 255);
	const green: number = Math.floor(Math.random() * 255);
	const blue: number = Math.floor(Math.random() * 255);

	return `rgba(${red}, ${green}, ${blue}, .2)`;
}
