// __tests__/SetupController.test.js
import { SetupController } from "../src/SetupController.js";
import { GameBoard } from "../src/GameBoard.js";
import { Ship } from "../src/Ship.js";

describe("SetupController", () => {
    let setup;

    beforeEach(() => {
        setup = new SetupController();
    });

    /* 
    Escenario 1 — Inicialización
    Dado que el juego inicia,
    cuando se crea una instancia de SetupController,
    entonces debe tener tableros vacíos y el estado 'placing'
    */
    test("should initialize with empty player and computer boards and state 'placing'", () => {
        expect(setup.playerBoard).toBeInstanceOf(GameBoard);
        expect(setup.computerBoard).toBeInstanceOf(GameBoard);
        expect(setup.playerBoard.ships).toHaveLength(0);
        expect(setup.computerBoard.ships).toHaveLength(0);
        expect(setup.state).toBe("placing");
    });
    /* Escenario 2 — Colocación de barcos
    Dado que el jugador está en la fase de colocación,
    cuando llama a setup.placeShip() con una posición y un barco,
    entonces el barco debe colocarse correctamente en el tablero
    y el método debe devolver true si la colocación es válida.
*/
    test("should place a ship on the player's board successfully", () => {
        const ship = new Ship(3);
        const result = setup.placeShip({
            ship,
            position: [0, 0],
            direction: "horizontal"
        });

        expect(result).toBe(true);
        expect(setup.playerBoard.ships).toHaveLength(1);
    });
    /* Escenario 3 — Colocación inválida
    Dado que un barco se intenta colocar en una posición inválida o que colisiona,
    cuando se llama a setup.placeShip(),
    entonces debe devolver false y no agregar el barco al tablero.
    */
    test("should reject invalid or overlapping ship placement", () => {
        const ship1 = new Ship(3);
        const ship2 = new Ship(3);

        // Primer barco colocado correctamente
        setup.placeShip({ ship: ship1, position: [0, 0], direction: "horizontal" });

        // Intentar colocar otro encima
        const result = setup.placeShip({ ship: ship2, position: [0, 1], direction: "vertical" });

        expect(result).toBe(false);
        expect(setup.playerBoard.ships).toHaveLength(1);
    });
    /* Escenario 4 — Colocación automática de la computadora
    Dado que la computadora debe tener su flota lista,
    cuando se llama a setup.autoPlaceComputerShips(),
    entonces debe colocar todos los barcos y el estado cambia a "ready".
    */
    test("should automatically place all computer and player ships", () => {
        const fleet = [5, 4, 3, 3, 2]; // longitudes típicas de barcos Battleship
        setup.autoPlaceComputerShips(fleet, "computer");
        setup.autoPlaceComputerShips(fleet, "player");

        expect(setup.computerBoard.ships).toHaveLength(5);
        expect(setup.playerBoard.ships).toHaveLength(5);
    });

    /* Escenario 5 — Transición a la fase de juego
    Dado que el jugador y la computadora ya colocaron toda su flota,
    cuando ambos tableros están completos,
    entonces el estado debe cambiar a "ready" y retornar true.
    */
    test("should set state to 'ready' only when both player and computer have full fleets", () => {
        const fleet = [5, 4, 3, 3, 2]; // flota completa estándar

        // La computadora coloca automáticamente sus barcos
        setup.autoPlaceComputerShips(fleet, "computer");

        // El jugador coloca los suyos 
        setup.autoPlaceComputerShips(fleet, "player");

        const result = setup.checkIfReady();

        expect(result).toBe(true);
        expect(setup.state).toBe("ready");
    });
});

