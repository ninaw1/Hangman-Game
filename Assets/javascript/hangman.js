// Array of possible choices 
// Data needed at global level
var wordsArray =
[
    "Isabelle", 
    "Apple", 
    "Chrissy",
    "Fauna",
    "Flurry", 
    "Lily", 
    "Maple", 
    "Molly", 
    "Nana", 
    "Sprinkle", 
    "Stitches",
];
// resetting our game 
function resetGame() {
	guessesRemaining = maxAttempts;
}

// declaring our variables
var winCountElement = document.getElementById("win-count");
var currentWordElement = document.getElementById("current-word");
var guessCountElement = document.getElementById("guess-count");
var lettersGuessedElement = document.getElementById("failed-guesses");

// generating our random word from the supplied array
var randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();

var allLettersGuessed = [];     // Setting allLettersGuessed to an array
const maxAttempts = 15;
var guessCount = 0;
var guessesRemaining = maxAttempts - guessCount;
var wordComplete = false;
var winCount = [];

function renderWord() {
	var currentWord = "";
	for(var i = 0; i < randomWord.length; i++) {
		if(allLettersGuessed.indexOf(randomWord[i]) !== -1 || randomWord[i] === "") {       // the letters guessed will search the indexof randomword then fill in
			currentWord += randomWord[i].toUpperCase();
		} else {
			currentWord += "_";         //currentWord = currentWord + "_"
		}
	}
	currentWordElement.innerHTML = currentWord;     // setting currentWord to have a value in this function, lives within the function
}

renderWord();
winCountElement.innerHTML = winCount;
guessCountElement.innerHTML = guessesRemaining;

function clearWordAndGuesses() {
	guessCountElement.innerHTML = maxAttempts;
	guessCount = 0;
	guessesRemaining = maxAttempts - guessCount;
	allLettersGuessed = [];
	lettersGuessedElement.innerHTML = "";
}

document.onkeydown = e => {
	var theKey = e.key.toLowerCase();
	var theKeyCode = e.keyCode;     // e.keyCode allows for the unicode of the character to be identified 

	if(theKeyCode >= 65 && theKeyCode <= 90 && allLettersGuessed.indexOf(theKey) === -1){
		allLettersGuessed.push(theKey);

		if(randomWord.indexOf(theKey) === -1) {
			guessCount++;
		}

		guessesRemaining = maxAttempts - guessCount;

		if(guessesRemaining <= 0) {
			clearWordAndGuesses();
			randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
		} else {
			guessCountElement.innerHTML = guessesRemaining;
		}

		var currentWord = "";
		for(var i = 0; i < allLettersGuessed.length; i++) {
			if(randomWord.indexOf(allLettersGuessed[i]) === -1) {
				currentWord += allLettersGuessed[i].toUpperCase();
			}
		}
		lettersGuessedElement.innerHTML = currentWord;

		renderWord();

		var renderedWord = document.getElementById("current-word").innerHTML;
		if(renderedWord.indexOf("_") === -1) {
			wordComplete = true;
		}
	}

	if(wordComplete) {
		resetGame();
		wordComplete = false;
		winCount++;
		winCountElement.innerHTML = winCount;
		clearWordAndGuesses();
		randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
		renderWord();
	}
}

// For my own notes!!!
// Firstly, assigning the variables meaning and grabbing them from the HTML 
// We must set up and array of words to be guessed 
// We must have a random word to be selected from the array each time (using Math.floor(Math.random()))
// We must have the words appear as "_" until the right letter is guessed 
// We must have for the current letters gussed to show up  
// We must have the user be able to win the game and clear the field/restart after 
// We must have the counter for wins to go up 
// **extra: we must have the image change/update each time a new word comes up 
// **extra: we must have a specialized sound for each win and lose 