window.addEventListener('load', start);

window.addEventListener('keydown', (event) => {
  if (!myBoard.gameOver) myBoard.guessEntry(event.key);
});
