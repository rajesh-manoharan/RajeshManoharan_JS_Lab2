// Question object -- 
// text - question to user
// choices - options to select 
// answer - correct answer
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// create questions array here
var questions = [
  new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];


function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.index = 0;
}

Quiz.prototype.isEnded = function () {
  return this.index === this.questions.length;
}

Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.index];
}

Quiz.prototype.updateScore = function (choice) {
  if (this.questions[this.index].answer === choice) {
    this.score++;
  }
  this.index++;
}

let quiz = new Quiz(questions);

const questionElement = document.getElementById("question");
const trackElement = document.getElementById("progress");

function loadquestions() {
  if (quiz.isEnded()) {
    showResults();
  }
  else {
    currentQuestion = quiz.getCurrentQuestion();
    questionElement.innerText = currentQuestion.text;
    options = currentQuestion.choices;

    for (let iterateIndex = 0; iterateIndex < options.length; iterateIndex++) {
      document.getElementById('btn' + iterateIndex).innerText = options[iterateIndex];
      handleButtonClick('btn' + iterateIndex);
    }
  }
  showProgress();
}

function showProgress () {
    document.getElementById('progress').innerText = `Question ${quiz.index + 1} of ${quiz.questions.length}`;
}

function handleButtonClick(buttonClick) {
  let choice = document.getElementById(buttonClick);
  choice.onclick = function () {
    quiz.updateScore(choice.innerText);
    loadquestions();
  }
}

function showResults() {
  let quizResult = ((quiz.score / quiz.questions.length) * 100).toFixed(2);
  let quizResultHTML = '<h1>Results</h1>';
  quizResultHTML+= `<h2 id="score"> Your Scores:- ${quiz.score} and Percentage is:- ${quizResult} <h2>`;
  quizResultElement = document.getElementById('quiz');
  quizResultElement.innerHTML = quizResultHTML;
};

loadquestions();
