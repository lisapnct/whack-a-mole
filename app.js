const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const lives = document.querySelector("#lives");
const score = document.querySelector("#score");
const endScore = document.querySelector("#end-score");
const coins = document.querySelector("#coins");
const buyLifeBtn = document.querySelector("#more-lives-btn");
const buyLifeBtnLabel = document.querySelector("#more-life-label");
const gameOverWindow = document.querySelector("#game-over-window");
const restartBtn = document.querySelector(".restart-btn");
const container = document.querySelector(".grid-container");

let totalLives = 3;
let totalCoins = 0;
let finalScore = 0;

let level = 0;
let tick = 0;
let speed = {
  mole: {
    modulo: [180, 120, 60],
    hide: [4000, 3000, 1000],
  },
  bob: {
    modulo: [240, 120, 30],
    hide: [2000, 3000, 4000],
  },
  coin: {
    modulo: [240, 480, 960],
    hide: [3000, 2000, 1000],
  },
};

function getAvailableHoles() {
  return [...container.querySelectorAll(".hole")].filter(
    (hole) =>
      !hole.classList.contains("mole") &&
      !hole.classList.contains("bob") &&
      !hole.classList.contains("coin")
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function display(cssClass, hideTiming) {
  const availableHoles = getAvailableHoles(); // get only .hole without mole nor bob nor coin
  console.log(availableHoles);
  if (!availableHoles.length) return; // no available holes
  const randomHole = availableHoles[getRandomInt(0, availableHoles.length - 1)]; // pick one available hole
  randomHole.classList.add(cssClass); // add appropriate css class
  randomHole.onanimationend = () => {
    // track animation end
    const hideInterval = setTimeout(() => {
      // start hiding process
      hide(randomHole, cssClass); // hide
      clearTimeout(hideInterval); // clear time out
    }, hideTiming); // according to appropriate hideTiming/level (see speed object on top of this file)
  };
}

function draw() {
  if (tick % speed.mole.modulo[level] === 0)
    display("mole", speed.mole.hide[level]); // check speed object on top of this file ...
  if (tick % speed.bob.modulo[level] === 0)
    display("bob", speed.mole.hide[level]); // those values are dynamic ...
  if (tick % speed.coin.modulo[level] === 0)
    display("coin", speed.mole.hide[level]); // according to current level (from 0 to 2 (and counting ...))
  tick++; // increse tick 60 time per second
  requestAnimationFrame(draw); // recursive function call, repeating the full draw process
}

function gameOver() {
  gameOverWindow.classList.remove("hidden");
  endScore.innerText = `${finalScore}`;
  setTimeout(soundGameOver, 500);
}

function setLevel() {
  if (finalScore > 5 && finalScore < 10) {
    if (level != 1) level = 1; // increase level if not done yet
  } else if (finalScore > 10) {
    if (level != 2) level = 2; // same as above
  }
}

function setCoin() {
  totalCoins = totalCoins + 1;
  coins.innerText = totalCoins;
  displayBuyLifeBtn();
}

function setScore(points) {
  finalScore += points;
  score.innerText = finalScore;
}

function hide(hole, cssClass) {
  // cssClass can be mole or ob or coin
  hole.classList.remove(cssClass);
}

function looseLife() {
  totalLives--;
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
    gameOver();
  }
  displayBuyLifeBtn();
}

function kill(hole, who) {
  // who represents a css class : can be mole or bob
  hole.classList.replace(who, `${who}-hit`);
  const moleKillTimeoutID = setTimeout(() => {
    hole.classList.remove(who);
    hole.classList.remove(`${who}-hit`);
    clearTimeout(moleKillTimeoutID);
  }, 2000);
}

const handleClick = (evt) => {
  const clickedHole = evt.target; // clicked hole
  const isMole = clickedHole.classList.contains("mole"); // mole ?
  const isBob = clickedHole.classList.contains("bob"); // bob ?
  const isCoin = clickedHole.classList.contains("coin"); // coin ?
  if (!isMole && !isCoin && !isBob) return; // walou
  if (isBob) {
    soundBobHit();
    kill(clickedHole, "bob"); // damn !
    looseLife();
    setScore(-1); // decrement score
  } else if (isMole) {
    soundMoleHit();
    kill(clickedHole, "mole"); // aiiiight
    setScore(1); // increment score
  } else if (isCoin) {
    soundCoinHit();
    kill(clickedHole, "coin");
    setCoin(clickedHole);
  }
  setLevel();
};

hole.forEach((hole) => (hole.onmouseup = handleClick));
requestAnimationFrame(draw);

/////////////////

// function displayMole(himeTiming) {
//   const available = container.querySelectorAll(
//     ".hole:not(.bob), .hole:not(.coin)"
//   );
//   const randomPosition = available[Math.floor(Math.random() * 18)];
//   randomPosition.classList.add("mole");
//   randomPosition.onanimationend = (evt) => {
//     console.log("end anim !!!");

//     moleRemoveIntervalID = setTimeout(
//       () => removeOneMole(randomPosition),
//       himeTiming
//     );
//   };
//   //clbk(randomPosition);
// }

// function removeMole() {
//   console.log("clearing moles");
//   hole.forEach((hole) => {
//     hole.classList.remove("mole");
//     hole.classList.remove("mole-hit");
//   });
// }

// function removeOneMole(hole) {
//   hole.classList.remove("mole");
//   hole.classList.remove("mole-hit");
// }

// // moles should move faster and faster depending on score
// const mySetInterval = (clbk, timing) => setInterval(clbk, timing);
// //const clearInterval = (id) => clearInterval(id);

// function removeIntervals() {
//   clearInterval(moleDisplayIntervalID);
//   //clearInterval(moleRemoveIntervalID);
//   clearTimeout(moleRemoveIntervalID);
//   console.log("removed intervals done");
// }

// function increaseSpeed(displayTiming, himeTiming) {
//   moleDisplayIntervalID = mySetInterval(() => {
//     displayMole(himeTiming);
//   }, displayTiming);
//   //moleRemoveIntervalID = mySetInterval(removeMole, himeTiming);
// }

// function moveMole() {
//   if (finalScore > 5 && finalScore < 10) {
//     removeIntervals();
//     increaseSpeed(2000, 2500);
//   } else if (finalScore > 10) {
//     removeIntervals();
//     increaseSpeed(2000, 1000);
//   } else {
//     increaseSpeed(3000, 2000);
//   }
//   //moveMole()
//   //requestAnimationFrame(moveMole);
// }

// DISPLAY BOB ON THE GRID

// function displayBob() {
//   let randomPosition = hole[Math.floor(Math.random() * 18)];
//   if (randomPosition.classList.contains("mole")) {
//     displayBob();
//   } else if (randomPosition.classList.contains("coin")) {
//     displayBob();
//   } else {
//     randomPosition.classList.add("bob");
//   }
// }

// function hideBob() {
//   console.log("clearing bobs");
//   hole.forEach((hole) => {
//     hole.classList.remove("bob");
//     hole.classList.remove("bob-hit");
//   });
// }

// function moveBob() {
//   setInterval(displayBob, 4000);
//   setInterval(hideBob, 10000);
// }

// DISPLAY COINS ON THE GRID

// function displayCoin() {
//   let randomPosition = hole[Math.floor(Math.random() * 18)];
//   if (randomPosition.classList.contains("mole")) {
//     displayCoin();
//   } else if (randomPosition.classList.contains("bob")) {
//     displayCoin();
//   } else {
//     randomPosition.classList.add("coin");
//   }
// }

// function hideCoin() {
//   hole.forEach((hole) => {
//     hole.classList.remove("coin");
//     hole.classList.remove("coin-hit");
//   });
// }

// function moveCoin() {
//   setInterval(displayCoin, 5000);
//   setInterval(hideCoin, 6000);
// }

// CALCULATE AND DISPLAY LIVES (TOP RIGHT) + BUY LIFE BTN

// function calculateLives(clickedHole) {
//   if (clickedHole.classList.contains("bob-hit")) {
//     totalLives = totalLives - 1;
//     console.log(`lives left: ` + totalLives);
//     looseLife(); // display the right # of hearts
//     displayBuyLifeBtn(); // check if conditions to display the btn are now valid
//   }
// }

function displayBuyLifeBtn() {
  console.log(totalLives);
  if (totalCoins >= 2 && totalLives < 3) {
    buyLifeBtn.style.visibility = "visible";
    buyLifeBtnLabel.style.visibility = "visible";
  } else {
    buyLifeBtn.style.visibility = "hidden";
    buyLifeBtnLabel.style.visibility = "hidden";
  }
}

function buyLife() {
  console.log("wants to buy one life");
  totalCoins = totalCoins - 2;
  coins.innerText = totalCoins;
  totalLives = totalLives + 1;
  newLife();
  displayLives();
  displayBuyLifeBtn();
}

// CALCULATE AND DISPLAY SCORE

// function calculateScore(clickedHole) {
//   // on click on a mole : +1 point
//   console.log("clicked on: " + clickedHole.classList);
//   if (clickedHole.classList.contains("mole")) {
//     soundMoleHit();
//     clickedHole.classList.replace("mole", "mole-hit");
//     console.log("new class list: " + clickedHole.classList);
//     finalScore = finalScore + 1;
//     score.innerText = finalScore;
//     console.log(`score = ${finalScore}`);
//     moveMole();
//   }
//   //on click on Bob: -1 point && -1 life
//   if (clickedHole.classList.contains("bob")) {
//     soundBobHit();
//     clickedHole.classList.replace("bob", "bob-hit");
//     // console.log("it's bob!!");
//     console.log("new class list: " + clickedHole.classList);
//     if (finalScore >= 1) {
//       finalScore = finalScore - 1;
//       score.innerText = finalScore;
//       console.log(`-1point -> score = ${finalScore}`);
//     }
//   }
// }

// CALCULATE # OF COINS

// function calculateCoins(clickedHole) {
//   if (clickedHole.classList.contains("coin")) {
//     soundCoinHit();
//     clickedHole.classList.replace("coin", "coin-hit");
//     console.log("it's a coin!");
//     totalCoins = totalCoins + 1;
//     coins.innerText = totalCoins;
//   }
//   displayBuyLifeBtn();
// }

// PLAY SOUNDS

function soundBobHit() {
  var audio = new Audio("./sounds/bobhit.wav");
  audio.play();
}

function soundMoleHit() {
  var audio = new Audio("./sounds/molehit.m4a");
  audio.play();
}

function soundCoinHit() {
  var audio = new Audio("./sounds/coinhit.m4a");
  audio.play();
}

function soundGameOver() {
  var audio = new Audio("./sounds/gameover.m4a");
  audio.play();
}

function soundGetReady() {
  var audio = new Audio("./sounds/getready.m4a");
  audio.play();
}

function newLife() {
  var audio = new Audio("./sounds/livesup.m4a");
  audio.play();
}

// EVENT LISTENERS

// listen to all clicks: calculate score, lives and coins for each click
// hole.forEach((hole) => {
//   hole.addEventListener("mouseup", (evt) => {
//     let clickedHole = evt.target;
//     calculateScore(clickedHole);
//     calculateCoins(clickedHole);
//     calculateLives(clickedHole);
//     // disable click on the child
//   });
// });

// listen to clicks on "buy 1 extra life" btn
buyLifeBtn.addEventListener("click", buyLife);

restartBtn.addEventListener("click", () => window.location.reload(true));

// LAUNCH THE GAME ON PAGE LOAD

//var frameId = requestAnimationFrame(moveMole);
// moveMole();
// moveBob();
// moveCoin();

soundGetReady();
