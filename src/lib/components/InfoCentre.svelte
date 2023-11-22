<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { themeList, userConfig } from '$lib/stores/userConfig.store';
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

	function selectTheme(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		// @ts-expect-error: Select options are loaded from an array of the correct values so string should match what's expected but TS linter can't validate them.
		$userConfig.selectedTheme = event.currentTarget.value;
	}
</script>

<section class="p-4">
	<button
		class="absolute right-0 top-0 m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 ring-1 ring-slate-900/10 hover:bg-slate-200"
		on:click={closeInfoCentre}
	>
		<Icon name="circle-xmark" class="text-theme-neutral-dark"></Icon>
	</button>
	<h1 class="text-center text-2xl text-theme-accent-dark">
		The Desert Bus for Hope Game Studio Information Centre
	</h1>
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Example game codes</h2>
	<p class="text-center text-theme-neutral-dark">
		Click one of the buttons below to get an example game code you can try out.
	</p>
	<h3 class="text-center text-lg text-theme-accent-dark">This or That</h3>
	<menu>
		<li>
			<button
				class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
				on:click={() => copyExampleGameCode('this-or-that')}
			>
				<Icon name="clipboard" class="text-theme-neutral-dark"></Icon><span class="ml-2"
					>Copy example This or That code</span
				>
			</button>
		</li>
		<li>
			<button
				class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
				on:click={() => copyExampleGameCode('this-or-that')}
			>
				<Icon name="floppy-disk" class="text-theme-neutral-dark"></Icon><span class="ml-2"
					>Download example This or That file</span
				>
			</button>
		</li>
	</menu>
	<h3 class="text-center text-lg text-theme-accent-dark">Only Connect</h3>
	<p class="text-center text-theme-neutral-dark">Coming soon...</p>
	<h3 class="text-center text-lg text-theme-accent-dark">Who Wants to be a Millionaire</h3>
	<p class="text-center text-theme-neutral-dark">Coming soon...</p>
	<h3 class="text-center text-lg text-theme-accent-dark">Guess the Thing</h3>
	<p class="text-center text-theme-neutral-dark">Coming soon...</p>
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
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Settings</h2>
	<table class="w-full">
		<tr>
			<td>
				<button
					class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
					on:click={toggleFancyCode}
				>
					<Icon
						name={$userConfig.fancyCodeEnabled ? 'pen' : 'pen-fancy'}
						class="text-theme-neutral-dark"
					></Icon><span class="ml-2"
						>{$userConfig.fancyCodeEnabled ? 'Disable' : 'Enable'} fancy code</span
					>
				</button>
			</td>
			<td class="text-center">
				<code
					>Code blocks will be displayed in a {$userConfig.fancyCodeEnabled
						? 'fancy cursive'
						: 'regular'} font style</code
				>
			</td>
		</tr>
		<tr>
			<td>
				<div id="theme-selector" class="ml-2 p-2">
					<Icon name="palette" class="text-theme-neutral-dark"></Icon>
					<select
						class="m-2 rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
						value={$userConfig?.selectedTheme || 'desert-bus'}
						on:change={selectTheme}
					>
						{#each themeList as theme}
							<option value={theme}>
								{theme}
							</option>
						{/each}
					</select>
				</div>
			</td>
			<td>
				<div id="theme-palette" class="flex items-center justify-around">
					<div class="h-8 w-8 bg-theme-primary-light ring-1"></div>
					<div class="h-8 w-8 bg-theme-primary-dark ring-1"></div>
					<div class="h-8 w-8 bg-theme-secondary-light ring-1"></div>
					<div class="h-8 w-8 bg-theme-secondary-dark ring-1"></div>
					<div class="h-8 w-8 bg-theme-accent-light ring-1"></div>
					<div class="h-8 w-8 bg-theme-accent-dark ring-1"></div>
					<div class="h-8 w-8 bg-theme-neutral-light ring-1"></div>
					<div class="h-8 w-8 bg-theme-neutral-dark ring-1"></div>
				</div>
			</td>
		</tr>
	</table>
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Keyboard shortcuts</h2>
	<p class="text-center text-theme-neutral-dark">
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
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Contact</h2>
	<p class="text-center text-theme-neutral-dark">
		Issues, suggestions and feature requests can be provided via the GitHib repo. Alternatively I
		can be contacted directly via Mastodon or you can @ me on the LRR Discord.
	</p>
	<ul class="m-2 flex items-center justify-center">
		<li>
			<a
				class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
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
				class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
				href="https://kind.social/@kirlac"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="mastodon" class="fa-xl text-theme-neutral-dark"></Icon><span class="mx-2"
					>@kirlac@kind.social</span
				><Icon name="up-right-from-square" class="fa-xs"></Icon>
			</a>
		</li>
		<li>
			<div class="m-2 flex items-center justify-center text-theme-neutral-dark">
				<Icon name="discord" class="fa-xl"></Icon><span class="ml-2">@Kirlac</span>
			</div>
		</li>
	</ul>
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Desert Bus for Hope</h2>
	<ul class="m-2 flex items-center justify-center">
		<li>
			<a
				class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
				href="https://desertbus.org/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="globe" class="fa-xl text-theme-neutral-dark"></Icon><span class="mx-2"
					>https://desertbus.org/</span
				><Icon name="up-right-from-square" class="fa-xs"></Icon>
			</a>
		</li>
		<li>
			<a
				class="m-2 flex items-center justify-center rounded-md bg-slate-100 p-2 text-theme-accent-dark ring-1 ring-slate-900/10 hover:bg-slate-200"
				href="https://kind.social/@desertbus"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="mastodon" class="fa-xl text-theme-neutral-dark"></Icon><span class="mx-2"
					>@desertbus@kind.social</span
				><Icon name="up-right-from-square" class="fa-xs"></Icon>
			</a>
		</li>
	</ul>
</section>
