import { base64ToString, stringToBase64 } from '$lib/utils/base64Encoder';
import { derived, writable } from 'svelte/store';

export type GameData = {
	// Flag to determine the type of game to load when pasted in to the home page
	gameType?: 'this-or-that' | 'only-connect' | 'millionaire' | 'guess-the-thing' | 'silhouette';
	// Title card data
	titleCard: TitleCard;
	// Array of questions for the game
	questions: Question[];
	// End card data
	endCard: EndCard;
};

export type TitleCard = {
	// Game name for the title card eg. 'Crab or No Crab'
	gameTitle?: string;
	// Descriptive text for the title card eg. 'For each image, guess whether or not it is a crab'
	gameDescription?: string;
	//Base64 image to show on the title card
	titleImage?: string;
};

export type Question = {
	// Main display text for the question eg. 'Is this a crab'
	questionText?: string;
	// Base64 image to display for the question eg. a cropped/zoomed in image of a crab
	questionImage?: string;
	// Array of hints eg. ['Leetle peench', 'Doo do do do']
	hintText?: string[];
	// Array of possible answers to display eg. ['Crab', 'Not Crab']
	answerOptions: Answer[];
	// Array index for the correct answer eg. 0
	correctAnswerIndex: number;
};

export type Answer = {
	// Main display text for the answer eg. 'Crab'
	answerText?: string;
	// Base64 image to display for the answer eg. the full uncropped/zoomed out image of the crab
	answerImage?: string;
	// Descriptive text for providing additional context eg. 'This is a rave crab from a popular music video'
	answerDescription?: string;
};

export interface EndCard {
	// Heading to display on the end card eg. 'Thanks for Playing!'
	endHeading?: string;
	// Text to display on the end card eg. credits, thanks, etc.
	endText?: string;
	//Base64 image to display on the end card
	endImage?: string;
}

function getParsedGameData(value: string | null | undefined): GameData | null {
	try {
		if (value) {
			return JSON.parse(value);
		} else {
			return null;
		}
	} catch {
		return null;
	}
}

function getDecodedGameData(value: string | null | undefined): string | null {
	try {
		if (value) {
			return base64ToString(value);
		} else {
			return null;
		}
	} catch {
		return null;
	}
}

function getJsonGameData(value: GameData | null | undefined): string {
	if (value) {
		return JSON.stringify(value);
	} else {
		return '';
	}
}

function getBase64GameData(value: GameData | null | undefined): string {
	if (value) {
		const json = getJsonGameData(value);
		if (json) {
			return stringToBase64(json);
		} else {
			return '';
		}
	} else {
		return '';
	}
}

function initializeGameData() {
	const { subscribe, set, update } = writable<GameData | null | undefined>();

	return {
		subscribe,
		set: (value: GameData) => {
			set(value);
		},
		setJson: (value: string) => {
			const game = getParsedGameData(value);
			set(game);
		},
		setBase64: (value: string) => {
			const gameJson = getDecodedGameData(value);
			const game = getParsedGameData(gameJson);
			set(game);
		},
		update
	};
}

export const gameData = initializeGameData();

export const gameDataJson = derived(gameData, ($gameData) => getJsonGameData($gameData));

export const gameDataBase64 = derived(gameData, ($gameData) => getBase64GameData($gameData));
