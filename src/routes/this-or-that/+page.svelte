<script lang="ts">
	import { stringToBase64 } from '$lib/utils/base64Encoder';
	import type { GameData } from '$lib/stores/gameData.store';
	import GameCode from '$lib/components/GameCode.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const defaultGameData: GameData = {
		gameType: 'this-or-that',
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

	let codeVisible = false;

	function toggleCodeVisibility() {
		codeVisible = !codeVisible;
	}
</script>

<header class="flex flex-col items-center justify-around text-center">
	<img src="logo-2024-trans-200.png" alt="Desert Bus for Hope" class="inline-block w-[200px]" />
	<h1 class="m-4 inline-block text-4xl text-theme-accent-light">This or That</h1>
</header>

<main class="text-center">
	<section class="sticky top-8">
		<menu class="mb-4 inline-flex w-3/4 items-center justify-around">
			<li>
				<button
					class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
					on:click={loadExample}
				>
					<Icon name="file" class="text-theme-neutral-dark"></Icon><span class="ml-2">New Game</span
					>
				</button>
			</li>
			<li>
				<button
					class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
					on:click={loadExample}
				>
					<Icon name="book" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>Load Example</span
					>
				</button>
			</li>
			<li>
				<button
					class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
					on:click={toggleCodeVisibility}
				>
					<Icon name="play" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>Play Game</span
					>
				</button>
			</li>
			<li>
				<button
					class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
					on:click={toggleCodeVisibility}
				>
					<Icon name="file-code" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>{codeVisible ? 'Hide' : 'Show'} Code</span
					>
				</button>
			</li>
		</menu>

		{#if codeVisible}
			<GameCode bind:value={gameDataBase64} showPlayButton showDiscardButton showCopyButton
			></GameCode>
		{/if}
	</section>

	<!-- Editor -->
	<form class="mb-2 inline-block w-3/4"></form>
</main>
