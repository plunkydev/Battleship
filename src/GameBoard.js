class GameBoard {
    constructor() {
        this.ships = [];
        this.misses = [];
    }
    receiveAttack(coodinate) {
        if (this.misses.some((miss) => miss[0] === coodinate[0] && miss[1] === coodinate[1])) {
            return
        } 
        this.misses.push(coodinate);
    }
}
export { GameBoard }