const content = document.querySelector('#content');

const myBoard = new Board();

const setWindow = () => {
  myBoard.canvas.width = 550;
  myBoard.canvas.height = 550;

  myBoard.drawBoard();
};

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
