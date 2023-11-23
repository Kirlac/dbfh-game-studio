<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import InfoCentre from '$lib/components/InfoCentre.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { userConfig } from '$lib/stores/userConfig.store';
	import { browser } from '$app/environment';

	$: isPlayer = $page?.route?.id === '/play';

	let infoCentre: HTMLDialogElement;
	let infoCentreOpen = false;

	function openInfoCentre() {
		infoCentre.showModal();
		infoCentreOpen = true;
	}

	function closeInfoCentre() {
		infoCentre.close();
		infoCentreOpen = false;
	}

	$: toggleFancyCode($userConfig?.fancyCodeEnabled);

	function toggleFancyCode(enable: Boolean = false) {
		if (browser) {
			if (enable) {
				document.documentElement.dataset.fancyCode = 'true';
			} else {
				document.documentElement.dataset.fancyCode = 'false';
			}
		}
	}

	$: applyTheme($userConfig?.selectedTheme);

	function applyTheme(theme: string = 'desert-bus') {
		if (browser) {
			if (theme) {
				document.documentElement.dataset.theme = theme;
			}
		}
	}
</script>

<svelte:head>
	<title>The Desert Bus for Hope Game Studio</title>
</svelte:head>

{#if !isPlayer}
	<a
		class="bg-transparent fixed left-0 top-0 m-2 flex h-12 w-12 items-center justify-center rounded-full text-theme-secondary-dark hover:bg-theme-secondary-dark hover:text-theme-secondary-light"
		href="/"
	>
		<Icon name="bus" class="text-4xl"></Icon>
	</a>

	<button
		class="bg-transparent fixed right-0 top-0 m-2 flex h-12 w-12 items-center justify-center rounded-full text-theme-secondary-dark hover:bg-theme-secondary-dark hover:text-theme-secondary-light"
		on:click={openInfoCentre}
	>
		<Icon name={infoCentreOpen ? 'circle-xmark' : 'circle-info'} class="text-4xl"></Icon>
	</button>
{/if}

<dialog bind:this={infoCentre} class="rounded-md">
	<InfoCentre on:close={closeInfoCentre}></InfoCentre>
</dialog>

<slot />

<style>
	/* ::backdrop {
		background-image: linear-gradient(45deg, magenta, rebeccapurple, dodgerblue, green);
		opacity: 0.75;
	} */
</style>
