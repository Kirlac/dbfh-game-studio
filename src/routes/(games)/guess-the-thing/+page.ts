import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'Guess the Thing',
		defaultGameData: {
			gameType: 'guess-the-thing',
			titleCard: {},
			questions: [],
			endCard: {}
		},
		instructions: Instructions
	};
}
