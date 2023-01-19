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

	const nonVisitedNeighbors = neighborsOfNode.filter(
		(neighbor) => !neighbor.isVisited
	);
	for (const neighbor of nonVisitedNeighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.prevNode = node;
	}
}

function getMinDistanceNode(unvisitedNodes: INode[]): INode {
	// unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
	// const node = unvisitedNodes.shift();
	// return node!;
	let minDistanceNode = unvisitedNodes[0];
	let idx = -1;
	for (let i = 0; i < unvisitedNodes.length; i++) {
		if (unvisitedNodes[i].distance < minDistanceNode.distance) {
			minDistanceNode = unvisitedNodes[i];
			idx = i;
		}
	}
	if (idx === -1) {
		unvisitedNodes.splice(0, 1);
	} else {
		unvisitedNodes.splice(idx, 1);
	}
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

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getPath(finishNode: INode) {
	const nodesInShortestPathOrder = [];
	let currentNode = finishNode;
	let count = 0;

	// Fixed: BUG: Found Circular referencing with current node to prev.
	while (currentNode !== null) {
		nodesInShortestPathOrder.push(currentNode);
		currentNode = currentNode.prevNode!;
		count++;
		if (count >= 3000) {
			alert('Infinite loop detected.');
			break;
		}
	}
	// changing to reverse. unshifting each node to array may be slow due to cascade effect. maybe upload to blog.
	nodesInShortestPathOrder.reverse();
	return nodesInShortestPathOrder;
}
