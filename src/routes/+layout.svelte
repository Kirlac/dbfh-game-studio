<script lang="ts">
	import BoxIcon from '$lib/BoxIcon.svelte';
	import { page } from '$app/stores';
	import '../app.css';

	export let data: { route: any };

	$: isPlayer = $page?.route?.id === '/play';
</script>

{#if !isPlayer}
	<a class="absolute left-0 top-0 m-2 h-12 w-12 rounded-md hover:bg-stone-200" href="/">
		<BoxIcon name="home" class="h-full w-full fill-stone-400 hover:fill-stone-600"></BoxIcon>
	</a>

	<a class="absolute left-20 top-0 m-2 h-12 w-12 rounded-md hover:bg-stone-200" href="/play">
		<BoxIcon name="play" class="h-full w-full fill-stone-400 hover:fill-stone-600"></BoxIcon>
	</a>

	<button class="absolute right-0 top-0 m-2 h-12 w-12 rounded-full hover:bg-stone-200">
		<BoxIcon name="help-circle" class="h-full w-full fill-stone-400 hover:fill-stone-600"></BoxIcon>
	</button>
{/if}

<slot />
