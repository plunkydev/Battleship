// Import necessary modules and dependencies
import { Ship } from '../src/Ship';

describe('Ship Class', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    });
    test('instance.length should be 3', () => {
        expect(ship.length).toBe(3)
    });

    test('Ship should start with 0 hits', () => {
        expect(ship.hits).toBe(0)
    });

    test('hit should increse hits by 1', () => {
        ship.hit()
        expect(ship.hits).toBe(1)
    });

    test('isSunk should be true when length is equal hits', () => {
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.hits).toBe(ship.length)
        expect(ship.isSunk()).toBe(true)
    });
});