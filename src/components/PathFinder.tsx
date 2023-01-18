import React, { useEffect, useState } from 'react';
import '../styles/PathFinder.css';
import Node from './Node';
import { useCreateGrid } from '../utils/useGrid';

const PathFinder = () => {
	const { grid } = useCreateGrid();

	return (
		<div className="grid">
			{grid.map((con, i) => (
				<div className="row-ctn" key={i}>
					{con.map((node, i) => (
						<Node
							key={i}
							row={node.row}
							col={node.col}
							isStart={node.isStart}
							isFinish={node.isFinish}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default PathFinder;
