class GameBoard {
    constructor() {
        this.ships = [];
        this.misses = [];
    }
    allShipsSunk() {
        return this.ships.every(({ ship }) => ship.isSunk());
    }
    receiveAttack(coordinate) {
        // Si ya fue atacada antes, no cuenta
        if (this.misses.some((miss) => miss[0] === coordinate[0] && miss[1] === coordinate[1])) {
            return false;
        }

        for (let i = 0; i < this.ships.length; i++) {
            const ship = this.ships[i];
            if (!ship.ship.isSunk()) {
                for (let j = 0; j < ship.position.length; j++) {
                    const position = ship.position[j];
                    if (position[0] === coordinate[0] && position[1] === coordinate[1]) {
                        ship.ship.hit();
                        return true; // ✅ impacto
                    }
                }
            }
        }

        // Si llegó aquí, fue un fallo
        this.misses.push(coordinate);
        return false;
    }


    #generatePositions(position, direction, length) {
        const [startX, startY] = position;
        const positions = [];
        const boardLimit = 9;

        for (let i = 0; i < length; i++) {
            const x = direction === 'vertical' ? startX + i : startX;
            const y = direction === 'horizontal' ? startY + i : startY;
            if (x > boardLimit || y > boardLimit || x < 0 || y < 0) {
                return null;
            }
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
        if (!position) {
            return false;
        } else if (this.#checkCollision(position)) {
            return false;
        } else {
            this.ships.push({ ship: place.ship, position, direction: place.direction });
            return true;
        }
    }
}
export { GameBoard }