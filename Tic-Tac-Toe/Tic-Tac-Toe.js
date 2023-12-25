const board = document.getElementById('board');
const playerNameInput = document.getElementById('player-name');
const symbolSelector = document.getElementById('symbol-selector');
const startGameButton = document.querySelector('button');
let playerName = '';
let selectedSymbol = '';
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = false;

function startGame() {
  playerName = playerNameInput.value.trim();
  selectedSymbol = symbolSelector.value;

  if (playerName === '' || selectedSymbol === '') {
    alert('Please enter your name and choose a symbol to start the game.');
    return;
  }

  gameActive = true;
  currentPlayer = selectedSymbol;
  createBoard();
  disablePlayerInfo();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  return null;
}

function checkDraw() {
  return !gameBoard.includes('');
}

function handleClick(index) {
  if (!gameActive || gameBoard[index] !== '') {
    return;
  }

  gameBoard[index] = currentPlayer;
  updateBoard();

  const winner = checkWinner();
  if (winner) {
    alert(`${playerName}, you win!`);
    resetGame();
  } else if (checkDraw()) {
    alert('It\'s a draw!');
    resetGame();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function createBoard() {
  board.innerHTML = '';
  gameBoard = Array(9).fill('');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });
}

function resetGame() {
  gameActive = false;
  playerNameInput.value = '';
  selectedSymbol = '';
  currentPlayer = 'X';
  enablePlayerInfo();
  createBoard();
}

function disablePlayerInfo() {
  playerNameInput.disabled = true;
  symbolSelector.disabled = true;
  startGameButton.disabled = true;
}

function enablePlayerInfo() {
  playerNameInput.disabled = false;
  symbolSelector.disabled = false;
  startGameButton.disabled = false;
}

symbolSelector.addEventListener('change', function() {
  selectedSymbol = this.value;
  startGameButton.disabled = false;
});

startGameButton.addEventListener('click', startGame);
