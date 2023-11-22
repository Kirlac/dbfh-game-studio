<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let value: string;
	export let showEditButton = false;
	export let showPlayButton = false;
	export let showCopyButton = false;
	export let placeholderText = 'Paste your game code or drop your .dbfhg file here';

	let copyStatus: 'Copied' | 'Error' = 'Error';
	let copyStatusVisible = false;
	// Helper function to show copy status for 2000ms
	function showCopyStatus() {
		copyStatusVisible = true;
		setTimeout(() => {
			copyStatusVisible = false;
		}, 2000);
	}

	function playGame() {
		let mode = 'play';
	}

	function copyGameCode() {
		const type = 'text/plain';
		const blob = new Blob([value], { type });
		const data = [new ClipboardItem({ [type]: blob })];

		navigator.clipboard.write(data).then(
			() => {
				/* success */
				copyStatus = 'Copied';
				showCopyStatus();
			},
			() => {
				/* failure */
				copyStatus = 'Error';
				showCopyStatus();
			}
		);
	}

	function editGame(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		throw new Error('Function not implemented.');
	}

	function tryParseCode(event: Event & { currentTarget: EventTarget & HTMLElement }) {
		let code = event.currentTarget.innerText;
		if (code) {
			value = code;
		}
		console.log(value);
	}
</script>

<section
	class="relative inline-block h-64 w-3/4 rounded-md bg-slate-50 text-left ring-1 ring-slate-900/10 hover:bg-slate-200 focus:bg-slate-200"
>
	{#if value && (showPlayButton || showEditButton || showCopyButton)}
		<menu class="absolute right-0 top-0 flex justify-around">
			{#if showPlayButton}
				<li>
					<button
						class="text-dbfh-text m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
						on:click={playGame}
					>
						<Icon name="play" class="mx-2"></Icon> Play
					</button>
				</li>
			{/if}
			{#if showEditButton}
				<li>
					<button
						class="text-dbfh-text m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
						on:click={editGame}
					>
						<Icon name="pen-to-square" class="mx-2"></Icon> Edit
					</button>
				</li>
			{/if}
			{#if showCopyButton}
				<li>
					<button
						class="text-dbfh-text m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
						on:click={copyGameCode}
					>
						<Icon name="clipboard" class="mx-2"></Icon> Copy
					</button>
				</li>
			{/if}
		</menu>
	{/if}

	<pre
		contenteditable="true"
		bind:innerText={value}
		class="h-full w-full overflow-scroll whitespace-break-spaces break-all p-2 {!value
			? 'placeholder text-slate-900/40'
			: 'text-dbfh-text'}"
		data-placeholder-text={placeholderText}></pre>

	{#if copyStatusVisible}
		<div transition:fade class="absolute right-0 top-14">
			<p
				class="relative m-2 inline-block rounded-md {copyStatus === 'Copied'
					? 'bg-green-600/60'
					: 'bg-red-600/60'} p-2 text-center text-slate-100"
			>
				{copyStatus === 'Copied' ? 'Game code copied successfully' : 'Error copying game code'}
			</p>
		</div>
	{/if}
</section>

<style>
	.placeholder::before {
		content: attr(data-placeholder-text);
	}
</style>
