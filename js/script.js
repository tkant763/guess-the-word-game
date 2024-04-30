// unordered list where player's guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button reading "Guess!"
const guessButton = document.querySelector(".guess");
// text input where the player guesses letters
const textInput = document.querySelector(".letter");
// empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph for remaining guesses
const remainingGuesses = document.querySelector(".remaining");
// span in remaining guesses paragraph
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragraph for messages when player guesses a letter
const message = document.querySelector(".message");
// hidden button reading "Play Again!"
const playAgainButton = document.querySelector(".play-again");
// starting word
const word = "magnolia";

// add placeholders for each letter
const updatePlaceholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

updatePlaceholder(word);

guessButton.addEventListener("click", function(e){
    // prevent reloading
    e.preventDefault();

    const guess = textInput.value;
    console.log(guess);
    textInput.value = "";
});