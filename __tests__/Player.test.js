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

        computer.randomAttack(opponent);
        computer.randomAttack(opponent);

        expect(computer.attacks).toHaveLength(2);

        const [firstAttack, secondAttack] = computer.attacks;

        expect(firstAttack).toHaveLength(2);
        expect(secondAttack).toHaveLength(2);
        expect(firstAttack).not.toEqual(secondAttack);
    });

})