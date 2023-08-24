const showTestWindow = false;

const suits = ['C', 'D', 'H', 'S'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '01'];

class Card {
  constructor(image, powerLevel) {
    this.image = image;
    this.powerLevel = powerLevel;
  }
}

const cards = suits.map((s) => ranks.map((r, i) => new Card(`${s}${r}.png`, i)));

let deck = [];
let cardsPlayerOne = [];
let cardsPlayerTwo = [];
let currentDrawIndex = 0;
let isRunning = true;
let scoreOne = 0;
let scoreTwo = 0;

function tryGetElementById(id) {
  const elem = document.getElementById(id);
  if (elem === null) {
    // eslint-disable-next-line no-console
    console.error(`Could not get element with id of "${id}"`);
  }
  return elem;
}

const cardBackgroundOne = tryGetElementById('card-background-one');
const cardBackgroundTwo = tryGetElementById('card-background-two');

const testWindow = tryGetElementById('test-window');
const pointsOne = tryGetElementById('points-player-one');
const pointsTwo = tryGetElementById('points-player-two');
const currentCardOne = tryGetElementById('card-player-one');
const currentCardTwo = tryGetElementById('card-player-two');
const scoreTextOne = tryGetElementById('score-player-one');
const scoreTextTwo = tryGetElementById('score-player-two');
const header = tryGetElementById('header');
const textBoxOne = tryGetElementById('textBox-player-one');
const textBoxTwo = tryGetElementById('textBox-player-two');

const buttonDraw = tryGetElementById('draw');
const buttonRestart = tryGetElementById('restart');

function setCardImage(player, url = '') { // player can be 0 or 1
  let playerCard = null;

  if (player === 0) {
    playerCard = currentCardOne;
  } else if (player === 1) {
    playerCard = currentCardTwo;
  }

  // eslint-disable-next-line no-console
  if (player == null) { console.log("Use '0' for player one and '1' for player two."); }
  if (url === '') {
    const radialGradient = player === 0 ? 'radial-gradient(#d34f3e, #793345)' : 'radial-gradient(#70a8ab, #326e75)';
    playerCard.style.background = radialGradient;
  } else {
    playerCard.style.backgroundImage = `url(img/cards/${url})`;
    playerCard.style.backgroundRepeat = 'no-repeat';
    playerCard.style.backgroundSize = '200px';
  }
}

function createShuffledDeck() {
  let currentDeck = [].concat(...cards);
  let currentIndex = 0;
  const factors = [2, 4, 13, 26]; // factors of 52: 1, 2, 4, 13, 26, and 52
  let piles = [];
  const numShuffles = 2048;

  for (let i = 0; i < numShuffles; i += 1) {
    const sizePiles = factors[Math.floor(Math.random() * factors.length)];
    const numPiles = 52 / sizePiles;
    for (let n = 0; n < numPiles; n += 1) {
      piles[n] = [];
      for (let s = sizePiles - 1; s >= 0; s -= 1) {
        piles[n][s] = currentDeck[currentIndex];
        currentIndex += 1;
      }
    }
    currentDeck = [].concat(...piles);
    currentIndex = 0;
    piles = [];
  }

  return currentDeck;
}

// turnWinner is the player that won the current turn. use 0 for one, 1 for two, and 2 for a tie.
function updateScores(turnWinner = -1) {
  pointsOne.textContent = '';
  pointsTwo.textContent = '';
  if (turnWinner === 0) {
    pointsOne.textContent = ' (+1)';
    pointsOne.style.color = '#00DD00';
  } else if (turnWinner === 1) {
    pointsTwo.textContent = ' (+1)';
    pointsTwo.style.color = '#00DD00';
  } else if (turnWinner === 2) {
    pointsOne.textContent = ' (+0)';
    pointsTwo.textContent = ' (+0)';
    pointsOne.style.color = '#AAAAAA';
    pointsTwo.style.color = '#AAAAAA';
  }

  scoreTextOne.textContent = `Score: ${scoreOne}`;
  scoreTextTwo.textContent = `Score: ${scoreTwo}`;
}

function declareWinner(player) { // player is 1 or 0
  buttonRestart.style.display = 'inline-block';
  buttonDraw.style.display = 'none';
  // eslint-disable-next-line no-console
  if (player > 2 || player < 0 || player === null || player === undefined) console.log("'player' should be 0, 1 or 2 for tie");
  header.style.display = 'flex';
  if (player === 2) {
    header.textContent = 'TIE!!!';
    header.style.color = 'white';
  } else {
    const msg = player === 0 ? 'RED' : 'BLUE';
    const color = player === 0 ? '#d34f3e' : '#70a8ab';
    header.textContent = `${msg} WINS!!!`;
    header.style.color = color;
  }
  isRunning = false;
}

function draw() {
  if (!isRunning) return;
  const cardPlayerOne = cardsPlayerOne[currentDrawIndex];
  const cardPlayerTwo = cardsPlayerTwo[currentDrawIndex];

  setCardImage(0, cardPlayerOne.image);
  setCardImage(1, cardPlayerTwo.image);
  const ov = cardPlayerOne.powerLevel;
  const tv = cardPlayerTwo.powerLevel;
  if (ov === tv) {
    updateScores(2);
  } else if (ov > tv) {
    scoreOne += 1;
    updateScores(0);
  } else if (ov < tv) {
    scoreTwo += 1;
    updateScores(1);
  }

  currentDrawIndex += 1;

  if (currentDrawIndex > 25) {
    if (scoreOne > scoreTwo) {
      declareWinner(0);
    } else if (scoreOne < scoreTwo) {
      declareWinner(1);
    } else {
      declareWinner(2);
    }

    currentDrawIndex = 0;
  }
}

function init() {
  isRunning = true;
  const redGradient = 'radial-gradient(#d34f3e, #793345)';
  const blueGradient = 'radial-gradient(#70a8ab, #326e75)';

  cardBackgroundOne.style.background = redGradient;
  cardBackgroundTwo.style.background = blueGradient;

  setCardImage(0);
  setCardImage(1);
  header.style.display = 'none';
  pointsOne.textContent = '';
  pointsTwo.textContent = '';

  textBoxOne.style.background = redGradient;
  textBoxTwo.style.background = blueGradient;

  deck = createShuffledDeck();
  cardsPlayerOne = deck.filter((c, i) => i % 2 === 0);
  cardsPlayerTwo = deck.filter((c, i) => i % 2 !== 0);
  currentDrawIndex = 0;
  scoreOne = 0;
  scoreTwo = 0;
  updateScores();
  buttonRestart.style.display = 'none';
  buttonDraw.style.display = 'inline-block';
  testWindow.style.display = showTestWindow ? 'block' : 'none';
}

init();

buttonRestart.addEventListener('click', () => init());
buttonDraw.addEventListener('click', () => draw());
