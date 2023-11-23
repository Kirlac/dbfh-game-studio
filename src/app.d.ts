import type { GameData } from '$lib/stores/gameData.store';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			title: string;
			defaultGameData: GameData;
			instructions: ConstructorOfATypedSvelteComponent;
		}
		// interface Platform {}
	}
}

export {};
