window.addEventListener('load', start);

window.addEventListener('keydown', (event) => {
  console.log(event.key);
  myBoard.guessEntry(event.key);
});
