class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.isSunk = () => this.hits >= this.length;   
    }

    hit = () => this.hits += 1
}

export { Ship }