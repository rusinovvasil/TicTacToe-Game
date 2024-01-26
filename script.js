let currentPlayer = "X";
let cells = document.getElementsByTagName("td");
let gameWon = false;
let winningCells = [];
let newGameMessageShown = false;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (!gameWon && this.innerHTML === "") {
      this.innerHTML = currentPlayer;
      this.classList.add(currentPlayer === "X" ? "playerX" : "playerO");
      checkForWinner();
      switchPlayer();
    }
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function showNewGameModal() {
  if (!newGameMessageShown) {
    let newGameModal = document.createElement("div");
    newGameModal.id = "newGameModal";
    newGameModal.innerHTML =
      "<p>Do you want to start a new game?</p>" +
      "<button onclick='startNewGame()'>Yes</button>" +
      "<button onclick='closeModal()'>No</button>";
    document.body.appendChild(newGameModal);
    newGameMessageShown = true;
  }
}

function startNewGame() {
  newGameMessageShown = false;
  closeModal();
  gameWon = false;
  winningCells = [];
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].classList.remove("playerX", "playerO", "winner");
  }
  currentPlayer = "X";
}

function checkForWinner() {
  let rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    if (
      cells[row[0]].innerHTML !== "" &&
      cells[row[0]].innerHTML === cells[row[1]].innerHTML &&
      cells[row[1]].innerHTML === cells[row[2]].innerHTML
    ) {
      gameWon = true;
      winningCells = row;
      highlightWinner();
      let winner = currentPlayer === "X" ? "Player X" : "Player O";
      let message = "Game Over! The winner is: " + winner;
      let modal = document.createElement("div");
      modal.id = "winnerModal";
      modal.innerHTML =
        "<p>" +
        message +
        "</p><button onclick='showNewGameModal()'>OK</button>";
      document.body.appendChild(modal);
      break;
    }
  }

  if (!gameWon && allCellsFilled()) {
    alert("Tie game!");
  }
}

function closeModal() {
  let modal = document.querySelector("div");
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
}

function allCellsFilled() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

function highlightWinner() {
  for (let i = 0; i < winningCells.length; i++) {
    cells[winningCells[i]].classList.add("winner");
  }
}
