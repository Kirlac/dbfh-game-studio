<script lang="ts">
	import { gameData } from '$lib/stores/gameData.store';
</script>

{#if $gameData}
	<form class="my-6 inline-block w-3/4">
		<section class="grid grid-cols-1 gap-4 text-left">
			<h2 class="text-center text-2xl text-theme-accent-light">Title Card</h2>
			<div class="block">
				<label for="title" class="m-2 p-2 text-theme-neutral-light">Game Title</label>
				<input
					id="title"
					name="title"
					type="text"
					class="m-2 block w-full rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					value={$gameData.titleCard?.gameTitle}
				/>
			</div>
			<div class="block">
				<label for="description" class="m-2 p-2 text-theme-neutral-light">Game Description</label>
				<textarea
					id="description"
					name="description"
					class="m-2 block w-full rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					value={$gameData.titleCard?.gameDescription}
				/>
			</div>
			<div class="block">
				<label for="title-image" class="m-2 p-2 text-theme-neutral-light">Title Card Image</label>
				<input
					id="title-image"
					name="title-image"
					type="text"
					disabled={true}
					class="m-2 block w-full rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					value="TODO: Implement image processing"
				/>
			</div>
		</section>
		<section class="grid grid-cols-1 gap-4 text-left">
			<h2 class="text-center text-2xl text-theme-accent-light">Questions</h2>
			{#each $gameData.questions || [{}] as question, i}
				<div class="block">
					<label for="question-{i + 1}-text" class="m-2 p-2 text-theme-neutral-light"
						>Question #{i + 1}</label
					>
					<input
						id="question-{i + 1}-text"
						name="question-{i + 1}-text"
						type="text"
						class="m-2 block w-full rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						value={$gameData.questions?.[i].questionText}
					/>
				</div>
				<div class="block">
					<label for="question-{i + 1}-image" class="m-2 p-2 text-theme-neutral-light"
						>Image #{i + 1}</label
					>
					<input
						id="question-{i + 1}-image"
						name="question-{i + 1}-image"
						type="text"
						disabled={true}
						class="m-2 block w-full rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						value="TODO: Implement image processing"
					/>
					<div class="text-center">
						<img
							alt="Question {i + 1} image"
							class="inline-block w-1/2"
							src={$gameData.questions?.[i].questionImage}
						/>
					</div>
				</div>
			{/each}
		</section>
	</form>
{/if}
