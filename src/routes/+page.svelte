<script lang="ts">
	import GameCode from '$lib/components/GameCode.svelte';
</script>

<header class="flex flex-col items-center justify-around text-center">
	<img src="logo-2024-trans-200.png" alt="Desert Bus for Hope" class="inline-block w-[200px]" />
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
					class="m-2 inline-block rounded-md bg-slate-50 px-4 py-2 text-theme-accent-dark ring-1 ring-slate-900/20 hover:bg-slate-200"
					href="this-or-that">This or That</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-slate-50 px-4 py-2 text-theme-accent-dark ring-1 ring-slate-900/20 hover:bg-slate-200"
					href="only-connect">Only Connect</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-slate-50 px-4 py-2 text-theme-accent-dark ring-1 ring-slate-900/20 hover:bg-slate-200"
					href="millionaire">Who Wants to be a Millionaire</a
				>
			</li>
			<li>
				<a
					class="m-2 inline-block rounded-md bg-slate-50 px-4 py-2 text-theme-accent-dark ring-1 ring-slate-900/20 hover:bg-slate-200"
					href="guess-the-thing">Guess the Thing</a
				>
			</li>
		</ul>
	</nav>

	<h2 class="m-4 inline-block text-2xl">Play or edit a game</h2>
	<p>
		Paste your game code or drop your .dbfhg file into the box below then click the play button.
	</p>
	<GameCode value="" showPlayButton showEditButton showDiscardButton></GameCode>
</main>
