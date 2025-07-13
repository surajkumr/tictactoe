const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const strike = document.getElementById("strike");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      drawStrike(combo);
      return true;
    }
  }
  return false;
}

function drawStrike(combo) {
  const lineStyles = {
    "0,1,2": { rotate: "0deg", top: "16.6%", left: "50%" },
    "3,4,5": { rotate: "0deg", top: "50%", left: "50%" },
    "6,7,8": { rotate: "0deg", top: "83.3%", left: "50%" },
    "0,3,6": { rotate: "90deg", top: "50%", left: "16.6%" },
    "1,4,7": { rotate: "90deg", top: "50%", left: "50%" },
    "2,5,8": { rotate: "90deg", top: "50%", left: "83.3%" },
    "0,4,8": { rotate: "45deg", top: "50%", left: "50%" },
    "2,4,6": { rotate: "-45deg", top: "50%", left: "50%" }
  };

  const key = combo.join(",");
  const styles = lineStyles[key];

  strike.style.top = styles.top;
  strike.style.left = styles.left;
  strike.style.transform = `translate(-50%, -50%) rotate(${styles.rotate}) scaleX(1)`;
}

function resetGame() {
  board.fill("");
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
  status.textContent = "Player X's turn";
  strike.style.transform = "translate(-50%, -50%) scaleX(0)";
}

cells.forEach((cell, index) => {
  cell.dataset.index = index;
  cell.addEventListener("click", handleClick);
});
resetBtn.addEventListener("click", resetGame);
