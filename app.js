const allSquares = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
console.log(allSquares);
console.log(score);

let finalScore = 0;

function clickedSomething() {
  console.log("clicked");
}

allSquares.forEach((element) => {
  element.addEventListener("click", clickedSomething);
});
