/* eslint-disable no-undef */
import { shipFactory } from ".";

const destroyer = shipFactory(4);

test("shipFactory len", () => {
	expect(destroyer.len).toBe(4);
});

test("shipFactory hit", () => {
	destroyer.hit();
	destroyer.hit();
	destroyer.hit();
	destroyer.hit();
	expect(destroyer.isSunk).toBeTruthy();
});

test("gameBoard coordinates");
