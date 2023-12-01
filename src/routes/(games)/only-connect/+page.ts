import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'Only Connect',
		gameType: 'only-connect',
		instructions: Instructions
	};
}
