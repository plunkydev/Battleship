// Import necessary modules and dependencies
import { Ship } from '../src/Ship';

describe('Ship Class', () => {
    test('instance.length should be 2', () => {
        let destroyer = new Ship(2)
        expect(destroyer.length).toBe(2)
    });

    test('Ship should start with 0 hits', () => {
        let carrier = new Ship(3) 
        expect(carrier.hits).toBe(0)
    });

    test('hit should increse hits by 1', () => {
        let cruiser = new Ship(3)
        cruiser.hit()
        expect(cruiser.hits).toBe(1)
    });

    test('isSunk should be true when length is equal hits', () => {
        let destroyer = new Ship(2)
        destroyer.hit()
        destroyer.hit()
        expect(destroyer.hits).toBe(destroyer.length)
        expect(destroyer.isSunk()).toBe(true)
    });
});