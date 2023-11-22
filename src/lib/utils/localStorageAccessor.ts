import { browser } from '$app/environment';

export function getValue(key: string, initial: string) {
	let value = initial;
	if (browser) {
		value = localStorage.getItem(key) ?? setValue(key, initial);
	}
	return value;
}

export function getParsedValue(key: string, initial: object) {
	const saved = JSON.parse(getValue(key, JSON.stringify(initial)));
	return { ...initial, ...saved };
}

export function setValue(key: string, value: string) {
	if (browser) {
		localStorage.setItem(key, value);
	}
	return value;
}

export function setStringifiedValue(key: string, value: unknown) {
	return setValue(key, JSON.stringify(value));
}
