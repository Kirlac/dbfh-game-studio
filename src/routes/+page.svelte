<script lang="ts">
	import GameCode from '$lib/components/GameCode.svelte';
	import { userConfig } from '$lib/stores/userConfig.store';
</script>

<header class="flex flex-col items-center justify-around text-center">
	{#if $userConfig.selectedTheme === 'dawn-guard'}
		<img
			src="dawn-guard.png"
			alt="Desert Bus for Hope - Dawn Guard Banner"
			class="inline-block w-[200px]"
		/>
	{:else if $userConfig.selectedTheme === 'alpha-flight'}
		<img
			src="alpha-flight.png"
			alt="Desert Bus for Hope - Alpha Flight Banner"
			class="inline-block w-[200px]"
		/>
	{:else if $userConfig.selectedTheme === 'night-watch'}
		<img
			src="night-watch.png"
			alt="Desert Bus for Hope - Night Watch Banner"
			class="inline-block w-[200px]"
		/>
	{:else if $userConfig.selectedTheme === 'zeta-shift'}
		<img
			src="zeta-shift.png"
			alt="Desert Bus for Hope - Zeta Shift Banner"
			class="inline-block w-[200px]"
		/>
	{:else if $userConfig.selectedTheme === 'omega-shift'}
		<img
			src="omega-shift.png"
			alt="Desert Bus for Hope - Omega Shift Banner"
			class="inline-block w-[200px]"
		/>
	{:else}
		<img
			src="logo-2024-trans-200.png"
			alt="Desert Bus for Hope 2024 Logo"
			class="inline-block w-[200px]"
		/>
	{/if}
	<h1 class="m-4 inline-block text-4xl text-theme-accent-light">
		The Desert Bus for Hope Game Studio
	</h1>
</header>

<main class="text-center">
	<h2 class="m-4 inline-block text-2xl">Create a new game</h2>
	<p>Click one of the below buttons to create a new game of that type.</p>
	<nav>
		<ul class="m-2 flex items-center justify-center">
			<li>
				<a
					class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 text-theme-accent-dark ring-1 ring-stone-900/20 hover:bg-stone-200"
					href="this-or-that">This or That</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 text-theme-accent-dark ring-1 ring-stone-900/20 hover:bg-stone-200"
					href="only-connect">Only Connect</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 text-theme-accent-dark ring-1 ring-stone-900/20 hover:bg-stone-200"
					href="millionaire">Who Wants to be a Millionaire?</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 text-theme-accent-dark ring-1 ring-stone-900/20 hover:bg-stone-200"
					href="guess-the-thing">Guess the Thing</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 text-theme-accent-dark ring-1 ring-stone-900/20 hover:bg-stone-200"
					href="silhouette">Who's That Silhouette?</a
				>
			</li>
		</ul>
	</nav>

	<h2 class="m-4 inline-block text-2xl">Play or edit a game</h2>
	<p>
		Paste your game code or drop your Desert Bus for Hope game file into the box below then click
		the play button.
	</p>
	<GameCode showPlayButton showEditButton showDiscardButton showUploadButton></GameCode>
</main>
