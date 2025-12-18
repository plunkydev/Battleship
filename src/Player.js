import { GameBoard } from "../src/GameBoard.js"
class Player {
    constructor(name) {
        this.name = name;
        this.attacks = [];
        this.board = new GameBoard();
    }
    attack(opponent, coordinates) {
        this.attacks.push(coordinates);
        return opponent.board.receiveAttack(coordinates);
    }
    randomAttack(opponent) {
        let x, y, coordinate;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            coordinate = [x, y];
        } while (this.attacks.some(a => a[0] === x && a[1] === y));
        this.attacks.push(coordinate);
        return opponent.board.receiveAttack(coordinate);
    }

}

export { Player };