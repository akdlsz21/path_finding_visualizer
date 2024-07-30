import { INode, NodePos } from '../types';

export function animateAsVisited(
	row: number,
	col: number,
	turn: number,
	speed: number,
	startNodePos: NodePos,
	finishNodePos: NodePos
) {
	setTimeout(() => {
		const { row: sRow, col: sCol } = startNodePos;
		const { row: fRow, col: fCol } = finishNodePos;
		if (row === sRow && col === sCol) return;
		if (row === fRow && col === fCol) return;
		// debugger;
		console.log(turn);
		debugger;
		document.getElementById(`node-${row}-${col}`)?.classList.add('visited');
		console.log(speed * turn);
	}, speed * turn);
}

export function animatePath(
	path: INode[],
	lastTurn: number,
	speed: number,
	startNodePos: NodePos,
	finishNodePos: NodePos
) {
	for (let i = 0; i < path.length; i++) {
		setTimeout(() => {
			const { row, col } = path[i];
			const { row: sRow, col: sCol } = startNodePos;
			const { row: fRow, col: fCol } = finishNodePos;
			if (row === sRow && col === sCol) return;
			if (row === fRow && col === fCol) return;
			document
				.getElementById(`node-${path[i].row}-${path[i].col}`)
				?.classList.add('path');
		}, speed * (i + lastTurn) + 800);
	}
}
