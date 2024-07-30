import React, { useEffect, useRef, useState } from 'react';
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
import { randomMaze } from '../algorithms/maze/randomMaze';
import { recursiveDivisionMaze } from '../algorithms/maze/recursiveMaze';

const PathFinder = () => {
	const [speed, setSpeed] = useState(12);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [isSNodeRepositioning, setIsSNodeRepositioning] = useState(false);
	const [isFNodeRepositioning, setIsFNodeRepositioning] = useState(false);
	const [startNodePos, setStartNodePos] = useState({
		row: START_NODE_ROW,
		col: START_NODE_COL,
	});
	const [finNodePos, setFinishNodePos] = useState({
		row: FINISH_NODE_ROW,
		col: FINISH_NODE_COL,
	});
	const { grid, setGrid } = useCreateGrid(startNodePos, finNodePos);
	const [numOfVisited, setNumOfVisited] = useState(0);
	const [numOfPath, setNumOfPath] = useState(0);
	const isVisualizingRef = useRef(false);

	const [isVisualizing, setIsVisualizing] = useState(false);

	const visualizeDijkstra = () => {
		isVisualizingRef.current = true;
		const startNode = grid[startNodePos.row][startNodePos.col];
		const finishNode = grid[finNodePos.row][finNodePos.col];
		const visited = initiateDijkstra(grid, startNode, finishNode);
		const path = getPath(finishNode);
		animateVisitedAndPath(visited, path);
	};

	const animateVisitedAndPath = (visited: INode[], path: INode[]) => {
		console.log('@animateVisitedAndPath');
		let totalTime = 0;
		setIsVisualizing(true);
		console.log(isVisualizing);
		for (let i = 0; i < visited.length; i++) {
			// debugger;
			console.log(
				'🚀 ~ animateVisitedAndPath ~ visited.length:',
				visited.length
			);
			const { row, col } = visited[i];
			// if (i === 0) {
			// 	setTimeout(() => {
			// 		setIsVisualizing(true);
			// 	}, 1000);
			// }

			animateAsVisited(row, col, i, speed, startNodePos, finNodePos);
			if (i === visited.length - 1) {
				animatePath(path, i, speed, startNodePos, finNodePos);
			}
			if (i === visited.length - 1) {
				totalTime = (i + path.length) * speed;
				console.log('🚀 ~ animateVisitedAndPath ~ totalTime:', totalTime);
				setTimeout(() => {
					isVisualizingRef.current = false;
					// setIsVisualizing(false);
				}, totalTime);
			}
		}
	};

	const handleMouseDown = (row: number, col: number) => {
		if (isVisualizingRef.current) return;

		const node = grid[row][col];
		if (node.isStart || isSNodeRepositioning) {
			setIsMouseDown(true);
			setIsSNodeRepositioning(true);
			setStartNodePos({ row, col });
			grid[row][col] = node;
			setGrid((prevGrid) => {
				prevGrid[row][col] = node;
				return [...prevGrid];
			});
			setIsMouseDown(true);
			return;
		}
		if (node.isFinish || isFNodeRepositioning) {
			setIsMouseDown(true);
			setIsFNodeRepositioning(true);
			setFinishNodePos({ row, col });
			grid[row][col] = node;
			setGrid((prevGrid) => {
				prevGrid[row][col] = node;
				return [...prevGrid];
			});
			setIsMouseDown(true);
			return;
		}

		node.isWall = !node.isWall;

		grid[row][col] = node;
		setGrid([...grid]);
		setIsMouseDown(true);
	};

	const handleMouseEnter = (row: number, col: number) => {
		if (!isMouseDown) return;
		if (isVisualizingRef.current) return;

		if (isSNodeRepositioning) {
			handleMouseDown(row, col);
			return;
		}

		if (isFNodeRepositioning) {
			handleMouseDown(row, col);
		}

		handleMouseDown(row, col);
	};
	const handleMouseUp = () => {
		if (isVisualizingRef.current) return;

		setIsSNodeRepositioning(false);
		setIsFNodeRepositioning(false);
		setIsMouseDown(false);
	};

	const handleRandomMazeClick = () => {
		const startNode = grid[startNodePos.row][startNodePos.col];
		const finishNode = grid[finNodePos.row][finNodePos.col];
		const walls = randomMaze(startNode, finishNode, grid);
		console.log(walls);
		for (let i = 0; i < walls.length; i++) {
			setTimeout(() => {
				const wallNode = walls[i];
				const { row, col } = wallNode;
				document
					.getElementById(`node-${row}-${col}`)
					?.classList.add('wall');
			}, i * speed);
		}
	};

	const handleRecursiveMaze = () => {
		const startNode = grid[startNodePos.row][startNodePos.col];
		const finishNode = grid[finNodePos.row][finNodePos.col];
		const walls = recursiveDivisionMaze(grid, startNode, finishNode);

		for (let i = 0; i < walls.length; i++) {
			setTimeout(() => {
				const wallNode = walls[i];
				const { row, col } = wallNode;
				document
					.getElementById(`node-${row}-${col}`)
					?.classList.add('wall');
			}, i * speed);
		}
	};

	return (
		<>
			<nav className="nav">
				<button onClick={visualizeDijkstra}>START</button>
				<button onClick={handleRecursiveMaze}>RECURSIVE</button>
				<button onClick={handleRandomMazeClick}>RANDOM</button>
			</nav>
			<div className="grid" onMouseUp={handleMouseUp}>
				{grid.map((con, i) => (
					<div className="row-ctn" key={i}>
						{con.map((node, i) => {
							return (
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
							);
						})}
					</div>
				))}
			</div>
		</>
	);
};

export default PathFinder;
