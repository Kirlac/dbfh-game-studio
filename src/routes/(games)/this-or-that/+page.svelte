<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { gameData } from '$lib/stores/gameData.store';
	import { defaultAnswer, defaultHint, defaultQuestion } from './defaultGameData';

	function addNewQuestion() {
		if ($gameData) {
			$gameData.questions = [...$gameData.questions, defaultQuestion];
		}
	}

	function removeQuestion(questionIndex: number) {
		if ($gameData) {
			$gameData.questions = $gameData.questions.toSpliced(questionIndex, 1);
		}
	}

	function addNewHint(questionIndex: number): any {
		if ($gameData) {
			$gameData.questions[questionIndex].hintText = [
				...($gameData.questions[questionIndex].hintText || []),
				''
			];
		}
	}

	function removeHint(questionIndex: number, hintIndex: number): any {
		if ($gameData) {
			$gameData.questions[questionIndex].hintText = $gameData.questions[
				questionIndex
			].hintText?.toSpliced(hintIndex, 1);
		}
	}

	function addNewAnswer(questionIndex: number): any {
		if ($gameData) {
			$gameData.questions[questionIndex].answerOptions = [
				...($gameData.questions[questionIndex].answerOptions || []),
				defaultAnswer
			];
		}
	}

	function removeAnswer(questionIndex: number, answerIndex: number): any {
		if ($gameData) {
			$gameData.questions[questionIndex].answerOptions = $gameData.questions[
				questionIndex
			].answerOptions.toSpliced(answerIndex, 1);

			if ($gameData.questions[questionIndex].correctAnswerIndex >= answerIndex) {
				setCorrectAnswer(questionIndex, $gameData.questions[questionIndex].correctAnswerIndex - 1);
			}
		}
	}

	function setCorrectAnswer(questionIndex: number, answerIndex: number): any {
		if ($gameData) {
			$gameData.questions[questionIndex].correctAnswerIndex = answerIndex;
		}
	}
</script>

{#if $gameData}
	<div class="my-4 inline-block w-3/4">
		<h2 class="mt-6 text-center text-3xl text-theme-accent-light">Title Card</h2>
		<section
			class="my-4 grid grid-cols-1 gap-4 rounded-md bg-theme-primary-light p-4 text-left ring-2 ring-theme-accent-light"
		>
			<div class="block">
				<label for="title" class="text-theme-neutral-light">Game Title</label>
				<input
					id="title"
					name="title"
					type="text"
					class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					bind:value={$gameData.titleCard.gameTitle}
				/>
			</div>
			<div class="block">
				<label for="description" class="text-theme-neutral-light">Game Description</label>
				<textarea
					id="description"
					name="description"
					class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					bind:value={$gameData.titleCard.gameDescription}
				/>
			</div>
			<div class="block">
				<label for="title-image" class="text-theme-neutral-light">Title Card Image</label>
				<input
					id="title-image"
					name="title-image"
					type="text"
					disabled={true}
					class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					value="TODO: Implement image processing"
				/>
				{#if $gameData.titleCard.titleImage}
					<div class="text-center">
						<img
							alt="Title card graphic"
							class="inline-block w-1/2"
							src={$gameData.titleCard.titleImage}
						/>
					</div>
				{/if}
			</div>
		</section>
		<h2 class="mt-6 text-center text-3xl text-theme-accent-light">Questions</h2>
		{#each $gameData.questions || [defaultQuestion] as question, questionIndex}
			<section
				class="my-4 grid grid-cols-1 gap-4 rounded-md bg-theme-primary-light p-4 text-left ring-2 ring-theme-accent-light"
			>
				<h3 class="mt-2 text-center text-xl text-theme-accent-light">
					Question #{questionIndex + 1}
				</h3>
				<div class="block">
					<label for="question-{questionIndex + 1}-text" class="text-theme-neutral-light"
						>Question Text</label
					>
					<input
						id="question-{questionIndex + 1}-text"
						name="question-{questionIndex + 1}-text"
						type="text"
						class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						bind:value={question.questionText}
					/>
				</div>
				<div class="block">
					<label for="question-{questionIndex + 1}-image" class="text-theme-neutral-light"
						>Question Image</label
					>
					<input
						id="question-{questionIndex + 1}-image"
						name="question-{questionIndex + 1}-image"
						type="text"
						disabled={true}
						class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						value="TODO: Implement image processing"
					/>
					{#if question.questionImage}
						<div class="text-center">
							<img
								alt="Question #{questionIndex + 1} accompanying image"
								class="inline-block w-1/2"
								src={question.questionImage}
							/>
						</div>
					{/if}
				</div>
				<div class="block">
					<label for="question-{questionIndex + 1}-hint-text">Hints</label>
					{#each question.hintText || [defaultHint] as hint, hintIndex}
						<div class="flex justify-stretch">
							<input
								id="question-{questionIndex + 1}-hint-{hintIndex + 1}-text"
								name="question-{questionIndex + 1}-hint-text"
								type="text"
								class="my-2 inline-block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
								bind:value={hint}
							/>
							<button
								class="my-2 ml-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
								on:click={() => removeHint(questionIndex, hintIndex)}
								><Icon name="trash-can" class="text-theme-status-error"></Icon><span
									class="ml-2 text-theme-neutral-dark">Remove</span
								></button
							>
						</div>
					{/each}
					<button
						class="my-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={() => addNewHint(questionIndex)}
						><Icon name="file-lines" class="text-theme-accent-dark"></Icon><span
							class="ml-2 text-theme-neutral-dark">Add New Hint</span
						></button
					>
				</div>
				<div class="block">
					<label for="question-{questionIndex + 1}-answer-text">Answer Options</label>
					{#each question.answerOptions || [defaultAnswer] as answer, answerIndex}
						<div class="flex justify-stretch">
							<button
								class="my-2 mr-2 flex w-12 items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
								on:click={() => setCorrectAnswer(questionIndex, answerIndex)}
								><Icon
									name={question.correctAnswerIndex === answerIndex ? 'check' : 'xmark'}
									class={question.correctAnswerIndex === answerIndex
										? 'text-theme-status-success'
										: 'text-theme-status-error'}
								></Icon></button
							>
							<input
								id="question-{questionIndex + 1}-answer-{answerIndex + 1}-text"
								name="question-{questionIndex + 1}-answer-text"
								type="text"
								class="my-2 inline-block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
								bind:value={answer.answerText}
							/>
							<button
								class="my-2 ml-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
								on:click={() => removeAnswer(questionIndex, answerIndex)}
								><Icon name="trash-can" class="text-theme-status-error"></Icon><span
									class="ml-2 text-theme-neutral-dark">Remove</span
								></button
							>
						</div>
					{/each}
					<button
						class="my-2 flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
						on:click={() => addNewAnswer(questionIndex)}
						><Icon name="file-lines" class="text-theme-accent-dark"></Icon><span
							class="ml-2 text-theme-neutral-dark">Add New Answer</span
						></button
					>
				</div>
			</section>
		{/each}
		<section
			class="my-4 grid grid-cols-1 gap-4 rounded-md bg-theme-primary-light p-4 text-left ring-2 ring-theme-accent-light"
		>
			<div class="block text-center">
				<button
					class="my-2 ml-2 inline-flex items-center justify-center rounded-md bg-stone-100 p-2 text-theme-accent-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					on:click={addNewQuestion}
					><Icon name="plus" class="text-theme-accent-dark"></Icon><span
						class="ml-2 text-theme-neutral-dark">Add New Question</span
					></button
				>
			</div>
		</section>
		<h2 class="mt-6 text-center text-3xl text-theme-accent-light">End Card</h2>
		<section
			class="my-4 grid grid-cols-1 gap-4 rounded-md bg-theme-primary-light p-4 text-left ring-2 ring-theme-accent-light"
		>
			<div class="block">
				<label for="end-heading" class="text-theme-neutral-light">End Card Heading</label>
				<input
					id="end-heading"
					name="end-heading"
					type="text"
					class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					bind:value={$gameData.endCard.endHeading}
				/>
			</div>
			<div class="block">
				<label for="end-text" class="text-theme-neutral-light">End Card Text</label>
				<textarea
					id="end-text"
					name="end-text"
					class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					bind:value={$gameData.endCard.endText}
				/>
			</div>
			<div class="block">
				<label for="title-image" class="text-theme-neutral-light">End Card Image</label>
				<input
					id="title-image"
					name="title-image"
					type="text"
					disabled={true}
					class="my-2 block w-full rounded-md bg-stone-100 p-2 text-theme-neutral-dark ring-1 ring-stone-900/10 hover:bg-stone-200"
					value="TODO: Implement image processing"
				/>
				{#if $gameData.endCard.endImage}
					<div class="text-center">
						<img
							alt="Title card graphic"
							class="inline-block w-1/2"
							src={$gameData.endCard.endImage}
						/>
					</div>
				{/if}
			</div>
		</section>
	</div>
{/if}
