class Ship {
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

  enterHit(position) {
    const newHit = this.hits.every(
      (pos) => pos[0] !== position[0] || pos[1] !== position[1]
    );
    if (newHit) {
      this.hits.push(position);
    }
  }

  checkIfSunk() {
    if (this.hits.length === this.size) {
      this.isSunk = true;
    }
    return this.isSunk;
  }
}
