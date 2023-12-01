import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'Who Wants to be a Millionaire',
		gameType: 'millionaire',
		instructions: Instructions
	};
}
