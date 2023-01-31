import { INode } from '../../types';

export function randomMaze(start: INode, fin: INode, grid: INode[][]) {
	const walls = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			const node = grid[i][j];
			if (node.isStart || node.isFinish) continue;
			if (Math.random() < 0.35) {
				node.isWall = true;
				walls.push(node);
			}
		}
	}

	return walls;
}
