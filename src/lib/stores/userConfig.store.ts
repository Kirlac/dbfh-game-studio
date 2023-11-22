import { writable } from 'svelte/store';
import { getParsedValue, setStringifiedValue } from '../utils/localStorageAccessor';

export type UserConfigOptions = {
	fancyCodeEnabled: boolean;
};

export const defaultOptions: UserConfigOptions = {
	fancyCodeEnabled: false
};

function initializeUserConfig() {
	const localStorageKey = 'userConfig';
	const config: UserConfigOptions = getParsedValue(localStorageKey, defaultOptions);

	const { subscribe, set, update } = writable(config);

	return {
		subscribe,
		set: (value: UserConfigOptions) => {
			setStringifiedValue(localStorageKey, value);
			return set(value);
		},
		update
	};
}

export const userConfig = initializeUserConfig();
