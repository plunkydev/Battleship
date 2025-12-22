export class BoardUI {
    constructor(id) {
        this.boardContainer = document.createElement("div");
        this.boardContainer.id = id;
        this.boardContainer.classList.add("board");
    }

    render() {
        // Limpiar tablero si ya existe
        this.boardContainer.innerHTML = "";

        // Crear título dinámico
        const label = document.createElement('h3');
        label.textContent = this.boardContainer.id === 'player-board'
            ? 'Tu tablero'
            : 'Tablero enemigo';

        // Crear las 10x10 celdas
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement("div");
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.classList.add("cell");
                this.boardContainer.appendChild(cell);
            }
        }

        // Envolver el tablero con su etiqueta
        const wrapper = document.createElement('div');
        wrapper.classList.add('board-wrapper');
        wrapper.appendChild(label);
        wrapper.appendChild(this.boardContainer);

        return wrapper;
    }

    setAttackHandler(callback) {
        this.attackHandler = callback;
        const cells = this.boardContainer.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const x = Number(cell.dataset.x);
                const y = Number(cell.dataset.y);
                this.attackHandler([x, y]);
            });
        });
    }
    updateCell([x, y], hit) {
        const cell = this.boardContainer.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
        if (!cell) return; // seguridad
        if (hit) {
            cell.classList.add('hit');
            cell.classList.remove('miss');
        } else {
            cell.classList.add('miss');
            cell.classList.remove('hit');
        }
    }

    updateTurnIndicator(currentTurn) {
        let indicator = document.getElementById("indicator");

        if (!indicator) {
            indicator = document.createElement("div");
            indicator.id = "indicator";
            document.body.appendChild(indicator);
        }

        if (currentTurn === "human") {
            indicator.textContent = "Turno del jugador";
        } else {
            indicator.textContent = "Turno de la computadora";
        }
    }

    displayGameOver(winner) {
        let gameOverMessage = document.getElementById("indicator");
        if (!gameOverMessage) {
            gameOverMessage = document.createElement("div");
            gameOverMessage.id = "indicator";
            document.body.appendChild(gameOverMessage);
        }
        let restartButton = document.getElementById("restart-button");
        if (!restartButton) {
            restartButton = document.createElement("button");
            restartButton.id = "restart-button";
            restartButton.textContent = "Reiniciar";
            document.body.appendChild(restartButton);
        }
        gameOverMessage.textContent = "";
        gameOverMessage.textContent = `¡${winner} wins!`;
        restartButton.style.display = "block";
        restartButton.addEventListener("click", () => {
            if (typeof window !== "undefined" && window.location) {
                window.location.reload();
            }
        });
    }
}
