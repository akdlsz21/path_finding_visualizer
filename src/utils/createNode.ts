import {
	FINISH_NODE_COL,
	FINISH_NODE_ROW,
	START_NODE_COL,
	START_NODE_ROW,
} from '../constants';
import { INode } from '../types';

export const createNode = (row: number, col: number): INode => {
	return {
		row,
		col,
		isStart: row === START_NODE_ROW && col === START_NODE_COL,
		isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
		isVisited: false,
		distance: Infinity,
	};
};
