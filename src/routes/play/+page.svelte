<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { gameData } from '$lib/stores/gameData.store';
	import { keyPressEvent } from '$lib/stores/keyListener.Store';

	// Declare json object representing our game
	$: displayValue = JSON.stringify($gameData, null, 2);

	// Intermediary param for close confirmation to prevent accidental closure
	// - Press once to show confirmation
	// - Press again when confirmation is visible to actually close
	let escapePressed = false;

	// Helper function to show close confirmation
	function showCloseConfirmation(timeoutMs: number = 5000) {
		escapePressed = true;
		setTimeout(() => {
			escapePressed = false;
		}, timeoutMs);
	}

	$: if ($keyPressEvent) {
		handleKeyPress($keyPressEvent);
	}

	// Keyup listener for handling key presses
	function handleKeyPress(event: KeyboardEvent) {
		// TODO: Convert if block to switch/case for handling full keyboard interaction
		// Escape should confirm and close the player to return to the editor
		if (event.key === 'Escape') {
			if (!escapePressed) {
				showCloseConfirmation();
			} else {
				// Navigate back to home page for now
				if (!$gameData?.gameType) {
					goto('/', { replaceState: false });
				} else {
					goto(`/${$gameData.gameType}`, { replaceState: false });
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
		// Flash close confirmation message on load so user knows how to exit
		showCloseConfirmation();
	});
</script>

<main>
	<pre>{displayValue}</pre>
</main>

{#if escapePressed}
	<div out:fade class="fixed left-0 top-0 flex h-screen w-screen items-end justify-center">
		<p
			class="relative m-12 inline-block rounded-md bg-stone-500 p-2 text-center font-sans text-4xl text-stone-100"
		>
			Press <kbd class="rounded bg-stone-200 px-2 text-stone-600 shadow-md ring-1 ring-stone-900/10"
				>Esc</kbd
			> key to return to editor
		</p>
	</div>
{/if}
