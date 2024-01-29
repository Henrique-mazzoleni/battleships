class Board {
  validInputs = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
  };

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.playerGuesses = [];
    this.boats = [];
    this.gameOver = false;
    this.guess = [];
  }

  start() {
    content.appendChild(this.canvas);

    const firstDestroyer = new Ship('destroyer', 1);
    const secondDestroyer = new Ship('destroyer', 2);
    const battleShip = new Ship('battleship', 3);

    this.boats.push(firstDestroyer);
    this.boats.push(secondDestroyer);
    this.boats.push(battleShip);

    this.boats.forEach((boat) => myBoard.placeShip(boat));
  }

  drawBoard() {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        if (i === 0 && j === 0) continue;
        if (i === 0) this.ctx.fillText(j - 1, i * 50 + 10, (j + 1) * 50 - 10);
        if (j === 0)
          this.ctx.fillText(
            Object.keys(this.validInputs)[i - 1].toUpperCase(),
            i * 50 + 10,
            (j + 1) * 50 - 10
          );
        if (i > 0 && j > 0) this.ctx.strokeRect(i * 50, j * 50, 50, 50);
      }
    }
  }

  placeShip(ship) {
    let placed = false;
    while (!placed) {
      const firstSquare = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];

      const direction = this.pickShipDirection(firstSquare, ship.size);
      const position = [];
      for (let i = 0; i < ship.size; i++) {
        switch (direction) {
          case 0:
            position.push([firstSquare[0], firstSquare[1] + i]);
            break;
          case 1:
            position.push([firstSquare[0] + i, firstSquare[1]]);
            break;
          case 2:
            position.push([firstSquare[0], firstSquare[1] - i]);
            break;
          default:
            position.push([firstSquare[0] - i, firstSquare[1]]);
            break;
        }
      }

      if (this.checkIfPositionIsFree(position)) {
        position.forEach(([y, x]) => (this.grid[y][x] = ship.id));
        break;
      }
    }
  }

  pickShipDirection(position, shipSize) {
    if (position[1] < shipSize) {
      if (position[0] < shipSize) {
        return [0, 1][Math.round(Math.random())];
      } else if (position[0] + shipSize > 9) {
        return [0, 3][Math.round(Math.random())];
      } else {
        return [0, 1, 3][Math.floor(Math.random() * 3)];
      }
    } else if (position[1] + shipSize > 9) {
      if (position[0] < shipSize) {
        return [1, 2][Math.round(Math.random())];
      } else if (position[0] + shipSize > 9) {
        return [2, 3][Math.round(Math.random())];
      } else {
        return [1, 2, 3][Math.floor(Math.random() * 3)];
      }
    } else {
      if (position[0] < shipSize) {
        return [0, 1, 2][Math.floor(Math.random() * 3)];
      } else if (position[0] + shipSize > 9) {
        return [0, 2, 3][Math.floor(Math.random() * 3)];
      } else {
        return [0, 1, 2, 3][Math.floor(Math.random() * 4)];
      }
    }
  }

  drawGuess([y, x]) {
    let boat;
    if (this.grid[y][x]) {
      this.alert('Hit!');
      this.ctx.fillStyle = 'red';

      boat = this.boats[this.grid[y][x] - 1];
      boat.enterHit([y, x]);
    } else {
      this.alert('Miss!');
      this.ctx.fillStyle = 'blue';
    }
    this.ctx.fillRect((x + 1) * 50, (y + 1) * 50, 50, 50);

    if (boat?.checkIfSunk()) {
      this.alert('Sink!');
      this.ctx.strokeStyle = 'yellow';
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      boat.hits.forEach(([y, x]) => {
        this.ctx.moveTo((x + 1) * 50, (y + 1) * 50);
        this.ctx.lineTo((x + 2) * 50, (y + 2) * 50);
        this.ctx.moveTo((x + 2) * 50, (y + 1) * 50);
        this.ctx.lineTo((x + 1) * 50, (y + 2) * 50);
      });
      this.ctx.stroke();
    }
    this.ctx.closePath();
    if (this.checkEndGame()) {
      this.alert('');
      this.gameOverScreen();
      this.gameOver = true;
    }
  }

  checkIfPositionIsFree(position) {
    return position.every(([y, x]) => this.grid[y][x] === 0);
  }

  guessEntry(input) {
    if (this.guess.length === 0) {
      this.alert('');
      if (Object.keys(this.validInputs).includes(input)) {
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(input.toUpperCase(), 600, 100);
        this.guess.push(this.validInputs[input]);
      } else {
        this.alert('Invalid Input');
      }
    } else {
      if (!isNaN(Number(input))) {
        this.guess.push(Number(input));
        this.ctx.fillText(input.toUpperCase(), 622, 100);
        this.insertGuess();
      } else {
        this.alert('Invalid Input');
      }
      this.guess = [];
    }
  }

  insertGuess() {
    this.playerGuesses.push(this.guess);
    this.drawGuess(this.guess.reverse());
  }

  alert(alert) {
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.clearRect(600, 50, 300, 100);
    this.ctx.fillText(alert, 600, 100);
  }

  gameOverScreen() {
    this.ctx.font = '50px Arial';
    this.ctx.fillStyle = 'purple';
    this.ctx.fillRect(50, 50, 500, 500);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText('Game Over!', 160, 200);
    this.ctx.fillText('Congratulations!', 120, 270);
    this.ctx.font = '35px Arial';
    this.ctx.fillText('You sunk all the ships!', 130, 350);
    this.ctx.font = '25px Arial';
    this.ctx.fillText('Press F5 to play again.', 170, 450);
  }

  checkEndGame() {
    return this.boats.every((boat) => boat.isSunk);
  }
}
