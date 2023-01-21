import { INode } from '../types';

export function animateAsVisited(
	row: number,
	col: number,
	turn: number,
	speed: number
) {
	setTimeout(() => {
		document.getElementById(`node-${row}-${col}`)?.classList.add('visited');
	}, speed * turn);
}

export function animatePath(path: INode[], lastTurn: number, speed: number) {
	for (let i = 0; i < path.length; i++) {
		setTimeout(() => {
			document
				.getElementById(`node-${path[i].row}-${path[i].col}`)
				?.classList.add('path');
		}, speed * (i + lastTurn));
	}
}
