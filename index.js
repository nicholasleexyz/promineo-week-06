const suits = ["C", "D", "H", "S"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "01"];

class Card {
    constructor(image, value) {
        this.image = image;
        this.value = value;
    }
}

const cards = suits.map(s => ranks.map((r, i) => new Card(`${s}${r}.png`, i)));
let deck = [];

let pointsOne = document.getElementById("points-player-one");
let pointsTwo = document.getElementById("points-player-two");
let currentCardOne = document.getElementById("card-player-one");
let currentCardTwo = document.getElementById("card-player-two");
let scoreOne = document.getElementById("score-player-one");
let scoreTwo = document.getElementById("score-player-two");;
let header = document.getElementById("header");
let textboxOne = document.getElementById("textbox-player-one");
let textboxTwo = document.getElementById("textbox-player-two");

let buttonDraw = document.getElementById("draw");
let buttonRestart = document.getElementById("restart");

if (currentCardOne === null)
    console.log("Couldn't get card for player one.");
if (currentCardTwo === null)
    console.log("Couldn't get card for player two.");
if (pointsOne === null)
    console.log("Couldn't get points for player one.");
if (pointsTwo === null)
    console.log("Couldn't get points for player two.");
if (scoreOne === null)
    console.log("Couldn't get score for player one");
if (scoreTwo === null)
    console.log("Couldn't get score for player two");
if (header === null)
    console.log("Couldn't get header element");
if (textboxOne === null)
    console.log("Couldn't get textbox element for player one.");
if (textboxTwo === null)
    console.log("Couldn't get textbox element for player two.");
if (buttonDraw === null)
    console.log("Couldn't get draw button.")
if (buttonRestart === null)
    console.log("Couldn't get restart button.")


init();


buttonRestart.addEventListener('click', () => init());
buttonDraw.addEventListener('click', () => draw());

deck = createShuffledDeck();
console.log(deck);

function createShuffledDeck() {
    let currentDeck = [].concat(...cards);
    let currentIndex = 0;
    let factors = [2, 4, 13, 26]; // factors of 52: 1, 2, 4, 13, 26, and 52
    let piles = [];
    let numShuffles = 1024;

    for (i = 0; i < numShuffles; i++) {
        let numPiles = factors[Math.floor(Math.random() * factors.length)];
        let sizePiles = 52 / numPiles;
        for (let s = 0; s < sizePiles; s++) {
            piles[s] = [];
            for (let n = numPiles - 1; n >= 0; n--) {
                piles[s][n] = currentDeck[currentIndex++];
            }
        }
        currentDeck = [].concat(...piles);
        currentIndex = 0;
        piles = [];
    }

    return currentDeck;
}

function declareWinner(player) { // player is 1 or 0
    if (player > 1 || player < 0 || player === null || player === undefined) console.log("'player' should be 1 or 0")
    let msg = player === 0 ? "RED" : "BLUE";
    let color = player === 0 ? "#d34f3e" : "#70a8ab";
    header.style.display = "flex";
    header.textContent = `${msg} WINS!!!`;
    header.style.color = color;
}

function draw() {
    let rand1 = Math.floor(Math.random() * deck.length);
    let rand2 = Math.floor(Math.random() * deck.length);
    console.log("rand1: " + rand1);
    console.log(deck[rand1]);

    setCardImage(0, deck[rand1].image);
    setCardImage(1, deck[rand2].image);

    // declareWinner(1);
    // declareWinner(0);
}

function init() {
    setCardImage(0);
    setCardImage(1);
    header.style.display = "none";
    pointsOne.textContent = "";
    pointsTwo.textContent = "";
    scoreOne.textContent = "Score: 0";
    scoreTwo.textContent = "Score: 0";

    textboxOne.style.background = "radial-gradient(#d34f3e, #793345)";
    textboxTwo.style.background = "radial-gradient(#70a8ab, #326e75)";
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

/* background: radial-gradient(#d34f3e, #793345); */
/* background: radial-gradient(#70a8ab, #326e75); */