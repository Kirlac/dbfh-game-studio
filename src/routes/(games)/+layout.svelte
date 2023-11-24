<script lang="ts">
	import { stringToBase64 } from '$lib/utils/base64Encoder';
	import type { GameData } from '$lib/stores/gameData.store';
	import GameCode from '$lib/components/GameCode.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';

	let gameData: GameData = $page?.data?.defaultGameData;
	$: gameDataJson = JSON.stringify(gameData);
	$: gameDataBase64 = stringToBase64(gameDataJson);

	async function loadExample() {
		const exampleResponse = await fetch(`${gameData.gameType}-example.dbfhg`);
		let exampleGameCode = await exampleResponse.text();
		let exampleGameData = JSON.parse(exampleGameCode);
		gameData = exampleGameData;
	}

	let instructionsVisible = true;

	function toggleInstructionsVisibility() {
		instructionsVisible = !instructionsVisible;
	}

	let codeVisible = false;

	function toggleCodeVisibility() {
		codeVisible = !codeVisible;
	}
</script>

<header class="flex flex-col items-center justify-around text-center">
	<img src="logo-2024-trans-200.png" alt="Desert Bus for Hope" class="inline-block w-[200px]" />
	<h1 class="m-4 inline-block text-4xl text-theme-accent-light">
		{$page.data.title || 'The Desert Bus for Hope Game Studio'}
	</h1>
</header>

<main class="text-center">
	<section class="sticky top-8">
		<menu class="mb-4 inline-flex w-3/4 items-center justify-around">
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
				>
					<Icon name="file" class="text-theme-neutral-dark"></Icon><span class="ml-2">New Game</span
					>
				</button>
			</li>
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={loadExample}
				>
					<Icon name="book" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>Load Example</span
					>
				</button>
			</li>
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
				>
					<Icon name="play" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>Play Game</span
					>
				</button>
			</li>
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={toggleInstructionsVisibility}
				>
					<Icon name="book-open-reader" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>{instructionsVisible ? 'Hide' : 'Show'} Instructions</span
					>
				</button>
			</li>
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={toggleCodeVisibility}
				>
					<Icon name="file-code" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>{codeVisible ? 'Hide' : 'Show'} Code</span
					>
				</button>
			</li>
		</menu>

		{#if instructionsVisible}
			<section class="mb-4 inline-block w-3/4 rounded-md bg-theme-neutral-light">
				<svelte:component this={$page.data.instructions}></svelte:component>
			</section>
		{/if}

		{#if codeVisible}
			<GameCode bind:value={gameDataBase64} showPlayButton showDiscardButton showCopyButton
			></GameCode>
		{/if}
	</section>

	<slot />
</main>
