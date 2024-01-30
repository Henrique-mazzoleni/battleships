class Ship {
  /*
    Ship Class:
      type: 'destroyer' | 'battleship'
      hits: [x:coordinate, y:coordinate][] *where the ship has been hit
      isSunk: boolean
      id: number *identified the ship on the board grid
      size: 4 | 5 *deppends on the ship type
  */
  constructor(type, id) {
    this.type = type;
    this.hits = [];
    this.isSunk = false;
    this.id = id;

    if (this.type === 'destroyer') {
      this.size = 4;
    } else {
      this.size = 5;
    }
  }

  // registers any hit and logs it in the hits array if it is a new hit
  enterHit(position) {
    const newHit = this.hits.every(
      (pos) => pos[0] !== position[0] || pos[1] !== position[1]
    );
    if (newHit) {
      this.hits.push(position);
    }
  }

  // checks if the ship has been sunk and updates isSunk accordingly
  checkIfSunk() {
    if (this.hits.length === this.size) {
      this.isSunk = true;
    }
    return this.isSunk;
  }
}
