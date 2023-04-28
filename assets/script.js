var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
var quizEl = document.getElementById(".quiz");
var questionNumberEl = document.getElementById(".questionNumber");
var questionEl = document.getElementById(".question");
var answerEL = document.getElementById(".answer");

var secondsLeft = 75;
//Code for timer and quiz end
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function sendMessage() {
  timeEl.textContent = " ";
  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", "images/image_1.jpg");
  mainEl.appendChild(imgEl);

}

setTime();


//Code for quiz questions and answer


var quiz = [
    {
      questionNumber: "Question 1",
      question: "What is the capital of France?",
      answers: ["London", "Paris", "Madrid", "Berlin"],
      correctAnswerIndex: 1
    },
    {
      questionNumber: "Question 2",
      question: "What is the largest country in the world by land area?",
      answers: ["Russia", "China", "Canada", "United States"],
      correctAnswerIndex: 0
    },
    // add more questions here
];

function question(index) {
    var question = quiz[index];
    var questionNumberEl = document.querySelector(".questionNumber");
    var questionEl = document.querySelector(".question");
    var answerEls = document.querySelectorAll(".answers li");
  
    // populate the elements
    questionNumberEl.textContent = question.questionNumber;
    questionEl.textContent = question.question;
    for (var i = 0; i < question.answers.length; i++) {
      answerEls[i].textContent = question.answers[i];
    }
}

var currentQuestionIndex = 0;
question(currentQuestionIndex);

var nextQuestionButton = document.querySelector("#nextQuestion");
nextQuestionButton.addEventListener("click", function() {
  currentQuestionIndex++;
  question(currentQuestionIndex);
});