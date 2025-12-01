class GameBoard {
    constructor() {
        this.ships = [];
        this.misses = [];
    }
    allShipsSunk() {
        return this.ships.every(({ ship }) => ship.isSunk());
    }
    receiveAttack(coodinate) {
        if (this.misses.some((miss) => miss[0] === coodinate[0] && miss[1] === coodinate[1])) {
            return
        }
        for (let i = 0; i < this.ships.length; i++) {
            const ship = this.ships[i];
            if (!ship.ship.isSunk()) {
                for (let j = 0; j < ship.position.length; j++) {
                    const position = ship.position[j];
                    if (position[0] === coodinate[0] && position[1] === coodinate[1]) {
                        ship.ship.hit();
                        return;
                    }
                }
            } else {
                return
            }
        }
        this.misses.push(coodinate);
    }
    #generatePositions(position, direction, length) {
        const [startX, startY] = position;
        const positions = [];

        for (let i = 0; i < length; i++) {
            const x = direction === 'vertical' ? startX + i : startX;
            const y = direction === 'horizontal' ? startY + i : startY;
            positions.push([x, y]);
        }

        return positions;
    }
    #checkCollision(newPositions) {
    for (const ship of this.ships) {
        for (const pos of ship.position) {
            if (newPositions.some(([x, y]) => pos[0] === x && pos[1] === y)) {
                return true;
            }
        }
    }
    return false;
}


    placeShip(place) {
        const position = this.#generatePositions(place.position, place.direction, place.ship.length);
        if (this.#checkCollision(position)) {    
            return false;
        }
        this.ships.push({ ship: place.ship, position, direction: place.direction });
        return true;
    }
}
export { GameBoard }