import { Player } from "../src/Player.js"

describe("Player test", () => {
    let player, opponet;

    beforeEach(() => {
        player = new Player("Alice");
        opponet = new Player("Bob");
    })

    test('should reccord attacks on opponent`s game board', () => {
        player.attack(opponet, [2, 3]);
        expect(player.attacks).toContainEqual([2, 3]);
        expect(opponet.board.misses).toContainEqual([2, 3]);
    })

    test('computer should generate random valid attacks without repeating', () => {
        const computer = new Player("computer");
        const opponent = new Player("human");

        const firstAttack = computer.randomAttack(opponent);
        const secondAttack = computer.randomAttack(opponent);

        expect(firstAttack).toHaveLength(2);
        expect(secondAttack).toHaveLength(2);
        expect(firstAttack).not.toEqual(secondAttack);
        expect(computer.attacks).toContainEqual(firstAttack);
        expect(computer.attacks).toContainEqual(secondAttack);
    });
})