import { INode, NodePos } from '../types';

export const createNode = (
	row: number,
	col: number,
	startNodePos: NodePos,
	finNodePos: NodePos
): INode => {
	return {
		row,
		col,
		isStart: row === startNodePos.row && col === startNodePos.col,
		isFinish: row === finNodePos.row && col === finNodePos.col,
		isVisited: false,
		isWall: false,
		distance: Infinity,
		prevNode: null,
	};
};
