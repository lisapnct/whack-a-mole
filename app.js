// const square = document.querySelectorAll(".square");
const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
// const rabbit = document.querySelectorAll(".rabbit");
const livesLeft = document.querySelector("#fas");
const score = document.querySelector("#score");

let totalLives = 3;
let finalScore = 0;
// let currentTime = 30;

function displayMole() {
  let randomPosition = hole[Math.floor(Math.random() * 12)];
  // check if randomPosition already has bob class
  if (randomPosition.classList.contains('bob-out')) {
    displayMole();
  } else {
    randomPosition.classList.add("mole-out");
  }
}

function hideMole() {
  hole.forEach((hole) => {
    hole.classList.remove("mole-out");
  });
}

function moveMole() {
  setInterval(displayMole, 1200);
  setInterval(hideMole, 2400);
}

function displayBob() {
  let randomPosition = hole[Math.floor(Math.random() * 12)];
  if (randomPosition.classList.contains('mole-out')) {
    displayBob();
  } else {
    randomPosition.classList.add("bob-out");
  }
  // to avoid displaying rabbit on mole: if randomPosition !contains "mole" class = display else displayRabbit() (= loop?)
}

function hideBob() {
  hole.forEach((hole) => {
    hole.classList.remove("bob-out");
    hole.classList.remove("mole-hit");
  });
}

function moveBob() {
  setInterval(displayBob, 3000);
  setInterval(hideBob, 6000);
}

function countLives() {
  totalLives = totalLives - 1;

  if (totalLives === 0) {
    alert("GAME OVER!! Your final score is: " + finalScore + "points");
  }
}

// calculate score depending on which square the user clicked (based on classList)
function calculateScore(clickedHole) {
  // on click on a mole : +1 point
  if (clickedHole.classList.contains("mole-out")) {
    console.log("it's a mole");
    clickedHole.classList.add("mole-hit");
    finalScore = finalScore + 1;
    score.innerText = finalScore;
  }

  //on click on a rabbit: -2 points
  if (clickedHole.classList.contains("bob-out")) {
    console.log("it's bob!!");
    finalScore = finalScore - 1;
    countLives();
  }
}

// listen to all clicks and run calculateScore on the event.target
hole.forEach((hole) => {
  hole.addEventListener("click", (evt) => {
    let clickedHole = evt.target;
    calculateScore(clickedHole);
  });
});

window.addEventListener("load", () => {
  alert("START GAME");
  moveMole();
  moveBob();
});

// -------------
// - score should not be < 0
// - add a if(...) on set mole/rabbit class to avoid square with mole + rabbit classes
