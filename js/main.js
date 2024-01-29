const content = document.querySelector('#content');

const myBoard = new Board();

const setWindow = () => {
  myBoard.canvas.width = 800;
  myBoard.canvas.height = 1300;

  myBoard.drawBoard();
};

const start = () => {
  myBoard.start();
  setWindow();
};