import Instructions from './Instructions.svelte';

export function load() {
	return {
		title: "Who's That Silhouette?",
		gameType: 'silhouette',
		instructions: Instructions
	};
}
