import { GameBoard } from "../src/GameBoard";
import { Ship } from "../src/Ship";
describe('Game Board Tests', () => {
    let board;
    let ship;
    beforeEach(() => {
        board = new GameBoard();
        ship = new Ship(3)
    });

    describe('Initial State', () => {
        test('board ships should start empty', () => {
            expect(board.ships).toEqual([])
        })
        test('board misses should start empty', () => {
            expect(board.misses).toEqual([])
        })
    });
    describe('Receive Attack', () => {
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
        test('should call ship.hit() when attack matches a ship position', () => {
            const Cruiser = {
                ship: ship,
                position: [1, 1],
                direction: 'horizontal'
            }
            board.placeShip(Cruiser)
            board.receiveAttack([1, 1])
            expect(Cruiser.ship.hits).toBe(1)
            expect(board.misses).not.toContainEqual([1, 1])
        });
        test('should not call hit() if ship is already sunk', () => {
            const Cruiser = {
                ship: ship,
                position: [1, 1],
                direction: 'horizontal'
            }
            board.placeShip(Cruiser)
            board.receiveAttack([1, 1])
            board.receiveAttack([1, 2])
            board.receiveAttack([1, 3])
            board.receiveAttack([1, 1])
            expect(Cruiser.ship.hits).toBe(3)
        })
        test('should report true when all ships are sunk', () => {
            const cruiser = { ship: new Ship(3), position: [1, 1], direction: 'horizontal' }
            board.placeShip(cruiser)
            board.receiveAttack([1, 1])
            board.receiveAttack([1, 2])
            board.receiveAttack([1, 3])
            expect(board.allShipsSunk()).toBe(true)
        })

    });
    describe('Place Ship', () => {
        test('should add a ship to the board', () => {
            const Cruiser = {
                ship: ship,
                position: [1, 1],
                direction: 'horizontal'
            }
            board.placeShip(Cruiser)
            expect(board.ships).toHaveLength(1)
        })
        test('should be an object with the ship, direction and position properties', () => {
            const Cruiser = {
                ship: ship,
                position: [1, 1],
                direction: 'horizontal'
            }
            board.placeShip(Cruiser)
            expect(board.ships[0]).toHaveProperty('ship')
            expect(board.ships[0]).toHaveProperty('position')
            expect(board.ships[0]).toHaveProperty('direction')
        })
        test('should calculate all ship coordinates based on direction and starting position', () => {
            const Cruiser = {
                ship: ship,
                position: [1, 1],
                direction: 'horizontal'
            }
            board.placeShip(Cruiser)
            expect(board.ships[0].position).toEqual([[1, 1], [1, 2], [1, 3]])
            expect(board.ships[0].ship.length).toBe(3)
            const Carrier = {
                ship: new Ship(5),
                position: [2, 2],
                direction: 'vertical'
            }
            board.placeShip(Carrier)
            expect(board.ships[1].position).toEqual([[2, 2], [3, 2], [4, 2], [5, 2], [6, 2]])
            expect(board.ships[1].ship.length).toBe(5)
        })
        test('should not allow overlapping ships', () => {
            const cruiser = { ship: new Ship(3), position: [1, 1], direction: 'horizontal' };
            const destroyer = { ship: new Ship(2), position: [1, 2], direction: 'vertical' };
            board.placeShip(cruiser);
            expect(board.placeShip(destroyer)).toBe(false);
        });
        test('should allow placing non-overlapping ships', () => {
            const cruiser = { ship: new Ship(3), position: [1, 1], direction: 'horizontal' };
            const destroyer = { ship: new Ship(2), position: [2, 2], direction: 'vertical' };
            board.placeShip(cruiser);
            expect(board.placeShip(destroyer)).toBe(true);
        });

    });
});