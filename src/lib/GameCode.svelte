<script lang="ts">
	import { fade } from 'svelte/transition';

	export let value: string;
	export let showEditButton = false;
	export let showPlayButton = false;
	export let showCopyButton = false;

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
	class="relative inline-block h-64 w-3/4 rounded-md bg-stone-900/10 text-left ring-1 ring-stone-900/10"
>
	{#if value && (showPlayButton || showEditButton || showCopyButton)}
		<section class="absolute right-0 top-0 flex justify-around">
			{#if showPlayButton}
				<button
					class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={playGame}
				>
					<box-icon name="play"></box-icon> Play
				</button>
			{/if}
			{#if showEditButton}
				<button
					class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={editGame}
				>
					<box-icon type="solid" name="edit"></box-icon> Edit
				</button>
			{/if}
			{#if showCopyButton}
				<button
					class="hover:bg-stone2400 m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10"
					on:click={copyGameCode}
				>
					<box-icon name="clipboard"></box-icon> Copy
				</button>
			{/if}
		</section>
	{/if}

	<pre
		contenteditable="true"
		bind:innerText={value}
		class="h-full w-full overflow-scroll whitespace-break-spaces break-all p-2 {!value
			? 'placeholder text-stone-900/40'
			: ''}"></pre>

	{#if copyStatusVisible}
		<overlay transition:fade class="absolute right-0 top-14">
			<p
				class="relative m-2 inline-block rounded-md {copyStatus === 'Copied'
					? 'bg-green-600/60'
					: 'bg-red-600/60'} p-2 text-center text-stone-100"
			>
				{copyStatus === 'Copied' ? 'Game code copied successfully' : 'Error copying game code'}
			</p>
		</overlay>
	{/if}
</section>

<style>
	.placeholder::before {
		content: 'Paste your game code here';
	}
</style>
