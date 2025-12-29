import './styles.css';
import { BoardUI } from "./BoardUI.js";
import { GameController } from "./GameControler.js";
import { SetupController } from "./SetupController.js";

const btnStart = document.getElementById('start-game-btn');
let restartButton = document.getElementById("restart-button");
restartButton.style.display = "block";
        restartButton.addEventListener("click", () => {
            if (typeof window !== "undefined" && window.location) {
                window.location.reload();
            }
        });
// Instancias principales
const setup = new SetupController();
const gameContainer = document.getElementById('game-container');

// Crear tableros visuales
const playerBoardUI = new BoardUI('player-board');
const computerBoardUI = new BoardUI('computer-board');
gameContainer.appendChild(playerBoardUI.render());
gameContainer.appendChild(computerBoardUI.render());

btnStart.addEventListener('click', () => {
    // Instanciar el controlador principal del juego
    const game = new GameController(setup.playerBoard, setup.computerBoard);
    
    // Aquí podrías agregar lógica para iniciar el juego
    const fleet = [5, 4, 3, 3, 2];
    setup.autoPlaceComputerShips(fleet, "computer");
    setup.autoPlaceComputerShips(fleet, "player");
    // Verificar si ambas flotas están listas
    if (setup.checkIfReady()) {
        playerBoardUI.displayShips(setup.playerBoard);
    }
    
    // Habilitar interacción del jugador (ataques)
    computerBoardUI.setAttackHandler((coordinates) => {
        if (setup.state !== "ready") return; // seguridad
    
        const result = game.playTurn(coordinates);
        computerBoardUI.updateCell(coordinates, result.hit);
        computerBoardUI.updateTurnIndicator(result.currentTurn);
    
        if (result.winner) {
            computerBoardUI.displayGameOver(result.winner);
            return;
        } 
        // Ataque automático de la computadora
        setTimeout(() => {
            const compResult = game.playTurn();
            playerBoardUI.updateCell(compResult.coordinates, compResult.hit);
            computerBoardUI.updateTurnIndicator(compResult.currentTurn);
    
            if (compResult.winner) computerBoardUI.displayGameOver(compResult.winner);
        }, 800);
    
    });
    
    // Mostrar mensaje visual al inicio
    const indicator = document.getElementById('indicator');
    indicator.textContent = "Preparando tableros...";
    setTimeout(() => {
        indicator.textContent = "¡Tu turno!";
    }, 1000);
});

