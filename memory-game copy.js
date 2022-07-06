"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

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

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  const row1 = document.createElement("div");
  row1.setAttribute("class", "row");
  gameBoard.appendChild(row1);
  const row2 = document.createElement("div");
  row2.setAttribute("class", "row");
  gameBoard.appendChild(row2);

  const rows = document.querySelectorAll(".row");

  let numCards = 0;

  for (let color of colors) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.color = color;

    if (numCards < colors.length / 2) {
      // distributes cards evenly between the two rows
      rows[0].appendChild(card);
    } else {
      rows[1].appendChild(card);
    }

    numCards++;

    card.addEventListener("click", flipCard);
  }
}

/** Flip a card face-up. */
let card1, card2;
// let card1 = undefined;
// let card2 = undefined;
let pairsRemain = colors.length / 2;
let readyToPlay = false;
let faceUp = false;

function flipCard() {
  // ... you need to write this ...
  console.log("clicked!");
  // if (readyToPlay === false) {
  //   return;
  // }

  if (faceUp === false) {
    card1 = this;
    card1.style.backgroundImage = "none";
    card1.style.backgroundColor = card1.style.color;
    faceUp = true;
  } else {
    card2 = this;
    card2.style.backgroundImage = "none";
    card2.style.backgroundColor = card2.style.color;
    readyToPlay = false;

    if (card1.style.color === card2.style.color) {
      console.log("PAIR!!");
      card1.removeEventListener("click", flipCard);
      card2.removeEventListener("click", flipCard);
      pairsRemain--;
      if (pairsRemain === 0) {
        // We have a winner
      } else {
        unFlipCard(card1, card2);
      }
      resetCurrentPair();
    }
  }
}

/** Flip a card face-down. */

function unFlipCard(card1, card2) {
  // ... you need to write this ...
  setTimeout(function () {
    card1.style.backgroundImage = "url(./qm.jpeg)";
    card2.style.backgroundImage = "url(./qm.jpeg)";
  }, 1000);
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  let card;
}
