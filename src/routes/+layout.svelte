<script lang="ts">
	import BoxIcon from '$lib/BoxIcon.svelte';
	import '../app.css';
</script>

<a
	class="absolute left-0 top-0 mx-2 flex h-12 w-12 items-center justify-center rounded-full"
	href="/"
>
	<BoxIcon name="home" class="h-10 w-10 fill-stone-400 hover:fill-stone-600"></BoxIcon>
</a>

<button class="absolute right-0 top-0 mx-2 flex h-12 w-12 items-center justify-center rounded-full">
	<BoxIcon name="help-circle" class="h-10 w-10 fill-stone-400 hover:fill-stone-600"></BoxIcon>
</button>

<slot />
