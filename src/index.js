const shipFactory = (len) => {
	let hits = 0;
	const hit = () => {
		hits += 1;
		return hits;
	};
	const isSunk = () => hits >= len;
	return { len, hit, isSunk, hits };
};

export { shipFactory };
