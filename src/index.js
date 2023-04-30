// Import CSS and Font
require("./style.css");
require("./fonts/game-of-thrones.ttf");

// Import HTML file
require("./index.html");

const {
  boardElement,
  gameButton,
  footer,
  matches,
  moves,
  stats,
  time,
} = require('./js/DOMElements')

const {
  getCharacterNames,
  getRandomCharacters,
} = require('./js/characters')

const {
  createCard,
  createRows,
  gameFinsihedMessage,
  gameRulesMessage,
  generateCopyright,
} = require('./js/markup')

// Declare variables for game information
let numberOfMoves = 0;
let numberOfMatches = 0;
let timeElapsed = "00 : 00";
let flippedCards = 0;
let cardOneSource;
let cardTwoSource;
let cardOneId;
let cardTwoId;
const boardArray = [];
let match = false;
let gameTimer;
let timer;
let gameTime;
let timerRunning = false;
let gameStatus = "Stopped";

// Create game board
const createBoard = () => {
  // Assign random characters to variable for creation of game board
  let gameCharacters = getRandomCharacters();

  for (let i = 0; i < gameCharacters.length; i++) {
    let card = createCard(gameCharacters[i], i);

    boardArray.push(card);
  }
  return boardArray;
};

// Iterate over board array and add items to game board
const displayBoard = board => {
  // iterate over each row of game board
  for (let i = 1; i <= 4; i++) {
    let row = document.querySelector(`.row-${i} .tile-container`);

    // Add four cards to each row
    for (let j = 0; j < 4; j++) {
      let card = board.shift();
      row.innerHTML += card;
    }
  }
};

// Declare function to update number of moves and matches
const updateStats = () => {
  moves.innerHTML = numberOfMoves;
  matches.innerHTML = numberOfMatches;
};

// Function to update game button and game status
const updateGameStatus = () => {
  if (gameStatus === "Stopped") {
    // Update text on game button
    updateGameButton("Pause");

    // Reinstate click functionality to board
    boardElement.addEventListener("click", handleBoardClick);

    // Update game status
    gameStatus = "Playing";
  } else if (gameStatus === "Playing") {
    // Update text on game button
    updateGameButton("Resume");

    // Remove click functionality from board
    boardElement.removeEventListener("click", handleBoardClick);

    // Stop timer
    clearInterval(gameTimer);

    // Update game status
    gameStatus = "Paused";
  } else if (gameStatus === "Paused") {
    // Update text on game button
    updateGameButton("Pause");

    // Reinstate click functionality to board
    boardElement.addEventListener("click", handleBoardClick);

    // Restart timer
    gameTimer = setInterval(timer, 1000);

    // Update game status
    gameStatus = "Playing";
  }
};

// Function to update Game Button Text content
const updateGameButton = value => {
  return (gameButton.textContent = value);
};

// Start game
const startGame = () => {
  // Add rows to game board
  createRows(4, boardElement);

  // Assign all cards to board;
  // let board = createBoard();

  // Display game board
  displayBoard(createBoard());

  initGame();
};

// Check number of matches
const checkMatches = () => {
  if (numberOfMatches === 8) {
    // Show success message
    completeGame();

    // Clear timer
    // clearTimeout(createTimer);
  }
};

// Reset number of flipped cards
const resetFlipped = () => {
  flippedCards = 0;
};

// Complete game
const completeGame = () => {
  // Display success message
  gameFinsihedMessage(numberOfMoves, gameTime, boardElement);

  // Update game status
  gameStatus = "Stopped";

  // Update game button
  updateGameButton("Play Again");

  // Clear Timer
  clearInterval(gameTimer);
};

// Add game button click functionality
gameButton.addEventListener("click", e => {
  e.preventDefault();

  // If between games, create game board and start game
  if (gameStatus === "Stopped") {
    startGame();
  }

  // Update Game and Game Button Status
  updateGameStatus();
});

// Reset all game variables;
const resetGame = () => {
  numberOfMoves = 0;
  numberOfMatches = 0;
  gameTime = 0;

  resetFlipped();
};

// Create timer
timer = () => {
  gameTime++;
  let min = Math.floor(gameTime / 60);
  let sec = Math.floor(gameTime % 60);
  if (min < 10) {
    min = `0${min}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  time.innerHTML = `${min} : ${sec}`;
};

// Assign id and source variables to selected card;
const getCardVariables = (src, id) => {
  if (flippedCards === 1) {
    cardOneSource = src;
    cardOneId = id;
  } else {
    cardTwoSource = src;
    cardTwoId = id;
  }
};

// function to find card element
const handleBoardClick = event => {
  // Do nothing if user clicks on something other than card
  if (
    !event.target.parentNode ||
    !event.target.parentNode.classList.contains("card")
  ) {
    return;
  }

  // Create card variable
  let card = event.target.parentNode;

  // Do nothing if card already matched
  if (card.classList.contains("matched")) {
    return;
  }
  card.classList.toggle("flipped");
  flippedCards++;

  if (card.classList.contains("flipped")) {
    card.style.transform = "rotateY(180deg)";
  }

  //assign photo src to variable
  let sideB = card.querySelector(".side-b img");
  let src = sideB.getAttribute("src");
  let id = card.getAttribute("id");

  // Get card Variables
  getCardVariables(src, id);

  if (flippedCards === 2) {
    numberOfMoves++;
    let cardOne = document.querySelector(`#${cardOneId}`);
    let cardTwo = document.querySelector(`#${cardTwoId}`);

    if (checkMatch(cardOneSource, cardTwoSource)) {
      numberOfMatches++;

      // add "matched" class to cards
      cardOne.classList.add("matched");
      cardTwo.classList.add("matched");
    } else {
      // Turn cards back over
      setTimeout(() => {
        cardOne.style.transform = "rotateY(0deg)";
        cardTwo.style.transform = "rotateY(0deg)";
      }, 500);
      // Remove "flipped" class
      cardOne.classList.remove("flipped");
      cardTwo.classList.remove("flipped");
    }

    // Update number of moves and matches
    updateStats();

    // Check number of matches
    checkMatches();

    // Reset number of flipped cards
    resetFlipped();
  }
};

boardElement.addEventListener("click", handleBoardClick);

// Check whether matched pair found
const checkMatch = (cardOne, cardTwo) => {
  return cardOne === cardTwo;
};

const initGame = () => {
  resetGame();

  moves.innerHTML = numberOfMoves;
  matches.innerHTML = numberOfMatches;
  time.innerHTML = timeElapsed;
  stats.style.visibility = "visible";

  // Start timer
  gameTimer = setInterval(timer, 1000);
};

const init = () => {
  gameRulesMessage(boardElement);
};

init();

footer.innerHTML = generateCopyright();
