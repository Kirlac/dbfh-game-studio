import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'Who Wants to be a Millionaire',
		defaultGameData: {
			gameType: 'millionaire',
			titleCard: {},
			questions: [],
			endCard: {}
		},
		instructions: Instructions
	};
}
