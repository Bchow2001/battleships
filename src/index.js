import { shipFactory, gameBoardFactory, player } from "./factory";
import css from "./styles.css";

const generateGameBoard = (gameBoard) => {
	const g = document.querySelector(`.${gameBoard}`);
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const coordinates = `${[j, i]}`;
			const cell = document.createElement("div");
			cell.setAttribute("class", `cell ${gameBoard}-cell`);
			cell.setAttribute("data-key", coordinates);
			g.appendChild(cell);
		}
	}
};

generateGameBoard("g1");
generateGameBoard("g2");

const displayShips = (g, gDom) => {
	const gameBoardDom = document.querySelector(`.${gDom}`);
	g.ships.forEach((ship) => {
		ship.coordinates.forEach((coordinate) => {
			const shipCell = gameBoardDom.querySelector(
				`[data-key="${coordinate}"]`,
			);
			shipCell.classList.add("ship");
		});
	});
	g.missedAttacks.forEach((coordinate) => {
		const missedCell = gameBoardDom.querySelector(
			`[data-key="${coordinate}"]`,
		);
		missedCell.classList.add("miss");
	});
	g.hitAttacks.forEach((coordinate) => {
		const missedCell = gameBoardDom.querySelector(
			`[data-key="${coordinate}"]`,
		);
		missedCell.classList.add("hit");
	});
};

const eventListenersFactory = (g, gDom) => {
	const gameBoardDom = document.querySelector(`.${gDom}`);
	const cellNodeList = gameBoardDom.childNodes;
	const returnClicks = (e) => {
		const coordinateX = e.target.dataset.key.split(",")[0];
		const coordinateY = e.target.dataset.key.split(",")[1];
		g.receiveAttack(coordinateX, coordinateY);
		displayShips(g, gDom);
	};
	const addAttackListener = () => {
		cellNodeList.forEach((node) => {
			node.addEventListener("click", returnClicks);
		});
	};
	const removeAttackListener = () => {
		cellNodeList.forEach((node) => {
			node.removeEventListener("click", returnClicks);
		});
	};
	return { addAttackListener, removeAttackListener };
};

const gameLoop = () => {
	const g1 = gameBoardFactory();
	const g2 = gameBoardFactory();
	const p = player("bryan", "nimitz", g1, g2);
	const e1 = eventListenersFactory(g1, "g1");
	const e2 = eventListenersFactory(g2, "g2");
	g1.placeShip(0, 0, 4, "X");
	g2.placeShip(0, 0, 6, "X");
	displayShips(g1, "g1");
	displayShips(g2, "g2");
	// displayShips(g2, "g2");
	// while (!g1.isAllSunk && !g2.isAllSunk) {
	// 	if (p.currentBoard === g2)
	// }
};

gameLoop();
