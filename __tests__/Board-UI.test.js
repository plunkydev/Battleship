//---------------------------BDD-------------------------
//Módulo: Tablero visual (Board UI)

import { BoardUI } from '../src/BoardUI.js';

describe('BoardUI test', () => {
    let board;
    beforeEach(() => {
        document.body.innerHTML = ''; // limpia el DOM antes de cada test
        board = new BoardUI('enemy-board');
        document.body.appendChild(board.render()); // monta el tablero en el DOMF
    });
    /* 
    Escenario 1 — Renderizado del tablero
    Dado que el juego inicia
    Cuando se carga la interfaz de usuario
    Entonces debería renderizar un tablero con 10×10 celdas visibles,
    cada una identificada por coordenadas únicas (data-x, data-y)
     */
    test("should render a 10x10 board with unique cell coordinates", () => {
        const rendered = board.render();
        expect(rendered.querySelectorAll('.cell')).toHaveLength(100);
    });

    /* Escenario 2 — Interacción: clic en una celda
        Dado que el jugador ve el tablero del oponente,
        cuando hace clic en una celda,
        entonces el tablero debería marcar ese ataque visualmente (por ejemplo, con una clase "hit" o "miss"),
        y registrar la coordenada en el GameController */
    test("should mark cell on click and register attack", () => {
        const mockRegisterAttack = jest.fn();
        board.setAttackHandler(mockRegisterAttack);
        const cell = document.querySelector('div[data-x="0"][data-y="0"]');
        cell.click();
        expect(mockRegisterAttack).toHaveBeenCalledWith([0, 0]);
    });
    /* Escenario 3 — Estado visual tras un ataque

        Dado que una celda fue atacada,
        cuando la celda representa un impacto en un barco,
        entonces debería cambiar a un color (por ejemplo, rojo) indicando “impacto”,
        y cuando no hay barco,
        entonces debería mostrar un color diferente (por ejemplo, gris) indicando “fallo”. */
    test("should update cell color based on attack result", () => {
        board.updateCell([0, 0], true);
        expect(document.querySelector('div[data-x="0"][data-y="0"]').classList).toContain('hit');
        board.updateCell([0, 0], false);
        expect(document.querySelector('div[data-x="0"][data-y="0"]').classList).toContain('miss');
    });
    /* Escenario 4 — Indicador de turno

    Dado que el juego está en progreso,
    cuando termina un ataque,
    entonces el tablero debería mostrar visualmente de quién es el turno actual
    (por ejemplo, un texto “Turno del jugador” o “Turno de la computadora”). */
    test("should display current turn indicator", () => {
        board.updateTurnIndicator("human");
        expect(document.getElementById('turn-indicator').textContent).toBe("Turno del jugador");
        board.updateTurnIndicator("computer");
        expect(document.getElementById('turn-indicator').textContent).toBe("Turno de la computadora");
    });
    /* Escenario 5 — Fin del juego

    Dado que todos los barcos de un jugador están hundidos,
    cuando el juego termina,
    entonces debería mostrarse un mensaje visual indicando el ganador
    (y opcionalmente, un botón para reiniciar). */
    test("should display game over message with winner", () => {
        board.displayGameOver("human");
        expect(document.getElementById('game-over-message').textContent).toBe("¡human wins!");
        board.displayGameOver("computer");
        expect(document.getElementById('game-over-message').textContent).toBe("¡computer wins!");
    });
});
