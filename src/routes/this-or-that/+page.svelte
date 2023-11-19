<script lang="ts">
	import type { GameData } from '$lib/gameData';
	import Player from './player.svelte';

	let mode: 'edit' | 'play' = 'edit';
	let gameData: GameData = { gameType: 'thisOrThat', title: {}, questions: [], end: {} };
	$: gameString = JSON.stringify(gameData, null, 2);

	let placeholderText = "{ 'json': 'example' }";

	function copyJsonString() {
		const type = 'text/plain';
		const blob = new Blob([gameString], { type });
		const data = [new ClipboardItem({ [type]: blob })];

		navigator.clipboard.write(data).then(
			() => {
				/* success */
			},
			() => {
				/* failure */
			}
		);
	}
</script>

{#if mode === 'play'}
	<Player value={gameData} on:close={() => (mode = 'edit')}></Player>
{:else}
	<h2>Editor</h2>

	<section>
		<button
			class="m-2 rounded-md p-2 ring-1 ring-slate-900/10 hover:bg-slate-900/10"
			on:click={copyJsonString}>Copy game string</button
		>
		<button
			class="m-2 rounded-md p-2 ring-1 ring-slate-900/10 hover:bg-slate-900/10"
			on:click={() => (mode = 'play')}>Play game</button
		>
	</section>
	<textarea
		id="gameString"
		bind:value={gameString}
		placeholder={placeholderText}
		class="m-2 h-64 w-3/4 resize-none rounded-md p-2 ring-1 ring-slate-900/10"
	></textarea>
{/if}
