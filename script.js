const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const quitButton = document.getElementById("quit-btn");

const questionContainerElement = document.getElementById("question-container");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// Section for timer for quiz!
let secondsLeft = 180;
const timer = document.getElementById("timer");
function countdownTimer() {
  let timerInterval = setInterval(() => {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || !selectAnswer) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

//section for High scores
let scores = document.getElementById("scores");
let scoresButton = document.getElementById("high-scores");
let results = document.getElementById("results");
let score = 0;

// array for high-scores from local storage
var scoresArray = [];
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

//Questions section
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startgame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// start the game
function startgame() {
  countdownTimer();
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

// show next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      score += secondsLeft;
    } else if (!answer.correct) {
      score -= 10;
      secondsLeft = secondsLeft - 15;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//choose a new question
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    quitButton.classList.remove("hide");
    captureUserScore();
    countdownTimer.remove();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Who is the best artist?",
    answers: [
      { text: "Rihanna", correct: true },
      { text: "Arianna", correct: false },
    ],
  },
  {
    question: "Who is the best 2nd artist?",
    answers: [
      { text: "Rihanna", correct: false },
      { text: "Arianna", correct: true },
    ],
  },
  {
    question: "if a woodchuck could chuck wood how much wood would he chuck?",
    answers: [
      { text: "WHO CARES!", correct: false },
      { text: "I DUNNO?!", correct: false },
      { text: "the limit does not exist", correct: true },
      { text: "2", correct: false },
    ],
  },
  {
    question: "Is coding fun?",
    answers: [
      { text: "I DUNNO?!", correct: false },
      { text: "I GUESSSSS", correct: false },
      { text: "yes", correct: true },
    ],
  },
  {
    question: "is the timer on this game making you nervous?",
    answers: [
      { text: "yes", correct: true },
      { text: "no", correct: true },
    ],
  },
  {
    question: "whats the best type of video game genre?",
    answers: [
      { text: "ALL OF THE ABOVE !!!", correct: true },
      { text: "FIGHTING", correct: false },
      { text: "RPG", correct: false },
      { text: "FPS", correct: false },
    ],
  },
];
