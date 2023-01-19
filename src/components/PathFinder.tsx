import React, { useEffect, useState } from 'react';
import '../styles/PathFinder.css';
import '../styles/etc.css';
import Node from './Node';
import { useCreateGrid } from '../utils/useGrid';
import NavBar from './NavBar';
import {
	FINISH_NODE_COL,
	FINISH_NODE_ROW,
	START_NODE_COL,
	START_NODE_ROW,
} from '../constants';
import { dijkstra } from '../algorithms/dijkstra';

const PathFinder = () => {
	const { grid } = useCreateGrid();

	const visualizeDijkstra = () => {
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
		console.table(visitedNodesInOrder);
	};

	return (
		<>
			<nav className="nav">
				<button onClick={visualizeDijkstra}>start</button>
			</nav>
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
								isVisited={node.isVisited}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default PathFinder;
