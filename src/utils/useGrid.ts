import React, { useEffect, useState } from 'react';
import { createNode } from './createNode';
import { INode, NodePos } from '../types';

export const useCreateGrid = (startNodePos: NodePos, finNodePos: NodePos) => {
	const [grid, setGrid] = useState<Array<Array<INode>>>([]);

	useEffect(() => {
		const tempGrid: INode[][] = [];

		for (let r = 0; r < 24; r++) {
			const rowContainer = [];
			for (let c = 0; c < 48; c++) {
				const node = createNode(r, c, startNodePos, finNodePos);
				rowContainer.push(node);
			}
			tempGrid.push(rowContainer);
		}
		setGrid(tempGrid);
	}, [startNodePos.row, startNodePos.col, finNodePos.row, finNodePos.col]);
	return { grid, setGrid };
};
