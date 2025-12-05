import { Player } from "./Player.js";
export class GameControler {
    constructor() {
        this.player1 = new Player("human");
        this.player2 = new Player("computer");
        this.currentTurn = "human";
        this.winner = null;
    }
    playTurn(coordinates) {
        if (this.currentTurn === "human") {
            this.player1.attack(this.player2, coordinates);
            this.currentTurn = "computer";
        } else {
            this.player2.attack(this.player1, this.player2.randomAttack(this.player1));
            this.currentTurn = "human";
        }
    }
    isGameOver() {
        if (this.player1.board.allShipsSunk()) {
            this.winner = "computer";
            return true;
        }
        if (this.player2.board.allShipsSunk()) {
            this.winner = "human";
            return true;
        }
        return false;
    }
}