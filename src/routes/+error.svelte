<script lang="ts">
	import { page } from '$app/stores';

	let detailsVisible = false;

	function toggleDetails() {
		detailsVisible = !detailsVisible;
	}
</script>

<header class="text-center">
	<h1 class="m-4 text-4xl">There was an error</h1>
	{#if $page.status === 404}
		<h2 class="m-4 text-2xl">Page does not exist</h2>
		<p class="m-4">
			Please check the URL and try again. If you're sure the page should exist, please file a bug
			report.
		</p>
	{:else}
		<h2 class="m-4 text-2xl">An unexpected error occurred</h2>
		<p class="m-4">Please try again. If the issue persists, please file a bug report.</p>
	{/if}
	<p class="m-4">Check the below details for more information.</p>
</header>

<main class="mx-auto w-1/2 rounded-md bg-stone-900/10 p-4 text-left ring-1 ring-stone-900/10">
	<p>Status code: {$page.status}</p>
	{#if $page?.error?.message}
		<p>Message: {$page?.error?.message}</p>
	{/if}
	<p>
		<button
			class="rounded-md p-2 ring-1 ring-stone-900/10 hover:bg-stone-900/10"
			on:click={toggleDetails}
		>
			{detailsVisible ? 'Hide' : 'Show'} error details
		</button>
	</p>
	{#if detailsVisible}
		<pre class="">{JSON.stringify($page, null, 2)}</pre>
	{/if}
</main>
