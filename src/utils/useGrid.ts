import React, { useEffect, useState } from 'react';
import { createNode } from './createNode';
import { INode } from '../types';

export const useCreateGrid = () => {
	const [grid, setGrid] = useState<Array<Array<INode>>>([]);

	useEffect(() => {
		const tempGrid: INode[][] = [];

		for (let r = 0; r < 15; r++) {
			const rowContainer = [];
			for (let c = 0; c < 30; c++) {
				const node = createNode(r, c);
				rowContainer.push(node);
			}
			tempGrid.push(rowContainer);
		}
		setGrid(tempGrid);
	}, []);
	return { grid };
};
