<script lang="ts">
	import '../app.css';
	import { showNav } from './showNav.store';
	$showNav = true;
</script>

{#if $showNav}
	<nav class="flex h-14 w-screen items-center justify-between border-b border-slate-900/10">
		<home class="inline-block w-1/4">
			<a href="/">
				<img src="logo-trans-100.png" alt="Desert Bus for Hope" class="inline-block h-12 w-12" />
				<h1 class="inline-block">Quiz Builders</h1>
			</a>
		</home>
		<ul class="inline-block flex w-1/2 items-center justify-evenly">
			<li class="inline-block"><a href="this-or-that">This or That</a></li>
			<li class="inline-block"><a href="only-connect">Only Connect</a></li>
			<li class="inline-block"><a href="millionaire">Who Wants to be a Millionaire</a></li>
		</ul>
		<help class="inline-block w-1/6 text-right">
			<button class="h-12 w-12 rounded-full text-center ring-1 ring-slate-900/10">?</button>
		</help>
	</nav>
{/if}

<slot />
