import React, { useEffect, useState } from 'react';
import './PathFinder.css';

const PathFinder = () => {
	const [grid, setGrid] = useState<Array<Array<number>>>([]);

	useEffect(() => {
		const tempGrid: any[][] = [];

		for (let r = 0; r < 15; r++) {
			const rowContainer = [];
			for (let c = 0; c < 30; c++) {
				rowContainer.push(0);
			}
			tempGrid.push(rowContainer);
		}
		setGrid(tempGrid);
	}, []);

	return (
		<div className="grid">
			{grid.map((con, i) => (
				<div key={i}>
					{con.map((node, i) => (
						<div key={i} className="node">
							{node}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default PathFinder;
