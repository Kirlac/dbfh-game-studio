import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'This or That',
		gameType: 'this-or-that',
		instructions: Instructions
	};
}
