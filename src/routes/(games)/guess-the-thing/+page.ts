import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'Guess the Thing',
		gameType: 'guess-the-thing',
		instructions: Instructions
	};
}
