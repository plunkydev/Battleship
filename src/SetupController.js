
import { GameBoard } from "./GameBoard.js";
import { Ship } from "./Ship.js";

export class SetupController {
    /* 
    Escenario 1 — Inicialización
    Dado que el juego inicia,
    cuando se crea una instancia de SetupController,
    entonces debe tener tableros vacíos y el estado 'placing'
    */
    constructor() {
        this.playerBoard = new GameBoard();
        this.computerBoard = new GameBoard();
        this.state = "placing";
    }
    /* Escenario 2 — Colocación de barcos
    Dado que el jugador está en la fase de colocación,
    cuando llama a setup.placeShip() con una posición y un barco,
    entonces el barco debe colocarse correctamente en el tablero
    y el método debe devolver true si la colocación es válida.
*/
    placeShip(place) {
        return this.playerBoard.placeShip(place);
    }
    /* Escenario 4 — Colocación automática de la computadora
    Dado que la computadora debe tener su flota lista,
    cuando se llama a setup.autoPlaceComputerShips(),
    entonces debe colocar todos los barcos y el estado cambia a "ready".
    */
    autoPlaceComputerShips(fleet, boardType = "computer") {
        fleet.forEach((length) => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 1000) {
                attempts++;
                const ship = new Ship(length);
                const position = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
                if (boardType === "player") {
                    placed = this.playerBoard.placeShip({ ship, position, direction });
                } else {
                    placed = this.computerBoard.placeShip({ ship, position, direction });
                }
            }
        });
    }
    checkIfReady() {
        if (this.computerBoard.ships.length == 5 && this.playerBoard.ships.length == 5) {
            this.state = "ready";
            return true;
        } else {
            return false;
        }
    }
}
