import { writable } from 'svelte/store';
import { getParsedValue, setStringifiedValue } from '../utils/localStorageAccessor';

export type UserConfigOptions = {
	fancyCodeEnabled: boolean;
	selectedTheme:
		| 'desert-bus'
		| 'dawn-guard'
		| 'alpha-flight'
		| 'night-watch'
		| 'zeta-shift'
		| 'omega-shift';
};

export const defaultOptions: UserConfigOptions = {
	fancyCodeEnabled: false,
	selectedTheme: 'desert-bus'
};

export const themeList = [
	{ key: 'desert-bus', value: 'Desert Bus' },
	{ key: 'dawn-guard', value: 'Dawn Guard' },
	{ key: 'alpha-flight', value: 'Alpha Flight' },
	{ key: 'night-watch', value: 'Night Watch' },
	{ key: 'zeta-shift', value: 'Zeta Shift' },
	{ key: 'omega-shift', value: 'Omega Shift' }
];

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
