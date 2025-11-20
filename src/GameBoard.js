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

    placeShip(place) {
        const positionConfig = (position, direction, length) => {
            const positions = [];
            const [startX, startY] = position;
            for (let i = 0; i < length; i++) {
                if (direction === 'vertical') {
                    positions.push([startX + i, startY]);
                } else {
                    positions.push([startX, startY + i]);
                }
            }
            return positions;
        }
        const ship = {
            ship: place.ship,
            position: positionConfig(place.position, place.direction, place.ship.length),
            direction: place.direction,
        }
        this.ships.push(ship);
    }
}
export { GameBoard }