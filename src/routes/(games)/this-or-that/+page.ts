import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'This or That',
		defaultGameData: {
			gameType: 'this-or-that',
			titleCard: {},
			questions: [],
			endCard: {}
		},
		instructions: Instructions
	};
}
