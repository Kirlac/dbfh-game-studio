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

<h2>Player</h2>
<p>Press <code>ctrl</code> + <code>escape</code> to return to editor</p>
<pre>{value}</pre>
