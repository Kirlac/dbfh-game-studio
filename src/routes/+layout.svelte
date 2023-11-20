<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(async () => {
		// Import boxicons in onMount because it needs to reference 'window'
		await import('boxicons');
	});
</script>

<a
	class="absolute left-0 top-0 mx-2 flex h-12 w-12 items-center justify-center rounded-full"
	href="/"
>
	<box-icon name="home" class="h-10 w-10 fill-stone-400 hover:fill-stone-600"></box-icon>
</a>

<button class="absolute right-0 top-0 mx-2 flex h-12 w-12 items-center justify-center rounded-full">
	<box-icon name="help-circle" class="h-10 w-10 fill-stone-400 hover:fill-stone-600"></box-icon>
</button>

<slot />
