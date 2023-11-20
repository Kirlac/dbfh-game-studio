<script lang="ts">
	import { page } from '$app/stores';

	let detailsVisible = false;

	function toggleDetails() {
		detailsVisible = !detailsVisible;
	}
</script>

<header class="text-center">
	<h1 class="m-4 inline-block text-4xl">There was an error</h1>
</header>

<section class="text-center">
	{#if $page.status === 404}
		<h2 class="m-4 inline-block text-2xl">Page does not exist</h2>
		<br />
		<h3 class="m-4 inline-block text-xl">Please check the URL and try again</h3>
		<br />
		<h4 class="m-4 inline-block text-lg">
			If you're sure the page should exist, please file a bug report
		</h4>
		<br />
	{/if}
</section>

<section class="mx-auto w-1/2 rounded-md bg-slate-900/10 p-4 text-left ring-1 ring-slate-900/10">
	<p>Status code: {$page.status}</p>
	<br />
	{#if $page?.error?.message}
		<p>Message: {$page?.error?.message}</p>
		<br />
	{/if}
	<p>
		<button
			class="rounded-md p-2 ring-1 ring-slate-900/10 hover:bg-slate-900/10"
			on:click={toggleDetails}
		>
			{detailsVisible ? 'Hide' : 'Show'} error details
		</button>
	</p>
	{#if detailsVisible}
		<br />
		<pre class="">{JSON.stringify($page, null, 2)}</pre>
	{/if}
</section>
