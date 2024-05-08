// unordered list where player's guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button reading "Guess!"
const guessButton = document.querySelector(".guess");
// text input where the player guesses letters
const textInput = document.querySelector(".letter");
// empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph for remaining guesses
const remainingGuessesElement = document.querySelector(".remaining");
// span in remaining guesses paragraph
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragraph for messages when player guesses a letter
const message = document.querySelector(".message");
// hidden button reading "Play Again!"
const playAgainButton = document.querySelector(".play-again");
// starting word
let word = "magnolia";
//empty array to hold guessed letters
const guessedLetters = [];
let remainingGuesses = 8;

// load words from file
const getWord = async function() {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordArray = words.split("\n");

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];
    
    word = randomWord.trim();
    updatePlaceholder(word);
};

// display placeholders for each letter
const updatePlaceholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

// start game off
getWord();

// actions on click of guess button
guessButton.addEventListener("click", function(e){
    // prevent reloading
    e.preventDefault();
    message.innerText = "";

    // accept input
    const guess = textInput.value;

    // validate input
    const validatedGuess = validateInput(guess);
    if (validatedGuess != undefined) {
        makeGuess(validatedGuess);
    }

    // clear form input
    textInput.value = "";
});

// check input is only a single letter
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

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

// process letter as a guess
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    
    // verify letter has not been used
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter, please try again!"
    } else {
        guessedLetters.push(letter);
        showGuessedLetters();
        countGuesses(letter);
        updateWordInProgress(guessedLetters);
    }

    console.log(guessedLetters);
};

// display all guessed letters on screen
const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = `${letter}`;
        guessedLettersElement.append(li);
    }
};

// display any correct guesses in the word
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const updatedWord = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedWord.push(letter);
        } else {
            updatedWord.push("●");
        }
    }
    
    wordInProgress.innerText = updatedWord.join("");
    checkIfWon();
};

// keep track of guesses and display realated messages
const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! The word contains the letter ${guess}!`;
    } else {
        message.innerText = `Sorry! The word doesn't contain the letter ${guess}!`;
        remainingGuesses -= 1;
    }

    if(remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "1 guess";
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// display winning messages
const checkIfWon = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

// hide unneeded elements at end of game
const startOver = function() {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");

    playAgainButton.classList.remove("hide");
};

// restart game on click of play again button
playAgainButton.addEventListener("click", function() {
    // reset orgiginal values
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    guessedLetters.splice(0, guessedLetters.length);
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    // get new word
    getWord();

    // display UI elements again
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide"); 
});