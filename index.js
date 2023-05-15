const showTestWindow = true;

const suits = ["C", "D", "H", "S"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "01"];

class Card {
    constructor(image, powerLevel) {
        this.image = image;
        this.powerLevel = powerLevel;
    }
}

const cards = suits.map(s => ranks.map((r, i) => new Card(`${s}${r}.png`, i)));
let deck = [];
let cardsPlayerOne = [];
let cardsPlayerTwo = [];
let currentDrawIndex = 0;
let isRunning = true;
let scoreOne = 0;
let scoreTwo = 0;

let cardBackgroundOne = tryGetElementById("card-background-one");
let cardBackgroundTwo = tryGetElementById("card-background-two");

let testWindow = tryGetElementById("test-window");
let pointsOne = tryGetElementById("points-player-one");
let pointsTwo = tryGetElementById("points-player-two");
let currentCardOne = tryGetElementById("card-player-one");
let currentCardTwo = tryGetElementById("card-player-two");
let scoreTextOne = tryGetElementById("score-player-one");
let scoreTextTwo = tryGetElementById("score-player-two");
let header = tryGetElementById("header");
let textboxOne = tryGetElementById("textbox-player-one");
let textboxTwo = tryGetElementById("textbox-player-two");

let buttonDraw = tryGetElementById("draw");
let buttonRestart = tryGetElementById("restart");

init();

buttonRestart.addEventListener('click', () => init());
buttonDraw.addEventListener('click', () => draw());

function createShuffledDeck() {
    let currentDeck = [].concat(...cards);
    let currentIndex = 0;
    let factors = [2, 4, 13, 26]; // factors of 52: 1, 2, 4, 13, 26, and 52
    let piles = [];
    let numShuffles = 2048;

    for (i = 0; i < numShuffles; i++) {
        let sizePiles = factors[Math.floor(Math.random() * factors.length)];
        let numPiles = 52 / sizePiles;
        for (let n = 0; n < numPiles; n++) {
            piles[n] = [];
            for (let s = sizePiles - 1; s >= 0; s--) {
                piles[n][s] = currentDeck[currentIndex++];
            }
        }
        currentDeck = [].concat(...piles);
        currentIndex = 0;
        piles = [];
    }

    return currentDeck;
}

function declareWinner(player) { // player is 1 or 0
    buttonRestart.style.display = "inline-block";
    buttonDraw.style.display = "none";
    if (player > 2 || player < 0 || player === null || player === undefined) console.log("'player' should be 0, 1 or 2 for tie")
    header.style.display = "flex";
    if (player === 2) {
        header.textContent = `TIE!!!`;
        header.style.color = "white";
    }
    else {
        let msg = player === 0 ? "RED" : "BLUE";
        let color = player === 0 ? "#d34f3e" : "#70a8ab";
        header.textContent = `${msg} WINS!!!`;
        header.style.color = color;
    }
    isRunning = false;
}

function draw() {
    if (!isRunning) return;
    let cardPlayerOne = cardsPlayerOne[currentDrawIndex];
    let cardPlayerTwo = cardsPlayerTwo[currentDrawIndex];

    setCardImage(0, cardPlayerOne.image);
    setCardImage(1, cardPlayerTwo.image);
    let ov = cardPlayerOne.value;
    let tv = cardPlayerTwo.value;
    if (ov === tv) {
        updateScores(2);
    }
    else if (ov > tv) {
        scoreOne++;
        updateScores(0)
    }
    else if (ov < tv) {
        scoreTwo++;
        updateScores(1)
    }

    currentDrawIndex++;

    if (currentDrawIndex > 25) {
        if (scoreOne > scoreTwo)
            declareWinner(0);
        else if (scoreOne < scoreTwo)
            declareWinner(1);
        else
            declareWinner(2);
        currentDrawIndex = 0;
    }
}

function init() {
    isRunning = true;
    let redGradient = "radial-gradient(#d34f3e, #793345)";
    let blueGradient = "radial-gradient(#70a8ab, #326e75)";

    cardBackgroundOne.style.background = redGradient;
    cardBackgroundTwo.style.background = blueGradient;

    setCardImage(0);
    setCardImage(1);
    header.style.display = "none";
    pointsOne.textContent = "";
    pointsTwo.textContent = "";

    textboxOne.style.background = redGradient;
    textboxTwo.style.background = blueGradient;

    deck = createShuffledDeck();
    cardsPlayerOne = deck.filter((c, i) => i % 2 == 0);
    cardsPlayerTwo = deck.filter((c, i) => i % 2 != 0);
    currentDrawIndex = 0;
    scoreOne = 0;
    scoreTwo = 0;
    updateScores();
    buttonRestart.style.display = "none";
    buttonDraw.style.display = "inline-block";
    testWindow.style.display = showTestWindow ? "block" : "none";
}

function updateScores(turnWinner = -1) { // turnWinner is the player that won the current turn. use 0 for one, 1 for two, and 2 for a tie.
    pointsOne.textContent = "";
    pointsTwo.textContent = "";
    if (turnWinner === 0) {
        pointsOne.textContent = " (+1)";
        pointsOne.style.color = "#00DD00";
    }
    else if (turnWinner === 1) {
        pointsTwo.textContent = " (+1)";
        pointsTwo.style.color = "#00DD00";
    }
    else if (turnWinner === 2) {
        pointsOne.textContent = " (+0)";
        pointsTwo.textContent = " (+0)";
        pointsOne.style.color = "#AAAAAA";
        pointsTwo.style.color = "#AAAAAA";
    }

    scoreTextOne.textContent = `Score: ${scoreOne}`;
    scoreTextTwo.textContent = `Score: ${scoreTwo}`;
}

function setCardImage(player, url = "") { // player can be 0 or 1
    let playerCard = player === 0 ? currentCardOne : player === 1 ? currentCardTwo : null;
    if (player == null)
        console.log("Use '0' for player one and '1' for player two.");
    if (url === "") {
        let radialGradient = player === 0 ? "radial-gradient(#d34f3e, #793345)" : "radial-gradient(#70a8ab, #326e75)";
        playerCard.style.background = radialGradient;
    }
    else {
        playerCard.style.backgroundImage = `url(img/cards/${url})`;
        playerCard.style.backgroundRepeat = "no-repeat";
        playerCard.style.backgroundSize = "200px";
    }
}

function tryGetElementById(id) {
    elem = document.getElementById(id);
    if (elem === null)
        console.log(`Could not get element with id of "${id}"`);
    return elem;
}