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
	<overlay out:fade>
		<h2>Press <code>ESC</code> key to return to editor</h2>
	</overlay>
{/if}

<style>
	overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		/* background-color: #000a; */
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	overlay h2 {
		color: #eee;
		background-color: #000a;
		font-size: 32px;
		text-align: center;
		display: inline-block;
		position: relative;
		padding: 8px;
		border-radius: 4px;
	}

	code,
	pre {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
