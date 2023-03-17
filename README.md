# path_finding_visualizer

This is a TypeScript module that implements the Dijkstra's algorithm for finding
the shortest path between two nodes in a grid. The code defines a function
called initiateDijkstra, which takes a two-dimensional array of nodes (grid), a
startNode, and a finishNode as arguments. The function first initializes an
empty array called visited and sets the distance of the startNode to 0. It then
gets all nodes in the grid using the getAllNodes function, which is defined
below.

## initiateDijikstra

The algorithm proceeds by iterating through the unvisited nodes in the grid
until all nodes have been visited or the finishNode has been reached. In each
iteration, it selects the node with the smallest distance from the startNode and
marks it as visited. It then updates the distance and previous node of each
neighboring node that has not been visited yet. The
setDistanceAndPrevToNeighbors function is responsible for updating these values.

If the finishNode is reached, the function returns the visited array, which
contains all the nodes visited during the algorithm. If all nodes have been
visited and the finishNode has not been reached, the function also returns the
visited array. If the startNode and finishNode are not connected, the visited
array will contain all the nodes in the grid.

## getPath

The getPath function is used to backtrack from the finishNode to the startNode
to find the shortest path. It takes the finishNode as an argument and returns an
array of nodes in the order they appear in the shortest path. The function
follows the prevNode property of each node until it reaches the startNode. To
avoid infinite loops caused by circular references between nodes, the function
sets a maximum count of 3000 iterations before breaking and displaying an alert
message.
