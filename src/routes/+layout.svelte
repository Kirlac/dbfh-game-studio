<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';

	$: isPlayer = $page?.route?.id === '/play';
</script>

{#if !isPlayer}
	<a class="absolute left-0 top-0 m-2 h-12 w-12 rounded-md hover:bg-stone-200" href="/">
		<Icon name="bus" class="h-full w-full text-stone-400 hover:text-stone-600"></Icon>
	</a>

	<button
		class="absolute right-0 top-0 m-2 h-12 w-12 rounded-full hover:bg-stone-200"
	>
		<Icon name="circle-info" class="h-full w-full text-stone-400 hover:text-stone-600"></Icon>
	</button>
{/if}

<slot />
