var timeEl = document.querySelector(".time");
var mainEl = document.querySelector(".main");
var questionNumberEl = document.getElementById("questionNumber");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answers");
var startButton = document.getElementById("startButton");
var nextQuestionButton = document.getElementById("nextQuestion");
var tryAgainButton = document.getElementById("tryAgain");

var secondsLeft = 75;
var currentQuestion = 0;
var score = 0;
var timerInterval;

var quiz = [
  {
    questionNumber: "Question 1",
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Rome"],
    correctAnswerIndex: 0
  },
  {
    questionNumber: "Question 2",
    question: "Who is the author of 'To Kill a Mockingbird'?",
    answers: ["Harper Lee", "J.K. Rowling", "F. Scott Fitzgerald", "George Orwell"],
    correctAnswerIndex: 0
  },
  // Add more questions...
];

function startTimer() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function startQuiz() {
  startButton.style.display = "none";
  nextQuestionButton.style.display = "block";
  tryAgainButton.style.display = "none";
  secondsLeft = 75;
  score = 0;
  currentQuestion = 0;
  startTimer();
  showQuestion();
  var highScoreButton = document.getElementById("high-score");
  highScoreButton.addEventListener("click", showHighScores);
}

function showQuestion() {
  var quizQuestion = quiz[currentQuestion];

  questionNumberEl.textContent = quizQuestion.questionNumber;
  questionEl.textContent = quizQuestion.question;
  answerEl.innerHTML = "";

  for (var i = 0; i < quizQuestion.answers.length; i++) {
    var answer = quizQuestion.answers[i];
    var answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", function () {
      checkAnswer(this, quizQuestion.correctAnswerIndex);
    });

    var li = document.createElement("li");
    li.appendChild(answerButton);
    answerEl.appendChild(li);
  }
}

function checkAnswer(selectedAnswerButton, correctAnswerIndex) {
  if (correctAnswerIndex === Array.from(answerEl.children).indexOf(selectedAnswerButton.parentElement)) {
    alert("Correct!");
    score++;
  } else {
    alert("Wrong!");
    secondsLeft -= 10;
  }

  currentQuestion++;

  if (currentQuestion < quiz.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  timeEl.textContent = "Quiz Over!";
  questionNumberEl.textContent = "Game Over!";
  questionEl.textContent = "Final Score: " + score;
  answerEl.innerHTML = "";
  startButton.style.display = "none";
  nextQuestionButton.style.display = "none";
  tryAgainButton.style.display = "block";

  var playerName = prompt("Enter your name:");
  if (playerName) {
    var playerScore = {
      name: playerName,
      score: score
    };
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(playerScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

function resetQuiz() {
  questionNumberEl.textContent = "";
  questionEl.textContent = "";
  answerEl.innerHTML = "";
  startButton.style.display = "block";
  nextQuestionButton.style.display = "none";
  tryAgainButton.style.display = "none";
}

function showHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  var highScoreList = document.getElementById("high-score-list");
  highScoreList.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var scoreEntry = document.createElement("p");
    scoreEntry.textContent = highScores[i].name + " - " + highScores[i].score;
    highScoreList.appendChild(scoreEntry);
  }
}



startButton.addEventListener("click", startQuiz);
nextQuestionButton.addEventListener("click", function () {
  currentQuestion++;
  showQuestion();
});
tryAgainButton.addEventListener("click", resetQuiz);