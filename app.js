const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const lives = document.querySelector("#lives");
const score = document.querySelector("#score");
const coins = document.querySelector("#coins");
const buyLifeBtn = document.querySelector("#more-lives-btn");
const buyLifeBtnLabel = document.querySelector("#more-life-label");

let totalLives = 3;
let totalCoins = 0;
let finalScore = 0;

// DISPLAY MOLES ON THE GRID

function displayMole() {
  let randomPosition = hole[Math.floor(Math.random() * 18)];
  // check if randomPosition already has bob or coin class
  if (randomPosition.classList.contains("bob")) {
    displayMole();
  } else if (randomPosition.classList.contains("coin")) {
    displayMole();
  } else {
    randomPosition.classList.add("mole");
  }
}

function hideMole() {
  console.log('clearing moles')
  hole.forEach((hole) => {
    hole.classList.remove("mole");
    hole.classList.remove("mole-hit");
  });
}

function moveMole() {
  if (finalScore < 5) {
    setInterval(displayMole, 5000);
    setInterval(hideMole, 10000);
  } else if (finalScore > 5) {
    setInterval(displayMole, 5000);
    setInterval(hideMole, 8000);
  } else if (finalScore > 10) {
    setInterval(displayMole, 5000);
    setInterval(hideMole, 6000);
  } 
  // else if (finalScore > 15) {
  //   setInterval(displayMole, 1000);
  //   setInterval(hideMole, 3000);
  // }
}

// DISPLAY BOB ON THE GRID

function displayBob() {
  let randomPosition = hole[Math.floor(Math.random() * 18)];
  if (randomPosition.classList.contains("mole")) {
    displayBob();
  } else if (randomPosition.classList.contains("coin")) {
    displayBob();
  } else {
    randomPosition.classList.add("bob");
  }
}

function hideBob() {
  console.log('clearing bobs')
  hole.forEach((hole) => {
    hole.classList.remove("bob");
    hole.classList.remove("bob-hit");
  });
}

function moveBob() {
  setInterval(displayBob, 4000);
  setInterval(hideBob, 7000);
}

// DISPLAY COINS ON THE GRID

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
  setInterval(displayCoin, 7000);
  setInterval(hideCoin, 8500);
}

// CALCULATE AND DISPLAY LIVES (TOP RIGHT) + BUY LIFE BTN

function calculateLives(clickedHole) {
  if (clickedHole.classList.contains("bob-hit")) {
    totalLives = totalLives - 1;
    console.log(`lives left: ` + totalLives);
    displayLives(); // display the right # of hearts
    displayBuyLifeBtn(); // check if conditions to display the btn are now valid
  }
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
  displayLives();
  displayBuyLifeBtn();
}

function displayLives() {
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
}

// CALCULATE AND DISPLAY SCORE

function calculateScore(clickedHole) {
  // on click on a mole : +1 point
  console.log('clicked on: ' + clickedHole.classList);
  if (clickedHole.classList.contains("mole")) {
    clickedHole.classList.replace("mole", "mole-hit");
    // console.log("it's a mole");
    console.log('new class list: ' + clickedHole.classList);
    finalScore = finalScore + 1;
    score.innerText = finalScore;
    console.log(`score = ${finalScore}`);
    moveMole();
  }
  //on click on Bob: -1 point && -1 life
  if (clickedHole.classList.contains("bob")) {
    clickedHole.classList.replace("bob", "bob-hit");
    // console.log("it's bob!!");
    console.log('new class list: ' + clickedHole.classList);
    if (finalScore >= 1) {
      finalScore = finalScore - 1;
      score.innerText = finalScore;
      console.log(`-1point -> score = ${finalScore}`);
    }
  }
}

// CALCULATE # OF COINS

function calculateCoins(clickedHole) {
  if (clickedHole.classList.contains("coin")) {
    console.log("it's a coin!");
    totalCoins = totalCoins + 1;
    coins.innerText = totalCoins;
  }
  displayBuyLifeBtn();
}

// EVENT LISTENERS

// listen to all clicks: calculate score, lives and coins for each click
hole.forEach((hole) => {
  hole.addEventListener("mouseup", (evt) => {
    let clickedHole = evt.target;
    calculateScore(clickedHole);
    calculateCoins(clickedHole);
    calculateLives(clickedHole);
  });
});

// listen to clicks on "buy 1 extra life" btn
buyLifeBtn.addEventListener("click", buyLife);



// LAUNCH THE GAME ON PAGE LOAD
window.addEventListener("load", () => {
  moveMole();
  moveBob();
  moveCoin();
});
