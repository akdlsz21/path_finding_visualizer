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
import { initiateDijkstra, getPath } from '../algorithms/dijkstra';
import { INode } from '../types';
import { animateAsVisited, animatePath } from '../utils/animations';

const PathFinder = () => {
	const [speed, setSpeed] = useState(10);
	const { grid, setGrid } = useCreateGrid();
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [startNodePos, setStartNodePos] = useState({
		row: START_NODE_ROW,
		col: START_NODE_COL,
	});
	const [finNodePos, setFinishNodePos] = useState({
		row: FINISH_NODE_ROW,
		col: FINISH_NODE_COL,
	});

	const visualizeDijkstra = () => {
		const startNode = grid[startNodePos.row][startNodePos.col];
		const finishNode = grid[finNodePos.row][finNodePos.col];
		const visited = initiateDijkstra(grid, startNode, finishNode);
		const path = getPath(finishNode);
		animateVisitedAndPath(visited, path);
	};

	const animateVisitedAndPath = (visited: INode[], path: INode[]) => {
		for (let i = 0; i < visited.length; i++) {
			const { row, col } = visited[i];
			animateAsVisited(row, col, i, speed);
			if (i === visited.length - 1) {
				animatePath(path, i, speed);
			}
		}
	};

	const handleMouseDown = (row: number, col: number) => {
		// const target = e.target as HTMLDivElement;
		// const row = parseInt(target.getAttribute('data-row') as string);
		// const col = parseInt(target.getAttribute('data-col') as string);
		// const isStart = target.classList.contains('start');
		// const isFinish = target.classList.contains('finish');
		// if (isStart) {
		// 	setStartNodePos({ row, col });
		// } else if (isFinish) {
		// 	setFinishNodePos({ row, col });
		// }

		const node = grid[row][col];
		if (node.isStart) return;
		if (node.isFinish) return;
		node.isWall = !node.isWall;
		grid[row][col] = node;
		setGrid([...grid]);
		setIsMouseDown(true);
	};

	const handleMouseEnter = (row: number, col: number) => {
		if (!isMouseDown) return;
		handleMouseDown(row, col);
	};

	const handleMouseUp = () => {
		console.log('up!');
		// TODO: handleMouseUp should be added to grid itself.
		setIsMouseDown(false);
	};

	return (
		<>
			<nav className="nav">
				<button onClick={visualizeDijkstra}>start</button>
			</nav>
			<div className="grid" onMouseUp={handleMouseUp}>
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
								isWall={node.isWall}
								onMouseDown={handleMouseDown}
								onMouseEnter={handleMouseEnter}
								onMouseUp={handleMouseUp}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default PathFinder;
