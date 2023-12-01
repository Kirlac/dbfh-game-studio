// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			title: string;
			gameType: 'this-or-that' | 'only-connect' | 'millionaire' | 'guess-the-thing' | 'silhouette';
			instructions: ConstructorOfATypedSvelteComponent;
		}
		// interface Platform {}
	}
}

export {};
