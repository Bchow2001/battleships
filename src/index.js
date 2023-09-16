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

const displayShips = (g, gDom, show) => {
	const gameBoardDom = document.querySelector(`.${gDom}`);
	g.ships.forEach((ship) => {
		if (show === true) {
			ship.coordinates.forEach((coordinate) => {
				const shipCell = gameBoardDom.querySelector(
					`[data-key="${coordinate}"]`,
				);
				shipCell.classList.add("ship");
			});
		}
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

const hideGameBoard = (gDom) => {
	const gameBoardDom = document.querySelector(`.${gDom}`);
	gameBoardDom.classList.toggle("hidden");
};

const eventListeners = (g1, gDom1, g2, gDom2, p) => {
	const gameBoardDom1 = document.querySelector(`.${gDom1}`);
	const cellNodeList1 = gameBoardDom1.childNodes;
	const gameBoardDom2 = document.querySelector(`.${gDom2}`);
	const cellNodeList2 = gameBoardDom2.childNodes;
	const passDom = document.querySelector(".pass");
	const returnClicks = (e) => {
		const coordinateX = e.target.dataset.key.split(",")[0];
		const coordinateY = e.target.dataset.key.split(",")[1];
		p.currentGameBoard.receiveAttack(coordinateX, coordinateY);
		if (g1.isAllSunk() || g2.isAllSunk()) {
			alert(`${p.currentTurn} has Won`);
			gameBoardDom1.classList.remove("hidden");
			gameBoardDom2.classList.remove("hidden");
			displayShips(g1, gDom1, true);
			displayShips(g2, gDom2, true);
			return;
		}
		displayShips(g1, gDom1);
		displayShips(g2, gDom2);
		if (p.currentGameBoard === g1) {
			setTimeout(() => {
				hideGameBoard(gDom1);
				passDom.classList.toggle("hidden");
			}, 500);
			setTimeout(() => {
				passDom.classList.toggle("hidden");
				hideGameBoard(gDom2);
			}, 1500);
		}
		if (p.currentGameBoard === g2) {
			setTimeout(() => {
				hideGameBoard(gDom2);
				passDom.classList.toggle("hidden");
			}, 500);
			setTimeout(() => {
				passDom.classList.toggle("hidden");
				hideGameBoard(gDom1);
			}, 1500);
		}
		p.switchTurns();
	};
	cellNodeList1.forEach((node) => {
		node.addEventListener("click", returnClicks, { once: true });
	});
	cellNodeList2.forEach((node) => {
		node.addEventListener("click", returnClicks, { once: true });
	});
};

const gameLoop = () => {
	const g1 = gameBoardFactory();
	const g2 = gameBoardFactory();
	const p = player("bryan", "nimitz", g1, g2);
	eventListeners(g1, "g1", g2, "g2", p);
	g1.placeShip(0, 0, 4, "X");
	g2.placeShip(0, 0, 6, "X");
	displayShips(g1, "g1");
	displayShips(g2, "g2");
	hideGameBoard("g1");
};

gameLoop();
