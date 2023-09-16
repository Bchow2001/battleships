const shipFactory = (len) => {
	const hits = 0;
	return {
		len,
		hit() {
			this.hits += 1;
		},
		isSunk() {
			return this.hits >= len;
		},
		hits,
	};
};

const gameBoardFactory = () => {
	const ships = [];
	const missedAttacks = [];
	const hitAttacks = [];

	const placeShip = (x, y, len, orientation) => {
		const tempShip = shipFactory(len);
		tempShip.coordinates = [];
		if (orientation === "X" && x > 10 - len) {
			return false;
		}
		if (orientation === "Y" && y < len - 1) {
			return false;
		}
		if (orientation === "X") {
			for (let i = 0; i < len; i += 1) {
				tempShip.coordinates.push(`${[x + i, y]}`);
			}
			const contains = ships.some((ship) =>
				ship.coordinates.some((coordinate) =>
					tempShip.coordinates.includes(coordinate),
				),
			);
			if (contains) {
				return ships;
			}
			ships.push(tempShip);
			return ships;
		}
		if (orientation === "Y") {
			for (let i = 0; i < len; i += 1) {
				tempShip.coordinates.push(`${[x, y - i]}`);
			}
			const contains = ships.some((ship) =>
				ship.coordinates.some((coordinate) =>
					tempShip.coordinates.includes(coordinate),
				),
			);
			if (contains) {
				return ships;
			}
			ships.push(tempShip);
			return ships;
		}
		return ships;
	};

	const receiveAttack = (x, y) => {
		const coord = `${[x, y]}`;
		let hit = false;
		if (missedAttacks.includes(coord)) {
			return false;
		}
		if (hitAttacks.includes(coord)) {
			return false;
		}
		ships.forEach((item) => {
			if (item.coordinates.includes(coord)) {
				item.hit();
				hitAttacks.push(coord);
				hit = true;
			}
		});
		if (hit === false) {
			missedAttacks.push(coord);
		}
		return true;
	};

	const isAllSunk = () => {
		const sunk = ships.every((ship) => ship.isSunk() === true);
		return !!sunk;
	};
	return {
		placeShip,
		receiveAttack,
		ships,
		missedAttacks,
		hitAttacks,
		isAllSunk,
	};
};

const player = (name1, name2, gameBoard1, gameBoard2) => {
	const currentTurn = name1;
	const currentGameBoard = gameBoard2;

	const randomAttack = () => {
		let randomCoordsX = Math.floor(Math.random() * 10);
		let randomCoordsY = Math.floor(Math.random() * 10);
		let randomCoords = `${[randomCoordsX, randomCoordsY]}`;
		while (currentGameBoard.missedAttacks.includes(randomCoords)) {
			randomCoordsX = Math.floor(Math.random() * 10);
			randomCoordsY = Math.floor(Math.random() * 10);
			randomCoords = `${[randomCoordsX, randomCoordsY]}`;
		}
		currentGameBoard.receiveAttack(randomCoords.split(",").map(Number));
		return randomCoords;
	};

	return {
		currentTurn,
		switchTurns() {
			this.currentTurn = this.currentTurn === name1 ? name2 : name1;
			this.currentGameBoard =
				this.currentGameBoard === gameBoard2 ? gameBoard1 : gameBoard2;
		},
		randomAttack,
		currentGameBoard,
	};
};

export { shipFactory, gameBoardFactory, player };
