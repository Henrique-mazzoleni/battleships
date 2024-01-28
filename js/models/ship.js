class Ship {
  constructor(type) {
    this.type = type;
    if (this.type === 'destroyer') {
      this.size = 4;
    } else {
      this.size = 5;
    }
  }
}
