import { GameControler } from '../src/GameControler';
import { Ship } from '../src/Ship';

describe('GameControler test', () => {
    let game;
    beforeEach(() => {
        game = new GameControler();
    });
    test("should initialize with two players and set human as current turn", () => {
        expect(game.player1.name).toBe("human");
        expect(game.player2.name).toBe("computer");
        expect(game.currentTurn).toBe("human");
    });

    test("should switch turns after a valid attack", () => {
        game.player1.attack = jest.fn(); // simulamos ataque del humano
        game.player2.attack = jest.fn(); // simulamos ataque del CPU

        game.playTurn([2, 3]); // humano ataca
        expect(game.currentTurn).toBe("computer");

        game.playTurn(); // CPU ataca
        expect(game.currentTurn).toBe("human");
    });

    test("should declare a winner when all opponent ships are sunk", () => {
        // Agregamos barcos a ambos jugadores
        const cruiser = { ship: new Ship(3), position: [1, 1], direction: "horizontal" };
        const destroyer = { ship: new Ship(2), position: [5, 5], direction: "vertical" };

        game.player1.board.placeShip(destroyer); // humano tiene barco
        game.player2.board.placeShip(cruiser);   // computadora tiene barco

        // hundimos todos los barcos del jugador 2
        game.playTurn([1, 1]);
        game.playTurn();
        game.playTurn([1, 2]);
        game.playTurn();
        game.playTurn([1, 3]);

        // Verificamos que el juego termina y el humano gana
        expect(game.isGameOver()).toBe(true);
        expect(game.winner).toBe("human");
    });


})