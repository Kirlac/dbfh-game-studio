<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { base64ToString, stringToBase64 } from '$lib/utils/base64Encoder';

	export let value: string;
	export let showPlayButton = false;
	export let showEditButton = false;
	export let showDiscardButton = false;
	export let showCopyButton = false;
	export let placeholderText = 'Paste your game code or drop your .dbfhg file here';

	let copyStatus: 'copied' | 'error' = 'error';
	let copyStatusVisible = false;
	// Helper function to show copy status for 2000ms
	function showCopyStatus(timeoutMs: number = 2000) {
		copyStatusVisible = true;
		setTimeout(() => {
			copyStatusVisible = false;
		}, timeoutMs);
	}

	function playGame() {
		goto('/play');
	}

	let emptyGame = {};
	let emptyGameJson = JSON.stringify(emptyGame);
	let emptyGameBase64 = stringToBase64(emptyGameJson);

	let gameDataJson = '{}';

	$: try {
		gameData = base64ToString(value);
	} catch (error) {
		console.log(error);
		gameData = '{}';
	}

	$: gameData = JSON.parse(gameDataJson);

	function editGame() {
		if (gameData?.gameType) {
			goto(`/${gameData.gameType}`);
		}
	}

	function discardGame() {
		//value = emptyGameBase64;
		value = '';
	}

	function copyGameCode() {
		navigator.clipboard.writeText(value).then(
			() => {
				/* success */
				copyStatus = 'copied';
				showCopyStatus();
			},
			() => {
				/* failure */
				copyStatus = 'error';
				showCopyStatus();
			}
		);
	}
</script>

<section
	class="bg-stone-50 ring-stone-900/10 hover:bg-stone-200 focus:bg-stone-200 relative inline-block h-64 w-3/4 rounded-md text-left ring-1"
>
	{#if value && (showPlayButton || showEditButton || showDiscardButton || showCopyButton)}
		<menu class="absolute right-0 top-0 flex justify-around">
			{#if showPlayButton}
				<li>
					<button
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
						on:click={playGame}
					>
						<Icon name="play" class="text-theme-neutral-dark"></Icon><span class="ml-2">Play</span>
					</button>
				</li>
			{/if}
			{#if showEditButton}
				<li>
					<button
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
						on:click={editGame}
					>
						<Icon name="pen-to-square" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Edit</span
						>
					</button>
				</li>
			{/if}
			{#if showDiscardButton}
				<li>
					<button
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
						on:click={discardGame}
					>
						<Icon name="trash-can" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Discard</span
						>
					</button>
				</li>
			{/if}
			{#if showCopyButton}
				<li>
					<button
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
						on:click={copyGameCode}
					>
						<Icon name="clipboard" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Copy</span
						>
					</button>
				</li>
			{/if}
		</menu>
	{/if}

	<pre
		contenteditable="true"
		bind:innerText={value}
		class="bg-stone-50 hover:bg-stone-200 focus:bg-stone-200 h-full w-full overflow-scroll whitespace-break-spaces break-all rounded-md p-2 {!value
			? 'placeholder text-theme-neutral-dark/40'
			: 'text-theme-neutral-dark'}"
		data-placeholder-text={placeholderText}></pre>

	{#if copyStatusVisible}
		<div transition:fade class="absolute right-0 top-14">
			<p
				class="relative m-2 inline-block rounded-md {copyStatus === 'copied'
					? 'bg-green-600'
					: 'bg-red-600'} text-stone-100 p-2 text-center"
			>
				{copyStatus === 'copied' ? 'Game code copied successfully' : 'Error copying game code'}
			</p>
		</div>
	{/if}
</section>

<style>
	.placeholder::before {
		content: attr(data-placeholder-text);
	}
</style>
