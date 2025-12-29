import './styles.css';
import { BoardUI } from "./BoardUI.js";
import { GameController } from "./GameControler.js";
import { SetupController } from "./SetupController.js";

const btnStart = document.getElementById('start-game-btn');
const restartButton = document.getElementById("restart-button");
const gameContainer = document.getElementById('game-container');

restartButton.style.display = "block";
restartButton.addEventListener("click", () => window.location.reload());

const setup = new SetupController();
const playerBoardUI = new BoardUI('player-board');
const computerBoardUI = new BoardUI('computer-board');

gameContainer.appendChild(playerBoardUI.render());
gameContainer.appendChild(computerBoardUI.render());

btnStart.addEventListener('click', () => {
    const fleet = [5, 4, 3, 3, 2];
    setup.autoPlaceComputerShips(fleet, "computer");
    setup.autoPlaceComputerShips(fleet, "player");

    if (!setup.checkIfReady()) return;

    const game = new GameController(setup.playerBoard, setup.computerBoard);
    playerBoardUI.displayShips(setup.playerBoard);

    computerBoardUI.setAttackHandler((coordinates) => {
        if (setup.state !== "ready" || game.currentTurn !== "human") return;

        const result = game.playTurn(coordinates);
        computerBoardUI.updateCell(coordinates, result.hit);
        computerBoardUI.updateTurnIndicator(result.currentTurn);

        computerBoardUI.boardContainer.style.pointerEvents = "none";
        computerBoardUI.boardContainer.classList.add("disabled-board");

        if (result.winner) {
            computerBoardUI.displayGameOver(result.winner);
            return;
        }

        setTimeout(() => {
            const compResult = game.playTurn();
            playerBoardUI.updateCell(compResult.coordinates, compResult.hit);
            computerBoardUI.updateTurnIndicator(compResult.currentTurn);

            if (!compResult.winner) {
                computerBoardUI.boardContainer.style.pointerEvents = "auto";
                computerBoardUI.boardContainer.classList.remove("disabled-board");
            } else {
                computerBoardUI.displayGameOver(compResult.winner);
            }
        }, 1000);
    });

    const indicator = document.getElementById('indicator');
    indicator.textContent = "Preparando tableros...";
    setTimeout(() => (indicator.textContent = "¡Tu turno!"), 1000);
});
