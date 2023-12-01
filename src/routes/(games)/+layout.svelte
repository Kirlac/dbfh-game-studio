<script lang="ts">
	import { page } from '$app/stores';
	import { gameData, gameDataBase64, type GameData } from '$lib/stores/gameData.store';
	import GameCode from '$lib/components/GameCode.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	function playGame() {
		goto('/play', { replaceState: false });
	}

	let discardConfirmationRequested = false;
	let invalidGameType = false;
	function createNewGame() {
		invalidGameType = false;
		discardConfirmationRequested = false;
		let newGame: GameData = {
			gameType: $page.data.gameType,
			titleCard: {},
			questions: [],
			endCard: {}
		};
		$gameData = newGame;
	}

	function confirmDiscardGame() {
		if ($gameData) {
			discardConfirmationRequested = true;
		} else {
			createNewGame();
		}
	}

	function cancelDiscardGame() {
		invalidGameType = false;
		discardConfirmationRequested = false;
	}

	function reloadGameInCorrectEditor() {
		invalidGameType = false;
		discardConfirmationRequested = false;
		if ($gameData?.gameType) {
			goto(`/${$gameData?.gameType}`, { replaceState: false });
		} else {
			goto('/', { replaceState: false });
		}
	}

	async function loadExample() {
		const exampleResponse = await fetch(`${$page.data.gameType}-example.dbfhg`);
		let exampleGameCode = await exampleResponse.text();
		gameData.setBase64(exampleGameCode);
	}
	let instructionsVisible = true;

	function toggleInstructionsVisibility() {
		instructionsVisible = !instructionsVisible;
	}

	let codeVisible = false;

	function toggleCodeVisibility() {
		codeVisible = !codeVisible;
	}

	onMount(() => {
		if ($gameData) {
			if ($gameData?.gameType !== $page.data.gameType) {
				invalidGameType = true;
			}
		} else {
			createNewGame();
		}
	});
</script>

<header class="flex flex-col items-center justify-around text-center">
	<img src="logo-2024-trans-200.png" alt="Desert Bus for Hope" class="inline-block w-[200px]" />
	<h1 class="m-4 inline-block text-4xl text-theme-accent-light">
		{$page.data.title || 'The Desert Bus for Hope Game Studio'}
	</h1>
</header>

<main class="text-center">
	<section class="sticky top-0 z-20 bg-theme-primary-dark pt-8">
		<menu class="mb-4 inline-flex w-3/4 items-center justify-around">
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={playGame}
				>
					<Icon name="play" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>Play Game</span
					>
				</button>
			</li>
			<li>
				<a
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					href="data:text/plain;charset=utf-8,{$gameDataBase64}"
					download="{$gameData?.gameType}.dbfhg"
				>
					<Icon name="floppy-disk" class="text-theme-neutral-dark"></Icon><span class="ml-2"
						>Download Game</span
					>
				</a>
			</li>
			<li>
				<button
					class="flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={confirmDiscardGame}
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
			<GameCode showDiscardButton showUploadButton showCopyButton></GameCode>
		{/if}
	</section>

	{#if discardConfirmationRequested || invalidGameType}
		<section
			class="fixed bottom-0 left-0 right-0 top-0 z-30 flex items-start justify-around bg-stone-800/40"
		>
			<div
				class="my-16 inline-block w-3/4 rounded-md bg-theme-neutral-light p-8 text-theme-neutral-dark"
			>
				<h2 class="my-2 text-center text-xl text-theme-status-error">
					WARNING:
					{#if invalidGameType}
						The game you have loaded is a different type
					{:else}
						Your game will be discarded
					{/if}
				</h2>
				<p class="my-2">
					Are you sure you wish to discard existing game data and create a new game?
				</p>
				<p class="my-2">
					Discarded data cannot be retrieved.
					{#if invalidGameType}
						If you want to change to the correct editor for this game type, select "Reload in the
						Correct Editor" to reload the game in a different editor.
					{:else}
						If you are unsure, you can select "Keep Existing Game" to return to the editor and
						download a copy as a backup.
					{/if}
				</p>
				<div class="mt-8 flex items-center justify-evenly">
					<button
						class="rounded-md bg-stone-100 p-2 text-theme-status-error ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={createNewGame}>Discard and Create New Game</button
					>
					{#if invalidGameType}
						<button
							class="rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
							on:click={reloadGameInCorrectEditor}>Reload in the Correct Editor</button
						>
					{/if}
					{#if discardConfirmationRequested}
						<button
							class="rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
							on:click={cancelDiscardGame}>Keep Existing Game</button
						>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<slot />
</main>
