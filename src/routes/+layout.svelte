<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import HelpCentre from '$lib/components/HelpCentre.svelte';
	import Icon from '$lib/components/Icon.svelte';

	$: isPlayer = $page?.route?.id === '/play';

	let helpCentre: HTMLDialogElement;

	function openHelpCentre(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		helpCentre.showModal();
	}

	function closeHelpCentre(e: CustomEvent<any>): void {
		helpCentre.close();
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
		on:click={openHelpCentre}
	>
		<Icon name="circle-info" class="h-full w-full text-stone-400 hover:text-stone-600"></Icon>
	</button>
{/if}

<dialog bind:this={helpCentre}>
	<HelpCentre on:close={closeHelpCentre}></HelpCentre>
</dialog>

<slot />

<style>
	/* ::backdrop {
		background-image: linear-gradient(45deg, magenta, rebeccapurple, dodgerblue, green);
		opacity: 0.75;
	} */
</style>
