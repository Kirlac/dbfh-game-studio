<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { GameData } from '$lib/stores/gameData.store';
	import { goto } from '$app/navigation';

	const defaultGameData: GameData = {
		gameType: 'this-or-that',
		titleCard: {},
		questions: [],
		endCard: {}
	};

	// Declare json object representing our game
	let value: GameData = defaultGameData;
	$: displayValue = JSON.stringify(value, null, 2);

	// Intermediary param for close confirmation to prevent accidental closure
	// - Press once to show confirmation
	// - Press again when confirmation is visible to actually close
	let escapePressed = false;

	// Helper function to show close confirmation for 1000ms
	function showCloseConfirmation() {
		escapePressed = true;
		setTimeout(() => {
			escapePressed = false;
		}, 1000);
	}

	// Keyup listener for handling key presses
	function handleKeyPress(this: Document, ev: KeyboardEvent) {
		// TODO: Convert if block to switch/case for handling full keyboard interaction
		// Escape should confirm and close the player to return to the editor
		if (ev.key === 'Escape') {
			if (!escapePressed) {
				showCloseConfirmation();
			} else {
				// Navigate back to home page for now
				if (!value?.gameType) {
					goto('/');
				} else {
					goto(`/${value.gameType}`);
				}
				document.removeEventListener('keyup', handleKeyPress);
			}
		}
		// ??? should select "this" value
		// ??? should select "that" value
		// ??? should select "both" value
		// ??? should select "neither" value
		// etc.
	}

	// Mounting logic
	onMount(() => {
		// Bind keyup event listener
		document.addEventListener('keyup', handleKeyPress);
		// Flash close confirmation message on load so user knows how to exit
		showCloseConfirmation();
	});
</script>

<main>
	<pre>{displayValue}</pre>
</main>

{#if escapePressed}
	<div out:fade class="absolute left-0 top-0 flex h-screen w-screen items-end justify-center">
		<p
			class="relative m-12 inline-block rounded-md bg-slate-500 p-2 text-center font-sans text-4xl text-slate-100"
		>
			Press <kbd class="rounded bg-slate-200 px-2 text-slate-600 shadow-md ring-1 ring-slate-900/10"
				>Esc</kbd
			> key twice to return to editor
		</p>
	</div>
{/if}
