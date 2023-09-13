import { shipFactory, gameBoardFactory, player } from "./factory";
import css from "./styles.css";

const generateGameBoard = (gameBoard) => {
	const g = document.querySelector(`.${gameBoard}`);
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const coordinates = `${[j, i]}`;
			const cell = document.createElement("div");
			cell.setAttribute("class", `cell ${gameBoard}`);
			cell.setAttribute("data-key", coordinates);
			g.appendChild(cell);
		}
	}
};

const displayShips = (g) => {
	g.ships.forEach((ship) => {
		ship.coordinates.forEach((coordinate) => {
			const shipCell = document.querySelector(
				`[data-key="${coordinate}"]`,
			);
			shipCell.classList.toggle("ship");
		});
	});
	g.missedAttacks.forEach((coordinate) => {
		const missedCell = document.querySelector(`[data-key="${coordinate}"]`);
		missedCell.classList.toggle("miss");
	});
	g.hitAttacks.forEach((coordinate) => {
		const missedCell = document.querySelector(`[data-key="${coordinate}"]`);
		missedCell.classList.toggle("hit");
	});
};

generateGameBoard("gameboard1");
generateGameBoard("gameboard2");

const gameLoop = () => {
	const g1 = gameBoardFactory();
	const g2 = gameBoardFactory();
	const p = player("bryan", "nimitz", g1, g2);
	g1.placeShip(0, 0, 5, "X");
	g1.placeShip(0, 6, 4, "Y");
	g1.receiveAttack(9, 9);
	g1.receiveAttack(0, 0);
	g1.receiveAttack(0, 1);
	g1.receiveAttack();
	console.log(g1.missedAttacks);
	displayShips(g1);
};

gameLoop();
