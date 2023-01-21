export interface INode {
	row: number;
	col: number;
	isStart: boolean;
	isFinish: boolean;
	isVisited: boolean;
	distance: number;
	prevNode: INode | null;
	isWall: boolean;
}

export interface NodePos {
	row: number;
	col: number;
}
