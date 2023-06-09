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
    question: "How do you write a single-line comment in JavaScript?",
    answers: ["/* Comment */", "<!-- Comment -->", "// Comment", "# Comment"],
    correctAnswerIndex: 2
  },
  {
    questionNumber: "Question 2",
    question: "How do you access the last element of an array in JavaScript?",
    answers: ["array.last()", "array.pop()", "array[array.length - 1]", "array.lastElement()"],
    correctAnswerIndex: 2
  },
  {
    questionNumber: "Question 3",
    question: "What does the parseInt() function do in JavaScript?",
    answers: ["Returns the decimal representation of a binary number", "Converts a string to an integer", "Rounds a number to the nearest integer", " Returns the fractional part of a number"],
    correctAnswerIndex: 1
  },
  {
    questionNumber: "Question 4",
    question: "What does the Math.random() function return in JavaScript?",
    answers: [" A random integer between 0 and 1", "A random float between 0 and 1", " A random positive integer", " A random number with a large number of decimal places"],
    correctAnswerIndex: 1
  },
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
//Start quiz button
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
//populates questions
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
//gives either correct or incorrect grade and then changes time and score
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
//end quiz and prompt user for name and to retry
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

  //hide hi scores if open
  var highScoreList = document.getElementById("high-score-list");
  highScoreList.innerHTML = "";
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