import { Player } from "./Player.js";
export class GameController {
    constructor() {
        this.player1 = new Player("human");
        this.player2 = new Player("computer");
        this.currentTurn = "human";
        this.winner = null;
    }
    playTurn(coordinates) {
        let hit = false;

        if (this.currentTurn === "human") {
            hit = this.player1.attack(this.player2, coordinates);
            this.currentTurn = "computer";
        } else {
            const random = this.player2.randomAttack(this.player1);
            hit = this.player2.attack(this.player1, random);
            this.currentTurn = "human";
        }

        const gameOver = this.isGameOver();

        return {
            hit,
            currentTurn: this.currentTurn,
            winner: gameOver ? this.winner : null,
        };
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