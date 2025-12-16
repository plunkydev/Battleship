import './styles.css';
import { BoardUI } from "./BoardUI.js";
const gameContainer = document.getElementById('game-container');
const playerBoard = new BoardUI('player-board');
const computerBoard = new BoardUI('computer-board');

gameContainer.appendChild(playerBoard.render());
gameContainer.appendChild(computerBoard.render());