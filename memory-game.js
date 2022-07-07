"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const POKEMONLIST = [
  "bulbasaur",
  "charmander",
  "eevee",
  "pikachu",
  "squirtle",
  "bulbasaur",
  "charmander",
  "eevee",
  "pikachu",
  "squirtle",
];

const startButton = document.querySelector(".button");
const pokemonList = shuffle(POKEMONLIST);
const gameBoard = document.getElementById("game");
let scoreDisplay = document.querySelector(".scoreDisplay");
let bestScoreDisplay = document.querySelector(".bestScore");
let currentCards = [];
let score = 0;
let bestScore = 0;

startButton.addEventListener("click", start);

function start() {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild); //removes all child elements in gameBoard
  }
  startButton.innerText = "Reset";
  createCards(pokemonList);

  score = 0;
  scoreDisplay.innerText = score;
  flippedCards = pokemonList.length;
  document.querySelector(".title").innerText = "GOTTA MATCH 'EM ALL!";
}

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(pokemonList) {
  const row1 = document.createElement("div");
  row1.setAttribute("class", "row");
  gameBoard.appendChild(row1);
  const row2 = document.createElement("div");
  row2.setAttribute("class", "row");
  gameBoard.appendChild(row2);

  const rows = document.querySelectorAll(".row");

  let numCards = 0;

  for (let pokemon of pokemonList) {
    let card = document.createElement("div");
    card.setAttribute("id", "card");
    // card.style.backgroundColor = color;
    card.setAttribute("data-pokemon", pokemon);
    card.classList.add("faceDown");

    if (numCards < pokemonList.length / 2) {
      // distributes cards evenly between the two rows
      rows[0].appendChild(card);
    } else {
      rows[1].appendChild(card);
    }

    numCards++;

    card.addEventListener("click", handleCardClick);
  }
}

let flippedCards = pokemonList.length;
/** Flip a card face-up. */
function flipCard(card) {
  // ... you need to write this ...
  card.classList.remove("faceDown");
  card.style.backgroundImage = `url(./images/${card.getAttribute(
    "data-pokemon"
  )}.jpg)`;
  card.style.backgroundSize = "cover";
}

/** Flip a card face-down. */

function unFlipCard(cards) {
  // ... you need to write this ...
  for (let card of cards) {
    card.style.backgroundImage = `url(./images/pokemon.jpg)`;
    card.classList.add("faceDown");
  }
  currentCards = [];
  return currentCards;
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  if (currentCards.length < 2 && evt.target.classList.contains("faceDown")) {
    flipCard(evt.target);
    currentCards.push(evt.target);
    currentCards = isMatch(currentCards);

    score++;
    scoreDisplay.innerText = score;
  }
}

function isMatch(currentCards) {
  if (currentCards.length === 2) {
    if (currentCards[0].dataset.pokemon === currentCards[1].dataset.pokemon) {
      currentCards = [];
      flippedCards -= 2;
      if (flippedCards === 0) {
        document.querySelector(".title").innerText = "CONGRATS!";
        updateBestScore();
      }
    } else {
      setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, currentCards);
    }
  }
  return currentCards;
}

function updateBestScore() {
  if (score < localStorage.bestScore) {
    localStorage.bestScore = score + 1;
    bestScoreDisplay.innerText = score + 1;
  } else {
    localStorage.setItem("bestScore", score + 1);
    bestScoreDisplay.innerText = score + 1;
  }
}
