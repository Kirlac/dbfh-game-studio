<script lang="ts">
	import GameCode from '$lib/GameCode.svelte';

	function decodeGameCode(e: CustomEvent<any>): void {
		throw new Error('Function not implemented.');
	}
</script>

<header class="text-center">
	<img src="logo-2024-trans-200.png" alt="Desert Bus for Hope" class="inline-block" />
	<br />
	<h1 class="m-4 inline-block text-4xl">The Desert Bus <s>2023</s> 2024 Quiz Builder</h1>
</header>

<section class="text-center">
	<h2 class="m-4 inline-block text-2xl">Create a new game</h2>
	<p>Click one of the below buttons to create a new game of that type.</p>
	<ul class="m-2 flex items-center justify-center">
		<li>
			<a
				class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 ring-1 ring-stone-900/20 hover:bg-stone-200"
				href="this-or-that">This or That</a
			>
		</li>
		<li>
			<a
				class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 ring-1 ring-stone-900/20 hover:bg-stone-200"
				href="only-connect">Only Connect</a
			>
		</li>
		<li>
			<a
				class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 ring-1 ring-stone-900/20 hover:bg-stone-200"
				href="millionaire">Who Wants to be a Millionaire</a
			>
		</li>
		<li>
			<a
				class="m-2 inline-block rounded-md bg-stone-50 px-4 py-2 ring-1 ring-stone-900/20 hover:bg-stone-200"
				href="guess-the-thing">Guess the Thing</a
			>
		</li>
	</ul>
</section>

<section class="text-center">
	<h2 class="m-4 inline-block text-2xl">Play or edit a game</h2>
	<br />
	<p>Paste your game code in the box below then click the play button.</p>
	<br />
	<GameCode value="" showEditButton showPlayButton on:change={decodeGameCode}></GameCode>
</section>
