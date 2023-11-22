<script lang="ts">
	import { stringToBase64 } from '$lib/utils/base64Encoder';
	import type { GameData } from '$lib/stores/gameData.store';
	import GameCode from '$lib/components/GameCode.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const defaultGameData: GameData = {
		gameType: 'thisOrThat',
		titleCard: {},
		questions: [],
		endCard: {}
	};

	let gameData = defaultGameData;
	$: gameDataJson = JSON.stringify(gameData);
	$: gameDataBase64 = stringToBase64(gameDataJson);

	async function loadExample() {
		const exampleResponse = await fetch('this-or-that-example.json');
		gameData = await exampleResponse.json();
	}
</script>

<main class="mx-4 mt-16">
	<!-- Editor -->
	<form class="-ml-2">
		<button
			class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
			on:click={loadExample}
		>
			<Icon name="book" class="mx-2"></Icon> Load Example
		</button>
	</form>

	<GameCode bind:value={gameDataBase64} showPlayButton showCopyButton></GameCode>
</main>
