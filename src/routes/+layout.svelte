<script lang="ts">
	import '../app.css';
	import { showNav } from './showNav.store';
	$showNav = true;
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
			<li class="inline-block"><a href="this-or-that">This or That</a></li>
			<li class="inline-block"><a href="only-connect">Only Connect</a></li>
			<li class="inline-block"><a href="millionaire">Who Wants to be a Millionaire</a></li>
			<li class="inline-block"><a href="guess-the-thing">Guess the Thing</a></li>
		</ul>
		<help class="flex items-center text-right">
			<button class="mx-2 h-12 w-12 rounded-full text-center ring-1 ring-slate-900/10">?</button>
		</help>
	</nav>
{/if}

<slot />
