// waits for the application to load and then launches the app
window.addEventListener('load', start);

// registers key events and loads them into the guesses while the game is not over
window.addEventListener('keydown', (event) => {
  if (!myBoard.gameOver) myBoard.guessEntry(event.key);
});
