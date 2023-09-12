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

	const placeShip = (x, y, len, orientation) => {
		const tempShip = shipFactory(len);
		tempShip.coordinates = [];
		if (orientation === "X" && x > 10 - len) {
			return ships;
		}
		if (orientation === "Y" && y < len - 1) {
			return ships;
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
		if (missedAttacks.includes(coord)) {
			return false;
		}
		ships.forEach((item) => {
			if (item.coordinates.includes(coord)) {
				item.hit();
			} else {
				missedAttacks.push(coord);
			}
		});
	};

	const isAllSunk = () => {
		const sunk = ships.every((ship) => ship.isSunk() === true);
		return !!sunk;
	};
	return { placeShip, receiveAttack, ships, missedAttacks, isAllSunk };
};

export { shipFactory, gameBoardFactory };
