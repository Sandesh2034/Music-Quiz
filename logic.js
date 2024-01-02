const timeElement = document.getElementById("time");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const endScreenElement = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

function startQuiz() {
  startButton.parentElement.classList.add("hide");
  endScreenElement.classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  timerInterval = setInterval(function () {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);

  displayQuestion();
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTitleElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = `${index + 1}. ${choice}`;
    button.addEventListener("click", checkAnswer);
    choicesElement.appendChild(button);
  });
}

function checkAnswer(event) {
  const selectedAnswer = event.target.textContent.slice(3); 
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    feedbackElement.textContent = "Correct!";
  } else {
    // Incorrect answer
    feedbackElement.textContent = "Incorrect!";
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval); 
  document.getElementById("questions").classList.add("hide");
  endScreenElement.classList.remove("hide");
  finalScoreElement.textContent = timeLeft;

  submitButton.addEventListener("click", function () {
    saveHighScore();
    location.href = "highscores.html";
  });
}

function saveHighScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push({ initials, score: timeLeft });

    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

const startButton = document.getElementById("start");


startButton.addEventListener("click", startQuiz);
