import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: "Who's That Silhouette?",
		defaultGameData: {
			gameType: 'silhouette',
			titleCard: {},
			questions: [],
			endCard: {}
		},
		instructions: Instructions
	};
}
