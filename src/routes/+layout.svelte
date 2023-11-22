<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import InfoCentre from '$lib/components/InfoCentre.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { userConfig } from '$lib/stores/userConfig.store';
	import { browser } from '$app/environment';

	$: isPlayer = $page?.route?.id === '/play';

	let infoCentre: HTMLDialogElement;

	function openInfoCentre(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		infoCentre.showModal();
	}

	function closeInfoCentre(e: CustomEvent<any>): void {
		infoCentre.close();
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
		class="hover:bg-theme-secondary-light text-theme-secondary-light hover:text-theme-neutral-light fixed left-0 top-0 m-2 flex h-12 w-12 items-center justify-center rounded-full bg-transparent"
		href="/"
	>
		<Icon name="bus" class="text-4xl"></Icon>
	</a>

	<button
		class="hover:bg-theme-secondary-light text-theme-secondary-light hover:text-theme-neutral-light fixed right-0 top-0 m-2 flex h-12 w-12 items-center justify-center rounded-full bg-transparent"
		on:click={openInfoCentre}
	>
		<Icon name="circle-info" class="text-4xl"></Icon>
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
