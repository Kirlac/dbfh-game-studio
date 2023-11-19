export type GameData = {
	// Flag to determine the type of game to load when pasted in to the home page
	gameType: 'thisOrThat' | 'onlyConnect' | 'millionaire' | 'guessTheThing';
	// Title card data
	titleCard: TitleCard;
	// Array of questions for the game
	questions: Question[];
	// End card data
	endCard: EndCard;
};

export interface TitleCard {
	// Quiz name for the title card eg. 'Crab or No Crab'
	quizTitle?: string;
	// Descriptive text for the title card eg. 'For each image, guess whether or not it is a crab'
	quizDescription?: string;
	//Base64 image to show on the title card
	titleImage?: string;
}

export interface Question {
	// Main display text for the question eg. 'Is this a crab'
	questionText?: string;
	// Base64 image to display for the question eg. a cropped/zoomed in image of a crab
	questionImage?: string;
	// Array of hints eg. ['Leetle peench', 'Doo do do do']
	hintText?: string[];
	// Array of possible answers to display eg. ['Crab', 'Not Crab']
	answerOptions?: Answer[];
	// Array index for the correct answer eg. 0
	correctAnswerIndex: number;
}

export interface Answer {
	// Main display text for the answer eg. 'Crab'
	answerText?: string;
	// Base64 image to display for the answer eg. the full uncropped/zoomed out image of the crab
	answerImage?: string;
	// Descriptive text for providing additional context eg. 'This is a rave crab from a popular music video'
	answerDescription?: string;
}

export interface EndCard {
	// Heading to display on the end card eg. 'Thanks for Playing!'
	endHeading?: string;
	// Text to display on the end card eg. credits, thanks, etc.
	endText?: string;
	//Base64 image to display on the end card
	endImage?: string;
}
