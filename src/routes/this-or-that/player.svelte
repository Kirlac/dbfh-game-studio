<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { showNav } from '../showNav.store';

	// Declare json value object representing our game
	export let value = '';

	// Create event dispatcher for communicating with parent
	const dispatch = createEventDispatcher();

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
				// raise close player event
				dispatch('close');
				$showNav = true;
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
		$showNav = false;
		// Bind keyup event listener
		document.addEventListener('keyup', handleKeyPress);
		// Flash close confirmation message on load so user knows how to exit
		showCloseConfirmation();
	});
</script>

<h2>Player</h2>
<pre>{value}</pre>

{#if escapePressed}
	<overlay out:fade class="absolute left-0 top-0 flex h-screen w-screen items-end justify-center">
		<h2
			class="relative m-12 inline-block rounded-md bg-slate-900/50 p-2 text-center font-sans text-4xl text-slate-100"
		>
			Press <key class="rounded bg-slate-200/40 px-2 shadow ring-1 ring-slate-900/10"
				><code>Esc</code></key
			> key to return to editor
		</h2>
	</overlay>
{/if}
