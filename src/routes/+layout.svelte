<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import InfoCentre from '$lib/components/InfoCentre.svelte';
	import Icon from '$lib/components/Icon.svelte';

	$: isPlayer = $page?.route?.id === '/play';

	let infoCentre: HTMLDialogElement;

	function openInfoCentre(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		infoCentre.showModal();
	}

	function closeInfoCentre(e: CustomEvent<any>): void {
		infoCentre.close();
	}
</script>

<svelte:head>
	<title>The Desert Bus for Hope Game Studio</title>
</svelte:head>

{#if !isPlayer}
	<a class="fixed left-0 top-0 m-2 h-12 w-12 rounded-md hover:bg-stone-200" href="/">
		<Icon name="bus" class="h-full w-full text-stone-400 hover:text-stone-600"></Icon>
	</a>

	<button
		class="fixed right-0 top-0 m-2 h-12 w-12 rounded-full hover:bg-stone-200"
		on:click={openInfoCentre}
	>
		<Icon name="circle-info" class="h-full w-full text-stone-400 hover:text-stone-600"></Icon>
	</button>
{/if}

<dialog bind:this={infoCentre}>
	<InfoCentre on:close={closeInfoCentre}></InfoCentre>
</dialog>

<slot />

<style>
	/* ::backdrop {
		background-image: linear-gradient(45deg, magenta, rebeccapurple, dodgerblue, green);
		opacity: 0.75;
	} */
</style>
