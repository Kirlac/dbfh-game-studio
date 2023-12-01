import type { GameData } from '$lib/stores/gameData.store';
import Instructions from './Instructions.svelte';

export function load() {
	const defaultGameData: GameData = {
		gameType: 'this-or-that',
		titleCard: {},
		questions: [],
		endCard: {}
	};

	return {
		title: 'This or That',
		defaultGameData,
		instructions: Instructions
	};
}
