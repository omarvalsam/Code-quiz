const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");

startButton.addEventListener("click", startgame);
// start the game
function startgame() {
  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
}

// show next question
function setNextQuestion() {}

//choose a new question
function selectAnswer() {}
