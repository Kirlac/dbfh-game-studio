<script lang="ts">
	import { stringToBase64 } from '$lib/Base64Encoder';
	import type { GameData } from '$lib/gameData.store';
	import GameCode from '$lib/GameCode.svelte';
	import BoxIcon from '$lib/BoxIcon.svelte';

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

<section class="mx-2 mt-14">
	<!-- Editor -->
	<button
		class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
		on:click={loadExample}
	>
		<BoxIcon name="book"></BoxIcon> Load Example
	</button>
</section>

<section class="mx-4">
	<GameCode bind:value={gameDataBase64} showPlayButton showCopyButton></GameCode>
</section>
