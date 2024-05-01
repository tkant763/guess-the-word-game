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
//empty array to hold guessed letters
const guessedLetters = [];

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

    // accept input
    const guess = textInput.value;
    // console.log(guess);
    textInput.value = "";

    // validate input
    message.innerText = "";
    const validatedGuess = validateInput(guess);
    console.log(validatedGuess);
    if (validatedGuess != undefined) {
        makeGuess(validatedGuess);
    }
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

    // verify input is a single letter
    if (input === "") {
        message.innerText = "Please input a letter!";
    } else if (input.length > 1) {
        message.innerText = "Please input a single letter at a time!";
    } else if (!(input.match(acceptedLetter))) {
        message.innerText = "Please input only letters, not numbers or other characters!"
    } else {
        return input;
    }
};

const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    
    // verify letter has not been used
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter, please try again!"
    } else {
        guessedLetters.push(letter);
    }

    console.log(guessedLetters);
};