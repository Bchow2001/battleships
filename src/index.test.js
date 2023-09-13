/* eslint-disable no-undef */
import { shipFactory, gameBoardFactory, player } from "./factory";

describe("shipFactory", () => {
	const destroyer = shipFactory(4);
	test("shipFactory len", () => {
		expect(destroyer.len).toBe(4);
	});

	test("shipFactory sunk", () => {
		destroyer.hit();
		destroyer.hit();
		destroyer.hit();
		destroyer.hit();
		expect(destroyer.isSunk).toBeTruthy();
	});

	test("shipFactory hits", () => {
		destroyer.hit();
		destroyer.hit();
		expect(destroyer.hits).toBe(6);
	});
});

describe("gameBoard", () => {
	test("gameBoard coordinates X direction", () => {
		expect(
			gameBoardFactory().placeShip(2, 0, 2, "X")[0].coordinates,
		).toEqual(["2,0", "3,0"]);
	});

	test("gameBoard coordinates X direction fail", () => {
		expect(gameBoardFactory().placeShip(6, 0, 5, "X")[0]).toBeUndefined();
	});

	test("gameBoard coordinates Y direction", () => {
		expect(
			gameBoardFactory().placeShip(0, 3, 4, "Y")[0].coordinates,
		).toEqual(["0,3", "0,2", "0,1", "0,0"]);
	});

	test("gameBoard coordinates Y direction fail", () => {
		expect(gameBoardFactory().placeShip(0, 3, 5, "Y")[0]).toBeUndefined();
	});

	test("gameBoard place duplicate ships X", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 1, 2, "Y");
		g.placeShip(0, 0, 2, "X");
		expect(g.ships.length).toBe(1);
	});

	test("gameBoard place duplicate ships Y", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 5, 5, "Y");
		g.placeShip(0, 1, 2, "Y");
		g.placeShip(0, 6, 4, "Y");
		expect(g.ships.length).toBe(1);
	});

	test("gameBoard receive attack", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 0, 2, "X");
		g.receiveAttack(0, 0);
		expect(g.ships[0].hits).toBe(1);
	});

	test("gameBoard receive attack 2", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 0, 2, "X");
		g.receiveAttack(0, 0);
		g.receiveAttack(1, 0);
		expect(g.ships[0].isSunk()).toBeTruthy();
	});

	test("gameBoard receive attack X", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 0, 4, "X");
		g.placeShip(3, 3, 5, "X");
		g.receiveAttack(3, 3);
		g.receiveAttack(4, 3);
		g.receiveAttack(5, 3);
		g.receiveAttack(6, 3);
		g.receiveAttack(7, 3);
		expect(g.ships[1].isSunk()).toBeTruthy();
	});

	test("gameBoard receive attack Y", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 3, 2, "Y");
		g.receiveAttack(0, 3);
		g.receiveAttack(0, 2);
		expect(g.ships[0].isSunk()).toBeTruthy();
	});

	test("gameBoard receive attack miss", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 2, 2, "Y");
		g.receiveAttack(0, 3);
		g.receiveAttack(0, 3);
		expect(g.missedAttacks.length).toBe(1);
	});

	test("gameBoard isAllSunk False", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 0, 1, "X");
		g.placeShip(9, 9, 1, "Y");
		expect(g.isAllSunk()).toBeFalsy();
	});

	test("gameBoard isAllSunk True", () => {
		const g = gameBoardFactory();
		g.placeShip(0, 0, 1, "X");
		g.placeShip(9, 9, 2, "Y");
		g.receiveAttack(0, 0);
		g.receiveAttack(9, 9);
		g.receiveAttack(9, 8);
		expect(g.isAllSunk()).toBeTruthy();
	});
});

describe("Player", () => {
	test("switchTurn", () => {
		const p = player("bryan", "Nimitz");
		p.switchTurns();
		expect(p.currentTurn).toEqual("Nimitz");
	});

	test("switch gameBoard", () => {
		const g1 = gameBoardFactory();
		const g2 = gameBoardFactory();
		const p = player("bryan", "Nimitz", g1, g2);
		g2.placeShip(1, 2, 1, "X");
		p.switchTurns();
	});

	test("randomAttack", () => {
		const g1 = gameBoardFactory();
		const g2 = gameBoardFactory();
		const p = player("bryan", "Nimitz", g1, g2);
		const missedTest = () => {
			let missed = [];
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					missed.push(`${[i, j]}`);
				}
			}
			missed = missed.splice(1, 100);
			return missed;
		};
		const miss = missedTest();
		g2.missedAttacks = miss;
		// p.switchTurns();
		expect(p.randomAttack()).toBe("0,0");
	});
});
