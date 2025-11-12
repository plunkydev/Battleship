import { GameBoard } from "../src/GameBoard";

describe('Game Board Tests', () => {
    let board;

    beforeEach(() => {
        board = new GameBoard();
    });

    test('board ships should start empty', () => {
        expect(board.ships).toEqual([])
    })
    test('board misses should start empty', () => {
        expect(board.misses).toEqual([])
    })
    test('should record missed attacks in the misses array', () => {
        board.receiveAttack([2, 3])
        const result = [2, 3]
        expect(board.misses).toContainEqual(result)
    })
    test('should not record the same missed coordinate twice', () => {
        board.receiveAttack([2, 3])
        board.receiveAttack([2, 3])
        const result = [[2, 3]]
        expect(board.misses).toEqual(result)
    })
});