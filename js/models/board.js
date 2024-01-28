class Board {
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
    this.playerGuesses = [
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
    this.boats = [];
    this.gameOver = false;
  }

  start() {
    content.appendChild(this.canvas);
  }

  drawBoard() {
    for (let i = 0; i <= 500; i += 50) {
      for (let j = 0; j <= 500; j += 50) {
        this.ctx.strokeRect(i, j, 50, 50);
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

      console.log(position);
      if (this.checkIfPositionIsFree(position)) {
        position.forEach(([y, x]) => (this.grid[y][x] = 1));
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

  drawShip() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.grid[i][j]) this.ctx.fillRect(j * 50, i * 50, 50, 50);
      }
    }
  }

  checkIfPositionIsFree(position) {
    return position.every(([y, x]) => this.grid[y][x] === 0);
  }

  checkHit(y, x) {
    return this.grid[y][x] === 1;
  }
}
