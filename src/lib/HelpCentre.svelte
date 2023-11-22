<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	let copyStatus: 'Copied' | 'Error' = 'Error';
	let copyStatusVisible = false;
	// Helper function to show copy status for 2000ms
	function showCopyStatus() {
		copyStatusVisible = true;
		setTimeout(() => {
			copyStatusVisible = false;
		}, 2000);
	}

	async function copyExampleGameCode(gameType: string) {
		const exampleResponse = await fetch('this-or-that-example.dbfhg');
		let gameCode = await exampleResponse.text();

		const type = 'text/plain';
		const blob = new Blob([gameCode], { type });
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

	function closeHelpCentre(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		dispatch('close');
	}

	let fancyCodeEnabled = false;

	onMount(() => {
		if (document?.body?.dataset?.codeFont === 'fancy') {
			fancyCodeEnabled = true;
		} else {
			fancyCodeEnabled = false;
		}
	});

	function toggleFancyCode(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (fancyCodeEnabled) {
			fancyCodeEnabled = false;
			document.body.dataset.codeFont = 'regular';
		} else {
			fancyCodeEnabled = true;
			document.body.dataset.codeFont = 'fancy';
		}
	}
</script>

<section class="p-4">
	<button
		class="absolute right-0 top-0 m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
		on:click={closeHelpCentre}
	>
		<Icon name="circle-xmark"></Icon>
	</button>
	<h1>The Desert Bus for Hope Game Studio Help Centre</h1>
	<h2>Example game codes</h2>
	<p>Click one of the buttons below to get an example game code you can try out.</p>
	<menu>
		<li>
			<button
				class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
				on:click={() => copyExampleGameCode('this-or-that')}
			>
				<Icon name="clipboard" class="mx-2"></Icon> Copy example This or That code
			</button>
		</li>
		<li>
			<button
				class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
				on:click={() => copyExampleGameCode('this-or-that')}
			>
				<Icon name="floppy-disk" class="mx-2"></Icon> Download example This or That file
			</button>
		</li>
	</menu>
	<h2>Settings</h2>
	<menu>
		<li>
			<button
				class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
				on:click={toggleFancyCode}
			>
				<Icon name={fancyCodeEnabled ? 'pen' : 'pen-fancy'} class="mx-2"></Icon>
				{fancyCodeEnabled ? 'Disable' : 'Enable'} fancy code
			</button>
		</li>
	</menu>
	<h2>Keyboard shortcuts</h2>
	<p>
		Currently none, except for the one to close the player. More will be added when I set up a
		global keypress listener.
	</p>
	<table class="w-full">
		<tr>
			<th class="border p-2">Shortcut</th>
			<th class="border p-2">Action</th>
		</tr>
		<tr>
			<td class="border p-2"
				><kbd class="rounded bg-stone-200 px-2 text-stone-600 shadow-md ring-1 ring-stone-900/10"
					>Esc</kbd
				></td
			>
			<td class="border p-2">Press twice to close the player and return to the editor</td>
		</tr>
	</table>
	<h2>Support</h2>
	<p>
		Issues, suggestions and feature requests can be provided via the GitHib repo. Or I can be
		contacted directly via the LRR Discord or Mastodon.
	</p>
	<ul class="m-2 flex items-center justify-center">
		<li>
			<div class="m-2 flex items-center justify-center">
				<Icon name="discord" class="mx-4"></Icon> @Kirlac
			</div>
		</li>
		<li>
			<a
				class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
				href="https://mastodon.social/@kirlac@kind.social"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="mastodon" class="mx-4"></Icon> @kirlac@kind.social <Icon
					name="up-right-from-square"
					class="mx-2 h-2 w-2"
				></Icon>
			</a>
		</li>
		<li>
			<a
				class="m-2 flex items-center justify-center rounded-md bg-stone-100 p-2 ring-1 ring-stone-900/10 hover:bg-stone-200"
				href="https://github.com/Kirlac/dbfh-game-studio"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="github" class="mx-4"></Icon> Kirlac/dbfh-game-studio <Icon
					name="up-right-from-square"
					class="mx-2 h-2 w-2"
				></Icon>
			</a>
		</li>
	</ul>
	{#if copyStatusVisible}
		<div transition:fade class="absolute right-0 top-14">
			<p
				class="relative m-2 inline-block rounded-md {copyStatus === 'Copied'
					? 'bg-green-600/60'
					: 'bg-red-600/60'} p-2 text-center text-stone-100"
			>
				{copyStatus === 'Copied' ? 'Game code copied successfully' : 'Error copying game code'}
			</p>
		</div>
	{/if}
</section>
