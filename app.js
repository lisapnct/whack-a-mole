const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
// console.log(allSquares);
// console.log(score);

let finalScore = 0;
let currentTime = timeLeft.innerText;
let winSquareId = "";

function randomSquare() {
  square.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomPosition = square[Math.floor(Math.random() * 9)];
  randomPosition.classList.add("mole");

  winSquareId = randomPosition.id;
}

function moveMole() {
  let molesMoving = setInterval(randomSquare, 900);
  if (currentTime === 0) {
    clearInterval(molesMoving);
  }
}

// moveMole();

let timer = setInterval(countDown, 1000);

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  console.log(currentTime);

  if (currentTime === 0) {
    clearInterval(timer);
    alert("GAME OVER!! Your final score is: " + finalScore + "points");
  }
}

square.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.id === winSquareId) {
      finalScore = finalScore + 1;
      score.innerText = finalScore;
    }
  });
});

// TODO
// - alert: start game => lance compteur et moveMole()
