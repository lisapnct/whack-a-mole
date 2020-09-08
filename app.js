const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const livesLeft = document.querySelector("#fas");
const score = document.querySelector("#score");

let totalLives = 3;
let finalScore = 0;

function displayMole() {
  let randomPosition = hole[Math.floor(Math.random() * 12)];
  // check if randomPosition already has bob class
  if (randomPosition.classList.contains("bob-out")) {
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
  setInterval(displayMole, 3000);
  setInterval(hideMole, 6000);
}

function displayBob() {
  let randomPosition = hole[Math.floor(Math.random() * 12)];
  if (randomPosition.classList.contains("mole-out")) {
    displayBob(); // avoid putting mole out AND bob out on the same hole
  } else {
    randomPosition.classList.add("bob-out");
  }
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
  // I run this function when bob is clicked so:
  totalLives = totalLives - 1;
  console.log(`lives left: ` + totalLives);

  if (totalLives === 2) {
    document.getElementById("heart-one").classList.replace("fas", "far");
  } else if (totalLives === 1) {
    document.getElementById("heart-two").classList.replace("fas", "far");
  } else if (totalLives === 0) {
    document.getElementById("heart-three").classList.replace("fas", "far");
    alert("GAME OVER!! Your final score is: " + finalScore + "points");
  }
}

// calculate score depending on which hole the user clicked
function calculateScore(clickedHole) {
  // on click on a mole : +1 point
  if (clickedHole.classList.contains("mole-out")) {
    console.log("it's a mole");
    finalScore = finalScore + 1;
    score.innerText = finalScore;
    console.log(`score = ${finalScore}`);
    clickedHole.classList.add("mole-hit");
  }
  //on click on Bob: -1 point && -1 life
  if (clickedHole.classList.contains("bob-out")) {
    console.log("it's bob!!");
    if (finalScore >= 1) {
      finalScore = finalScore - 1;
      score.innerText = finalScore;
      console.log(`score = ${finalScore}`);
    }
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
