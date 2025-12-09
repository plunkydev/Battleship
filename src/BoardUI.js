export class BoardUI {
    constructor() {
        this.boardContainer = document.createElement("div");
        this.boardContainer.id = "board";
        document.body.appendChild(this.boardContainer);
    }

    render() {
        // Limpia el tablero si ya existe
        this.boardContainer.innerHTML = "";

        // Crea las 10x10 celdas
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement("div");
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.classList.add("cell");
                this.boardContainer.appendChild(cell);
            }
        }
        return this.boardContainer.outerHTML;
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

}
