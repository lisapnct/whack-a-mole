const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const lives = document.querySelector("#lives");
const score = document.querySelector("#score");
const coins = document.querySelector("#coins");
const buyLifeBtn = document.querySelector("#more-lives-btn");
const buyLifeBtnLabel = document.querySelector("#more-life-label");

// console.log(lives.innerHTML);

let totalLives = 3;
let totalCoins = 0;
let finalScore = 0;

function displayMole() {
  let randomPosition = hole[Math.floor(Math.random() * 18)];
  // check if randomPosition already has bob class
  if (randomPosition.classList.contains("bob")) {
    displayMole();
  } else {
    randomPosition.classList.add("mole");
  }
}

function hideMole() {
  hole.forEach((hole) => {
    hole.classList.remove("mole");
    hole.classList.remove("bob-hit");
  });
}

function moveMole() {
  if (finalScore < 5) {
    setInterval(displayMole, 2000);
    setInterval(hideMole, 5000);
  } else if (finalScore > 5) {
    setInterval(displayMole, 2000);
    setInterval(hideMole, 4000);
  } else if (finalScore > 10) {
    setInterval(displayMole, 2000);
    setInterval(hideMole, 3000);
  } else if (finalScore > 15) {
    setInterval(displayMole, 1000);
    setInterval(hideMole, 3000);
  }
}

function displayBob() {
  let randomPosition = hole[Math.floor(Math.random() * 18)];
  if (randomPosition.classList.contains("mole")) {
    displayBob(); // avoid putting mole out AND bob out on the same hole
  } else if (randomPosition.classList.contains("coin")) {
    displayBob();
  } else {
    randomPosition.classList.add("bob");
  }
}

function hideBob() {
  hole.forEach((hole) => {
    hole.classList.remove("bob");
    hole.classList.remove("bob-hit");
    hole.classList.remove("mole-hit");
  });
}

function moveBob() {
  setInterval(displayBob, 5000);
  setInterval(hideBob, 7000);
}

function displayCoin() {
  let randomPosition = hole[Math.floor(Math.random() * 18)];
  if (randomPosition.classList.contains("mole")) {
    displayCoin();
  } else if (randomPosition.classList.contains("bob")) {
    displayCoin();
  } else {
    randomPosition.classList.add("coin");
  }
}

function hideCoin() {
  hole.forEach((hole) => {
    hole.classList.remove("coin");
  });
}

function moveCoin() {
  setInterval(displayCoin, 8000);
  setInterval(hideCoin, 9000);
}

function displayLifes() {
  if (totalLives === 3) {
    lives.innerHTML = `<i class="fas fa-heart" id="heart-one"></i>
    <i class="fas fa-heart" id="heart-two"></i>
    <i class="fas fa-heart" id="heart-three"></i>`;
  } else if (totalLives === 2) {
    lives.innerHTML = `<i class="far fa-heart" id="heart-one"></i>
    <i class="fas fa-heart" id="heart-two"></i>
    <i class="fas fa-heart" id="heart-three"></i>`;
  } else if (totalLives === 1) {
    lives.innerHTML = `<i class="far fa-heart" id="heart-one"></i>
    <i class="far fa-heart" id="heart-two"></i>
    <i class="fas fa-heart" id="heart-three"></i>`;
  } else if (totalLives === 0) {
    lives.innerHTML = `<i class="far fa-heart" id="heart-one"></i>
    <i class="far fa-heart" id="heart-two"></i>
    <i class="far fa-heart" id="heart-three"></i>`;

    alert("GAME OVER!! Your final score is: " + finalScore + "points");
  }
  displayBuyLifeBtn();
}

// calculate score depending on which hole the user clicked
function calculateScore(clickedHole) {
  // on click on a mole : +1 point
  if (clickedHole.classList.contains("mole")) {
    clickedHole.classList.replace("mole", "mole-hit");
    console.log("it's a mole");
    finalScore = finalScore + 1;
    score.innerText = finalScore;
    console.log(`score = ${finalScore}`);
  }
  //on click on Bob: -1 point && -1 life
  if (clickedHole.classList.contains("bob")) {
    clickedHole.classList.replace("bob", "bob-hit");
    console.log("it's bob!!");
    if (finalScore >= 1) {
      finalScore = finalScore - 1;
      score.innerText = finalScore;
      console.log(`score = ${finalScore}`);
    }
  }
}

function calculateLives(clickedHole) {
  if (clickedHole.classList.contains("bob-hit")) {
    totalLives = totalLives - 1;
    console.log(`lives left: ` + totalLives);
    displayLifes();
  }
}

function calculateCoins(clickedHole) {
  if (clickedHole.classList.contains("coin")) {
    console.log("it's a coin!");
    totalCoins = totalCoins + 1;
    coins.innerText = totalCoins;
  }
  displayBuyLifeBtn();
}

function displayBuyLifeBtn() {
  if (totalCoins >= 5 && totalLives < 3) {
    buyLifeBtn.style.visibility = "visible";
    buyLifeBtnLabel.style.visibility = "visible";
  } else {
    buyLifeBtn.style.visibility = "hidden";
    buyLifeBtnLabel.style.visibility = "hidden";
  }
}

function buyLife() {
  console.log("wants to buy one life");
  totalCoins = totalCoins - 5;
  coins.innerText = totalCoins;
  totalLives = totalLives + 1;
  displayLifes();
  displayBuyLifeBtn();
}

// listen to all clicks and run calculateScore on the event.target
hole.forEach((hole) => {
  hole.addEventListener("mouseup", (evt) => {
    let clickedHole = evt.target;
    calculateScore(clickedHole);
    calculateCoins(clickedHole);
    calculateLives(clickedHole);
  });
});

buyLifeBtn.addEventListener("click", buyLife);

window.addEventListener("load", () => {
  alert("START GAME");
  moveMole();
  moveBob();
  moveCoin();
});

// -------------
// - score should not be < 0
