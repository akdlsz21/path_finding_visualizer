import React from 'react';

interface NodeProps {
	row: number;
	col: number;
	isStart: boolean;
	isFinish: boolean;
	isVisited: boolean;
	isWall: boolean;
	onMouseDown: (arg1: number, arg2: number) => void;
	onMouseEnter: (arg1: number, arg2: number) => void;
	onMouseUp: () => void;
}

const Node = ({
	row,
	col,
	isStart,
	isFinish,
	isVisited,
	isWall,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
}: NodeProps) => {
	let nodeClassName = 'node';
	if (isStart) nodeClassName += ' start';
	if (isFinish) nodeClassName += ' finish';
	if (isVisited) nodeClassName += ' visited';
	if (isWall) nodeClassName += ' wall';
	const id = `node-${row}-${col}`;
	// BUG: dragging
	return (
		<div
			className={nodeClassName}
			id={id}
			onMouseDown={() => onMouseDown(row, col)}
			onMouseEnter={() => onMouseEnter(row, col)}
			onMouseUp={() => onMouseUp()}
			onDragStart={() => onMouseDown(row, col)}
			onDragEnter={() => onMouseEnter(row, col)}
			onDragEnd={() => onMouseUp()}
		></div>
	);
};

export default Node;
