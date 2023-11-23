<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import InfoCentre from '$lib/components/InfoCentre.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { userConfig } from '$lib/stores/userConfig.store';
	import { browser } from '$app/environment';

	$: isPlayer = $page?.route?.id === '/play';

	let infoCentreOpen = false;

	function toggleInfoCentre() {
		infoCentreOpen = !infoCentreOpen;
	}

	let infoCentreButton: HTMLButtonElement;
	function closeInfoCentre() {
		infoCentreOpen = false;
		// Blur to remove focus when Info Centre is closed with the Esc key
		infoCentreButton?.blur();
	}

	$: if (browser) {
		infoCentreOpen
			? document.body.classList.add('overflow-hidden')
			: document.body.classList.remove('overflow-hidden');
	}

	$: setFancyCode($userConfig?.fancyCodeEnabled);

	function setFancyCode(enable: Boolean = false) {
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
		title="Home"
		class="bg-transparent fixed left-0 top-0 m-6 flex h-12 w-12 items-center justify-center rounded-full text-theme-secondary-dark hover:bg-theme-secondary-dark hover:text-theme-secondary-light"
		href="/"
	>
		<Icon name="bus" class="text-4xl"></Icon>
	</a>

	<button
		title="Information Centre"
		class="bg-transparent fixed right-0 top-0 z-50 m-6 flex h-12 w-12 items-center justify-center rounded-full text-theme-secondary-dark hover:bg-theme-secondary-dark hover:text-theme-secondary-light"
		bind:this={infoCentreButton}
		on:click={toggleInfoCentre}
	>
		<Icon name={infoCentreOpen ? 'circle-xmark' : 'circle-info'} class="text-4xl"></Icon>
	</button>
{/if}

{#if infoCentreOpen}
	<section
		class="fixed bottom-4 left-4 right-4 top-4 z-40 overflow-scroll rounded-md bg-theme-neutral-light"
	>
		<InfoCentre on:close={closeInfoCentre}></InfoCentre>
	</section>
{/if}

<slot />
