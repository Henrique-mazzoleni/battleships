const content = document.querySelector('#content');

const myBoard = new Board();

const setWindow = () => {
  myBoard.canvas.width = 800;
  myBoard.canvas.height = 800;

  myBoard.drawBoard();
};

const start = () => {
  myBoard.start();
  setWindow();

  const firstDestroyer = new Ship('destroyer');
  myBoard.placeShip(firstDestroyer);
  myBoard.drawShip();

  const secondDestroyer = new Ship('destroyer');
  myBoard.placeShip(secondDestroyer);
  myBoard.drawShip();

  const battleShip = new Ship('battleship');
  myBoard.placeShip(battleShip);
  myBoard.drawShip();
};