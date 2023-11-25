<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { base64ToString, stringToBase64 } from '$lib/utils/base64Encoder';

	export let value: string;
	export let showPlayButton = false;
	export let showEditButton = false;
	export let showDiscardButton = false;
	export let showUploadButton = false;
	export let showCopyButton = false;

	export let placeholderText =
		'Paste your game code or drop your Desert Bus for Hope game file here';
	let placeholderDisplayText = placeholderText;

	let copyStatus: 'copied' | 'error' = 'error';
	let copyStatusVisible = false;
	// Helper function to show copy status for 2000ms
	function showCopyStatus(timeoutMs: number = 2000) {
		copyStatusVisible = true;
		setTimeout(() => {
			copyStatusVisible = false;
		}, timeoutMs);
	}

	function playGame() {
		goto('/play', { replaceState: false });
	}

	let emptyGame = {};
	let emptyGameJson = JSON.stringify(emptyGame);
	let emptyGameBase64 = stringToBase64(emptyGameJson);

	let gameDataJson = '{}';

	$: try {
		gameDataJson = base64ToString(value) || '{}';
	} catch (error) {
		console.log(error);
		gameDataJson = '{}';
	}

	$: gameData = JSON.parse(gameDataJson);

	function editGame() {
		if (gameData?.gameType) {
			goto(`/${gameData.gameType}`, { replaceState: false });
		}
	}

	function discardGame() {
		//value = emptyGameBase64;
		value = '';
	}

	async function parseGameFile(file: File | null) {
		if (file) {
			let fileContents = await file.text();
			if (fileContents) {
				// TODO: Validate file
				value = fileContents;
			}
		}
	}

	function uploadGame(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		console.log(event.currentTarget.files);
		if (event.currentTarget.files?.[0]) {
			parseGameFile(event.currentTarget.files[0]);
			// Clear file list so the same file can be uploaded again if it gets discarded
			// Without this the change event does not fire because the file is already in the list
			let dt = new DataTransfer();
			event.currentTarget.files = dt.files;
		}
	}

	function copyGameCode() {
		navigator.clipboard.writeText(value).then(
			() => {
				/* success */
				copyStatus = 'copied';
				showCopyStatus();
			},
			() => {
				/* failure */
				copyStatus = 'error';
				showCopyStatus();
			}
		);
	}

	let dragEnterCounter = 0;
	let dragging = false;
	let dropValid: boolean | undefined = undefined;

	$: if (dragEnterCounter < 1) {
		dragging = false;
		placeholderDisplayText = placeholderText;
	} else {
		dragging = true;
		placeholderDisplayText = 'Drop your Desert Bus for Hope game file here';
	}

	function handleDragEnter(event: DragEvent & { currentTarget: EventTarget & Window }) {
		event.preventDefault();
		dragEnterCounter++;
		dropValid = undefined;
	}

	function handleDragLeave(event: DragEvent & { currentTarget: EventTarget & Window }) {
		event.preventDefault();
		dragEnterCounter--;
	}

	// File drag and drop handling logic copied and adapted from MDN docs
	// see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
	function handleDrop(event: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		// Prevent default behavior (Prevent file from being opened)
		event.preventDefault();
		dragEnterCounter = 0;

		if (event.dataTransfer) {
			if (event.dataTransfer?.items[0]) {
				// Get file from dataTransfer.items
				let item = event.dataTransfer.items[0];
				if (item.kind === 'file') {
					parseGameFile(item.getAsFile());
				}
			} else {
				// Get file from dataTransfer.Files
				parseGameFile(event.dataTransfer.files[0]);
			}
		}
	}

	function handleDragOver(event: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		// Prevent default behavior (Prevent file from being opened)
		event.preventDefault();
		if (event.dataTransfer?.items || event.dataTransfer?.files) {
			if (event.dataTransfer.items.length != 1 && event.dataTransfer.files.length != 1) {
				dropValid = false;
				placeholderDisplayText = 'Only upload one game file at a time please';
			} else {
				dropValid = true;
				placeholderDisplayText = 'Everything looks good so far';
			}
		}
	}
</script>

<svelte:window on:dragenter={handleDragEnter} on:dragleave={handleDragLeave} />

<section
	class="relative inline-block h-64 w-3/4 rounded-md text-left text-theme-neutral-dark/40 ring-1 ring-stone-900/10 {!dragging
		? 'bg-stone-50 hover:bg-stone-200 focus:bg-stone-200'
		: dropValid === true
		  ? 'bg-theme-accent-light/80 text-theme-neutral-light outline-dashed outline-4 outline-offset-4 outline-theme-accent-light '
		  : dropValid === false
		    ? 'bg-theme-status-error/60 text-theme-neutral-light outline-dashed outline-4 outline-offset-4 outline-theme-status-error'
		    : 'bg-stone-50 outline-dashed outline-4 outline-offset-4 outline-stone-50'}"
	role="form"
	on:dragover={handleDragOver}
	on:drop={handleDrop}
>
	{#if showPlayButton || showEditButton || showDiscardButton || showUploadButton || showCopyButton}
		<menu class="absolute right-0 top-0 flex justify-around">
			{#if value && showPlayButton}
				<li>
					<button
						class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={playGame}
					>
						<Icon name="play" class="text-theme-neutral-dark"></Icon><span class="ml-2">Play</span>
					</button>
				</li>
			{/if}
			{#if value && showEditButton}
				<li>
					<button
						class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={editGame}
					>
						<Icon name="pen-to-square" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Edit</span
						>
					</button>
				</li>
			{/if}
			{#if value && showDiscardButton}
				<li>
					<button
						class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={discardGame}
					>
						<Icon name="trash-can" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Discard</span
						>
					</button>
				</li>
			{/if}
			{#if showUploadButton}
				<li>
					<label
						for="gameUpload"
						class="m-2 flex cursor-pointer items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					>
						<Icon name="file-arrow-up" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Upload</span
						>
					</label>
					<input
						id="gameUpload"
						name="gameUpload"
						type="file"
						class="h-0 w-0 opacity-0"
						on:change={uploadGame}
					/>
				</li>
			{/if}
			{#if value && showCopyButton}
				<li>
					<button
						class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={copyGameCode}
					>
						<Icon name="clipboard" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Copy</span
						>
					</button>
				</li>
			{/if}
		</menu>
	{/if}

	<pre
		contenteditable="true"
		bind:innerText={value}
		class="h-full w-full overflow-scroll whitespace-break-spaces break-all rounded-md p-2 {value
			? 'text-theme-neutral-dark'
			: 'placeholder'}"
		data-placeholder-text={placeholderDisplayText}></pre>

	{#if copyStatusVisible}
		<div transition:fade class="absolute right-0 top-14">
			<p
				class="relative m-2 inline-block rounded-md {copyStatus === 'copied'
					? 'bg-theme-status-success'
					: 'bg-theme-status-error'} p-2 text-center text-stone-100"
			>
				{copyStatus === 'copied' ? 'Game code copied successfully' : 'Error copying game code'}
			</p>
		</div>
	{/if}
</section>

<style>
	.placeholder::before {
		content: attr(data-placeholder-text);
	}
</style>
