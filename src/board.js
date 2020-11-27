import { div, img } from '../lib/fmdom.js';

export function board(memoryCards, onCardClicked) {
  let cardLines = [];
  for (let row = 0; row < 4; row++) {
    const columns = [];
    for (let column = 0; column < 4; column++) {
      const idx = row * 4 + column;
      const value = memoryCards[idx];
      console.log('value board: ' + value);
      console.log('idx board: ' + idx);
      columns.push(card(value, idx, onCardClicked));
    }
    cardLines.push(cardLine(columns));
  }
  return div({ class: 'board'}, cardLines);
}

function space() {
  return div({ class: 'space' });
}

function cardLine(cards) {
  let lineElements = [];
  for (const value of cards) {
    lineElements.push(value);
    lineElements.push(space());
  }
  return div({ class: 'cardrow' }, lineElements);
}

function card(value, idx, onCardClicked) {
  if (value === -1) {
    return noCard();
  } else if (value === 0) {
    return invisibleCard(idx, onCardClicked);
  }
  return visibleCard(value, idx, onCardClicked);
}

function noCard() {
  return div({ class: 'nocard' }, [
    img({ src: 'images/empty48x48.png' })
  ]);
}

function invisibleCard(idx, onCardClicked) {
  console.log('invisible card');
  function onclick() {
    onCardClicked(idx);
  }
  return div({ class: 'invisiblecard' }, [
    img({
      src: 'images/question-mark.png',
      onclick: onclick
    })
  ]);
}

const sources = [
  'images/cloudy-line.png',
  'images/flashlight-line.png',
  'images/mist-line.png',
  'images/moon-line.png',
  'images/showers-line.png',
  'images/snowy-line.png',
  'images/sun-line.png',
  'images/thunderstorms-line.png'
];

function visibleCard(value, idx, onCardClicked) {
  console.log('visible card: ' + value);
  const imageSrc = sources[value - 1];
  function onclick() {
    onCardClicked(idx);
  }
  return div({
    class: 'card',
    onclick: onclick
  }, [
    img({ src: imageSrc })
  ]);
}
