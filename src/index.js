import './styles.css';
import { BoardUI } from "./BoardUI.js";
import { GameController } from "./GameControler.js";

const game = new GameController();
const gameContainer = document.getElementById('game-container');

const playerBoard = new BoardUI('player-board');
const computerBoard = new BoardUI('computer-board');

gameContainer.appendChild(playerBoard.render());
gameContainer.appendChild(computerBoard.render());

computerBoard.setAttackHandler((coordinates) => {
    const result = game.playTurn(coordinates);
    computerBoard.updateCell(coordinates, result.hit);
    computerBoard.updateTurnIndicator(result.currentTurn);
    if (result.winner) computerBoard.displayGameOver(result.winner);
});
