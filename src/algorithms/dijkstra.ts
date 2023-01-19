import { INode } from '../types';

export function dijkstra(grid: INode[][], startNode: INode, finishNode: INode) {
	const visitedNodesInOrder: INode[] = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid);

	while (!!unvisitedNodes.length) {
		// TODO: sort unvisitedNode by distance.
		// Maybe, use a priority data structure in future.
		const minDistanceNode = getMinDistanceNode(unvisitedNodes);
		// TODO: minDistanceNode could be a wall if setted by user.
		if (minDistanceNode.distance === Infinity) return visitedNodesInOrder;
		minDistanceNode.isVisited = true;
		visitedNodesInOrder.push(minDistanceNode);

		if (minDistanceNode === finishNode) return visitedNodesInOrder;
		setDistanceAndPrevToNeighbors(minDistanceNode, grid);
	}

	return visitedNodesInOrder;
}

function setDistanceAndPrevToNeighbors(node: INode, grid: INode[][]) {
	const neighborsOfNode = [];

	const { col, row } = node;
	if (row > 0) neighborsOfNode.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighborsOfNode.push(grid[row + 1][col]);
	if (col > 0) neighborsOfNode.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighborsOfNode.push(grid[row][col + 1]);

	for (const neighbor of neighborsOfNode) {
		neighbor.distance = node.distance + 1;
		neighbor.prevNode = node;
	}
}

function getMinDistanceNode(unvisitedNodes: INode[]) {
	let minDistanceNode = unvisitedNodes[0];
	let idx = -1;
	for (let i = 0; i < unvisitedNodes.length; i++) {
		if (unvisitedNodes[i].distance < minDistanceNode.distance) {
			minDistanceNode = unvisitedNodes[i];
			idx = i;
		}
	}
	unvisitedNodes.splice(idx, 1);
	return minDistanceNode;
}

function getAllNodes(grid: INode[][]) {
	const nodes: INode[] = [];

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			nodes.push(grid[i][j]);
		}
	}
	return nodes;
}
