import React from 'react';

interface NodeProps {
	row: number;
	col: number;
	isStart: boolean;
	isFinish: boolean;
	isVisited: boolean;
}

const Node = ({ row, col, isStart, isFinish, isVisited }: NodeProps) => {
	let nodeClassName = 'node';
	if (isStart) nodeClassName += ' start';
	if (isFinish) nodeClassName += ' finish';
	if (isVisited) nodeClassName += ' visited';
	const id = `node-${row}-${col}`;
	return <div className={nodeClassName} id={id}></div>;
};

export default Node;
