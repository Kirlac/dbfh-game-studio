import type { Answer, EndCard, GameData, Question, TitleCard } from '$lib/stores/gameData.store';

export const defaultTitleCard: TitleCard = {
	gameTitle: '',
	gameDescription: '',
	titleImage: ''
};

export const defaultAnswer: Answer = {
	answerText: '',
	answerDescription: '',
	answerImage: ''
};

export const defaultHint = '';

export const defaultQuestion: Question = {
	questionText: '',
	questionImage: '',
	hintText: [defaultHint],
	answerOptions: [defaultAnswer],
	correctAnswerIndex: 0
};

export const defaultEndCard: EndCard = {
	endHeading: '',
	endText: '',
	endImage: ''
};

export const defaultGameData: GameData = {
	gameType: 'this-or-that',
	titleCard: defaultTitleCard,
	questions: [defaultQuestion],
	endCard: defaultEndCard
};
