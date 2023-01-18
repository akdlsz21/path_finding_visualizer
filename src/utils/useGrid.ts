import React, { useEffect, useState } from 'react';

interface INode {
	row: number;
	col: number;
	isStart: boolean;
	isFinish: boolean;
}

export const useCreateGrid = () => {
	const [grid, setGrid] = useState<Array<Array<INode>>>([]);

	useEffect(() => {
		const tempGrid: INode[][] = [];

		for (let r = 0; r < 15; r++) {
			const rowContainer = [];
			for (let c = 0; c < 30; c++) {
				const node = {
					row: r,
					col: c,
					isStart: r === 10 && c === 5,
					isFinish: r === 10 && c === 25,
					isVisited: false,
				};
				rowContainer.push(node);
			}
			tempGrid.push(rowContainer);
		}
		setGrid(tempGrid);
	}, []);
	return { grid };
};
