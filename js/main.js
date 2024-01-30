// gets the element from the dom to insert the canvas element
const content = document.querySelector('#content');

// initiates an instance of the board
const myBoard = new Board();

// sets the size of the canvas element and calls the drawBoard method that draws the board on the screen
const setWindow = () => {
  myBoard.canvas.width = 800;
  myBoard.canvas.height = 1300;

  myBoard.drawBoard();
};

// starts the application
const start = () => {
  myBoard.start();
  setWindow();
};