<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { showNav } from './showNav.store';
	$showNav = true;

	onMount(async () => {
		// Import boxicons in onMount because it needs to reference 'window'
		await import('boxicons');
	});
</script>

{#if $showNav}
	<nav class="flex h-14 w-screen items-center justify-between border-b border-slate-900/10">
		<home>
			<a href="/">
				<img
					src="logo-2024-trans-100.png"
					alt="Desert Bus for Hope"
					class="inline-block h-12 w-12"
				/>
			</a>
		</home>
		<ul class="flex w-1/2 items-center justify-evenly">
			<li class="inline-block">
				<a class="rounded-md px-4 py-2 hover:bg-slate-900/10" href="this-or-that">This or That</a>
			</li>
			<li class="inline-block">
				<a class="rounded-md px-4 py-2 hover:bg-slate-900/10" href="only-connect">Only Connect</a>
			</li>
			<li class="inline-block">
				<a class="rounded-md px-4 py-2 hover:bg-slate-900/10" href="millionaire"
					>Who Wants to be a Millionaire</a
				>
			</li>
			<li class="inline-block">
				<a class="rounded-md px-4 py-2 hover:bg-slate-900/10" href="guess-the-thing"
					>Guess the Thing</a
				>
			</li>
		</ul>
		<help class="flex items-center text-right">
			<button class="mx-2 flex h-12 w-12 items-center justify-center rounded-full">
				<box-icon type="solid" name="help-circle" class="h-10 w-10 opacity-25 hover:opacity-50"
				></box-icon>
			</button>
		</help>
	</nav>
{/if}

<slot />
