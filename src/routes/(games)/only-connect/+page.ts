import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: 'Only Connect',
		defaultGameData: {
			gameType: 'only-connect',
			titleCard: {},
			questions: [],
			endCard: {}
		},
		instructions: Instructions
	};
}
