import { init, render } from '../lib/fragmate.js';
import { board } from './board.js';

const gameState = {
  visibleCards: [],
  cards: shuffle(generateCardValues()),
  isWaiting: false
};

function generateCardValues() {
  return [
    0, 1, 2, 3,
    4, 5, 6, 7,
    0, 1, 2, 3,
    4, 5, 6, 7
  ];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isCardVisible(idx, visibleCards) {
  for (const visibleCard of visibleCards) {
    if (idx === visibleCard) {
      return true;
    }
  }
  return false;
}

function hideCards() {
  gameState.isWaiting = true;
  setTimeout(() => {
    if (gameState.cards[gameState.visibleCards[0]] === gameState.cards[gameState.visibleCards[1]]) {
      gameState.cards[gameState.visibleCards[0]] = -1;
      gameState.cards[gameState.visibleCards[1]] = -1;
    }
    gameState.visibleCards = [];
    gameState.isWaiting = false;
    render(getRenderState(gameState));
  }, 3000);
}

function cardClicked(idx) {
  console.log('card clicked: ' + idx);
  if (gameState.isWaiting) {
    return;
  }
  if (gameState.cards[idx] >= 0) {
    if (isCardVisible(idx, gameState.visibleCards)) {
      return;
    } else {
      gameState.visibleCards.push(idx);
      if (gameState.visibleCards.length === 2) {
        hideCards();
      }
    }
    render(getRenderState(gameState));
  }
}

function getRenderCard(cards, idx, visibleCards) {
  const cardValue = cards[idx];
  if (isCardVisible(idx, visibleCards)) {
    return cardValue + 1;
  }
  if (cardValue === -1) {
    return -1;
  }
  return 0;
}

function getRenderState(state) {
  const cards = state.cards;
  const visibleCards = state.visibleCards;
  const renderCards = [];
  for (let i = 0; i < 16; i++) {
    console.log('heeeereeee');
    renderCards.push(getRenderCard(cards, i, visibleCards));
  }
  console.log('renercardsvaluefirst: ' + renderCards[0]);
  return {
    cards: renderCards,
    cardClicked: cardClicked
  };
}

function game(state) {
  console.log('game first card: ' + state.cards[0]);
  return board(state.cards, state.cardClicked);
}

init(document.getElementById('fragmate'), game);

render(getRenderState(gameState));
