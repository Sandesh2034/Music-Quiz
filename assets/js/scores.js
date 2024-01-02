const highscoresList = document.getElementById("highscores");
const clearButton = document.getElementById("clear");

function displayHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highscoresList.innerHTML = highScores
    .map((score, index) => `<li>${index + 1}. ${score.initials}: ${score.score}</li>`)
    .join("");
}

clearButton.addEventListener("click", function () {
  localStorage.removeItem("highScores");
  displayHighScores();
});

displayHighScores();
