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
	<Player value={gameString}></Player>
	<nav>
		<button on:click={() => (page = 'editor')}>Edit</button>
	</nav>
{:else}
	{#if editorVisible}
		<Editor bind:value={gameString}></Editor>
	{/if}
	<label for="gameString"><h4>Game string</h4></label>
	<textarea id="gameString" bind:value={gameString} placeholder={placeholderText}></textarea>
	<nav>
		<button on:click={copyJsonString}>Copy game string</button>
		<button on:click={toggleEditor}>{editorVisible ? 'Hide' : 'Show'} Editor</button>
		<button on:click={() => (page = 'player')}>Play game</button>
	</nav>
{/if}

<style>
	#gameString {
		display: block;
	}

	nav {
		padding-top: 8px;
	}
</style>
