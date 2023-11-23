<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { themeList, userConfig } from '$lib/stores/userConfig.store';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	let copyStatus: 'copied' | 'error' = 'error';
	let copyStatusVisible = false;
	// Helper function to show copy status for 2000ms
	function showCopyStatus() {
		copyStatusVisible = true;
		setTimeout(() => {
			copyStatusVisible = false;
		}, 2000);
	}

	async function copyExampleGameCode(gameType: string) {
		const exampleResponse = await fetch(`${gameType}-example.dbfhg`);
		let gameCode = await exampleResponse.text();

		navigator.clipboard.writeText(gameCode).then(
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

	function toggleFancyCode() {
		$userConfig.fancyCodeEnabled = !$userConfig.fancyCodeEnabled;
	}

	function selectTheme(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		// @ts-expect-error: Select options are loaded from an array of the correct values so string should match what's expected but TS linter can't validate them.
		$userConfig.selectedTheme = event.currentTarget.value;
	}

	// Keyup listener for handling key presses
	function handleKeyPress(this: Document, ev: KeyboardEvent) {
		if (ev.key === 'Escape') {
			document.removeEventListener('keyup', handleKeyPress);
			dispatch('close');
		}
	}

	onMount(() => {
		// Bind keyup event listener
		document.addEventListener('keyup', handleKeyPress);
	});
</script>

<section class="h-full w-full p-4">
	<h1 class="text-center text-2xl text-theme-accent-dark">
		The Desert Bus for Hope Game Studio Information Centre
	</h1>
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Example game codes</h2>
	<p class="text-center text-theme-neutral-dark">
		Click one of the buttons below to get an example game code you can try out.
	</p>
	<section class="m-4 grid grid-cols-4 text-center">
		<div>
			<h3 class="text-lg text-theme-accent-dark">This or That</h3>
			<menu>
				<li>
					<button
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 inline-flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
						on:click={() => copyExampleGameCode('this-or-that')}
					>
						<Icon name="clipboard" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Copy example This or That code</span
						>
					</button>
				</li>
				<li>
					<a
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 inline-flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
						href="this-or-that-example.dbfhg"
						download="this-or-that-example.dbfhg"
					>
						<Icon name="floppy-disk" class="text-theme-neutral-dark"></Icon><span class="ml-2"
							>Download example This or That file</span
						>
					</a>
				</li>
			</menu>
		</div>
		<div>
			<h3 class="text-center text-lg text-theme-accent-dark">Only Connect</h3>
			<p class="text-center text-theme-neutral-dark">Coming soon...</p>
		</div>
		<div>
			<h3 class="text-center text-lg text-theme-accent-dark">Who Wants to be a Millionaire</h3>
			<p class="text-center text-theme-neutral-dark">Coming soon...</p>
		</div>
		<div>
			<h3 class="text-center text-lg text-theme-accent-dark">Guess the Thing</h3>
			<p class="text-center text-theme-neutral-dark">Coming soon...</p>
		</div>
	</section>
	{#if copyStatusVisible}
		<div transition:fade class="absolute right-0 top-14">
			<p
				class="relative m-2 inline-block rounded-md {copyStatus === 'copied'
					? 'bg-green-600'
					: 'bg-red-600'} text-stone-100 p-2 text-center"
			>
				{copyStatus === 'copied' ? 'Game code copied successfully' : 'Error copying game code'}
			</p>
		</div>
	{/if}
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Settings</h2>
	<p class="text-center text-theme-neutral-dark">
		Change the way The Desert Bus for Hope Game Studio looks or behaves.
	</p>
	<table class="w-full table-fixed text-theme-neutral-dark">
		<tr>
			<th class="w-32 text-right">Setting</th>
			<th class="w-64 text-center">Value</th>
			<th class="text-left">Effect</th>
		</tr>
		<tr>
			<td class="text-right font-bold">
				<span class="mr-2">Theme</span>
			</td>
			<td class="text-center">
				<div id="theme-selector" class="ml-2 inline-block p-2">
					<select
						class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 rounded-md p-2 text-theme-accent-dark ring-1"
						value={$userConfig?.selectedTheme || 'desert-bus'}
						on:change={selectTheme}
					>
						{#each themeList as theme}
							<option value={theme.key}>
								{theme.value}
							</option>
						{/each}
					</select>
				</div>
			</td>
			<td>
				<div id="theme-palette" class="flex items-center justify-between">
					<div class="h-8 w-8 bg-theme-primary-light ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-primary-dark ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-secondary-light ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-secondary-dark ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-accent-light ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-accent-dark ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-neutral-light ring-1 ring-theme-neutral-dark"></div>
					<div class="h-8 w-8 bg-theme-neutral-dark ring-1 ring-theme-neutral-dark"></div>
				</div>
			</td>
		</tr>
		<tr>
			<td class="text-right font-bold">
				<span class="mr-2">Code Style</span>
			</td>
			<td class="text-center">
				<button
					class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 inline-flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
					on:click={toggleFancyCode}
				>
					{$userConfig.fancyCodeEnabled ? 'Disable' : 'Enable'} fancy code
				</button>
			</td>
			<td class="text-left">
				<code
					>Code blocks will be displayed in a {$userConfig.fancyCodeEnabled
						? 'fancy cursive'
						: 'regular'} font style</code
				>
			</td>
		</tr>
	</table>
	<h2 class="my-2 text-center text-xl text-theme-accent-dark">Keyboard shortcuts</h2>
	<p class="text-center text-theme-neutral-dark">More will be added as required.</p>
	<table class="w-full table-fixed rounded text-theme-neutral-dark">
		<tr>
			<th class="w-64">Shortcut</th>
			<th class="text-left">Action</th>
		</tr>
		<tr>
			<td class="text-center"
				><kbd class="bg-stone-200 text-stone-600 ring-stone-900/10 rounded px-2 shadow-md ring-1"
					>Esc</kbd
				></td
			>
			<td>
				<ul>
					<li><span class="font-bold">Information Centre</span>: Close Information Centre</li>
					<li>
						<span class="font-bold">Player</span>: Press twice to close the player and return to the
						editor. Will return to the home page if no valid game is loaded.
					</li>
				</ul>
			</td>
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
				class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
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
				class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
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
				class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
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
				class="bg-stone-100 ring-stone-900/10 hover:bg-stone-200 m-2 flex items-center justify-center rounded-md p-2 text-theme-accent-dark ring-1"
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
