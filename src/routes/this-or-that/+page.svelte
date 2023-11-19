<script lang="ts">
	import Editor from './editor.svelte';
	import Player from './player.svelte';

	let page: 'editor' | 'player' = 'editor';
	let editorVisible = false;
	let placeholderText = "{ 'json': 'example' }";
	let gameString = '';

	function toggleEditor() {
		editorVisible = !editorVisible;
	}

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

{#if page === 'player'}
	<Player value={gameString} on:close={() => (page = 'editor')}></Player>
{:else}
	{#if editorVisible}
		<Editor bind:value={gameString}></Editor>
	{/if}
	<label for="gameString"><h4>Game string</h4></label>
	<textarea
		id="gameString"
		bind:value={gameString}
		placeholder={placeholderText}
		class="w-80 resize-none rounded-md p-2 ring-1 ring-slate-900/10"
	></textarea>
	<nav class="w-full border-b bg-white md:static md:border-0">
		<button on:click={copyJsonString}>Copy game string</button>
		<button on:click={toggleEditor}>{editorVisible ? 'Hide' : 'Show'} Editor</button>
		<button on:click={() => (page = 'player')}>Play game</button>
	</nav>
{/if}
