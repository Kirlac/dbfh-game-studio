<script lang="ts">
	import '../app.css';
	import { showNav } from './showNav.store';
	$showNav = true;
</script>

{#if $showNav}
	<nav>
		<h1><a href="/">Desert Bus for Hope Quiz Builders</a></h1>
		<h3><a href="this-or-that">This or That</a></h3>
		<h3><a href="only-connect">Only Connect</a></h3>
	</nav>
{/if}

<slot />
