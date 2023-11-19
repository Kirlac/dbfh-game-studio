<script lang="ts">
	import { page } from '$app/stores';

	let detailsVisible = false;

	function toggleDetails() {
		detailsVisible = !detailsVisible;
	}
</script>

<h1>There was an error</h1>

{#if $page.status === 404}
	<h2>Page does not exist</h2>
	<h3>Please check the URL and try again</h3>
	<h4>If you're sure the page should exist, please file a bug report</h4>
{/if}

<button on:click={toggleDetails}>{detailsVisible ? 'Hide' : 'Show'} error details</button>

{#if detailsVisible}
	<p>Status code: {$page.status}</p>
	{#if $page?.error?.message}
		<p>Message: {$page?.error?.message}</p>
	{/if}
	<p>Details:</p>
	<pre>{JSON.stringify($page, null, 2)}</pre>
{/if}
