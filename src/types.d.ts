export interface INode {
	row: number;
	col: number;
	isStart: boolean;
	isFinish: boolean;
	isVisited: boolean;
	distance: number;
}
