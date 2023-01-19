import { INode } from '../types';

export function animateAsVisited(row: number, col: number, turn: number) {
	setTimeout(() => {
		document.getElementById(`node-${row}-${col}`)?.classList.add('visited');
	}, 20 * turn);
}

export function animatePath(path: INode[], lastTurn: number) {
	for (let i = 0; i < path.length; i++) {
		setTimeout(() => {
			document
				.getElementById(`node-${path[i].row}-${path[i].col}`)
				?.classList.add('path');
		}, 20 * (i + lastTurn));
	}
}
