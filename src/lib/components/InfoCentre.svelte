<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { userConfig } from '$lib/stores/userConfig.store';
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

	function closeInfoCentre(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		dispatch('close');
	}

	function toggleFancyCode(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if ($userConfig.fancyCodeEnabled) {
			$userConfig.fancyCodeEnabled = false;
		} else {
			$userConfig.fancyCodeEnabled = true;
		}
	}
</script>

<section class="p-4">
	<button
		class="absolute right-0 top-0 m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
		on:click={closeInfoCentre}
	>
		<Icon name="circle-xmark" class="text-theme-neutral-dark"></Icon>
	</button>
	<h1 class="text-theme-accent-dark text-center text-2xl">
		The Desert Bus for Hope Game Studio Information Centre
	</h1>
	<h2 class="text-theme-accent-dark my-2 text-xl">Example game codes</h2>
	<p class="text-theme-neutral-dark">
		Click one of the buttons below to get an example game code you can try out.
	</p>
	<h3 class="text-theme-accent-dark text-lg">This or That</h3>
	<menu>
		<li>
			<button
				class="text-theme-accent-dark m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
				on:click={() => copyExampleGameCode('this-or-that')}
			>
				<Icon name="clipboard" class="text-theme-neutral-dark mx-2"></Icon> Copy example This or That
				code
			</button>
		</li>
		<li>
			<button
				class="text-theme-accent-dark m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
				on:click={() => copyExampleGameCode('this-or-that')}
			>
				<Icon name="floppy-disk" class="text-theme-neutral-dark mx-2"></Icon> Download example This or
				That file
			</button>
		</li>
	</menu>
	<h3 class="text-theme-accent-dark text-lg">Only Connect</h3>
	<p class="text-theme-neutral-dark">Coming soon...</p>
	<h3 class="text-theme-accent-dark text-lg">Who Wants to be a Millionaire</h3>
	<p class="text-theme-neutral-dark">Coming soon...</p>
	<h3 class="text-theme-accent-dark text-lg">Guess the Thing</h3>
	<p class="text-theme-neutral-dark">Coming soon...</p>
	<h2 class="text-theme-accent-dark my-2 text-xl">Settings</h2>
	<table class="w-full">
		<tr>
			<td>
				<button
					class="text-theme-accent-dark m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
					on:click={toggleFancyCode}
				>
					<Icon
						name={$userConfig.fancyCodeEnabled ? 'pen' : 'pen-fancy'}
						class="text-theme-neutral-dark mx-2"
					></Icon>
					{$userConfig.fancyCodeEnabled ? 'Disable' : 'Enable'} fancy code
				</button>
			</td>
			<td>
				<code
					>Code blocks will be displayed in a {$userConfig.fancyCodeEnabled
						? 'fancy cursive'
						: 'regular'} font style</code
				>
			</td>
		</tr>
	</table>
	<h2 class="text-theme-accent-dark my-2 text-xl">Keyboard shortcuts</h2>
	<p class="text-theme-neutral-dark">
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
				><kbd class="rounded bg-slate-200 px-2 text-slate-600 shadow-md ring-1 ring-slate-900/10"
					>Esc</kbd
				></td
			>
			<td class="border p-2">Press twice to close the player and return to the editor</td>
		</tr>
	</table>
	<h2 class="text-theme-accent-dark my-2 text-xl">Contact</h2>
	<p class="text-theme-neutral-dark">
		Issues, suggestions and feature requests can be provided via the GitHib repo. Alternatively I
		can be contacted directly via Mastodon or you can @ me on the LRR Discord.
	</p>
	<ul class="m-2 flex items-center justify-center">
		<li>
			<a
				class="text-theme-accent-dark m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
				href="https://github.com/Kirlac/dbfh-game-studio"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="github" class="fa-xl text-theme-neutral-dark"></Icon><span class="mx-2"
					>Kirlac/dbfh-game-studio</span
				><Icon name="up-right-from-square" class="fa-xs"></Icon>
			</a>
		</li>
		<li>
			<a
				class="text-theme-accent-dark m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
				href="https://mastodon.social/@kirlac@kind.social"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="mastodon" class="fa-xl text-theme-neutral-dark"></Icon><span class="mx-2"
					>@kirlac@kind.social</span
				><Icon name="up-right-from-square" class="fa-xs"></Icon>
			</a>
		</li>
		<li>
			<div class="text-theme-neutral-dark m-2 flex items-center justify-center">
				<Icon name="discord" class="fa-xl"></Icon><span class="mx-2">@Kirlac</span>
			</div>
		</li>
	</ul>
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
