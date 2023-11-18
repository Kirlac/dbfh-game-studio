<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value = '';

	const dispatch = createEventDispatcher();

	function handleKeyPress(this: Document, ev: KeyboardEvent) {
		if (ev.key === 'Escape' && ev.ctrlKey) {
			// raise close player event
			dispatch('close');
			document.removeEventListener('keyup', handleKeyPress);
		}
	}

	document.addEventListener('keyup', handleKeyPress);
</script>

<h1>Player</h1>
<p>Press ctrl + escape to return to editor</p>
<code>{value}</code>
