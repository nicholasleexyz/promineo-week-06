const suits = ["C", "D", "H", "S"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "01"];

class Card {
    constructor(image, value) {
        this.image = image;
        this.value = value;
    }
}

const cards = suits.map(s => ranks.map((r, i) => new Card(`${s}${r}.png`, i)));

let pointsOne = document.getElementById("points-player-one");
let pointsTwo = document.getElementById("points-player-two");
let currentCardOne = document.getElementById("card-player-one");
let currentCardTwo = document.getElementById("card-player-two");
let scoreOne = document.getElementById("score-player-one");
let scoreTwo = document.getElementById("score-player-two");;
let header = document.getElementById("header");
let textboxOne = document.getElementById("textbox-player-one");
let textboxTwo = document.getElementById("textbox-player-two");

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



header.style.display = "none";
pointsOne.textContent = "";
pointsTwo.textContent = "";
scoreOne.textContent = "Score: 0";
scoreTwo.textContent = "Score: 0";

textboxOne.style.background = "radial-gradient(#d34f3e, #793345)";
textboxTwo.style.background = "radial-gradient(#70a8ab, #326e75)";

setCardImage(0);
setCardImage(1);
setCardImage(0, "C01.png");
setCardImage(1, "H01.png");


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