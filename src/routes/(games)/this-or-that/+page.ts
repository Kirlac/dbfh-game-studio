import Instructions from './Instructions.svelte';
import { defaultGameData } from './defaultGameData';

export function load() {
	return {
		title: 'This or That',
		defaultGameData,
		instructions: Instructions
	};
}
