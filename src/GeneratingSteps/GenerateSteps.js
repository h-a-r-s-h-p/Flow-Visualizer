class Graph {
    constructor(input) {
        this.numberOfVertices = input.graph.vertexCount;
        this.numberOfEdges = input.graph.edgeCount;
        this.startingVertices = input.graph.startingVertices.map(str => {
            return parseInt(str);
        });
        // console.log("startingVertices inside generate steps = "+ this.startingVertices);
        this.endingVertices = input.graph.endingVertices.map(str => {
            return parseInt(str);
        });
        // console.log("endingVertices inside generate steps = "+ this.endingVertices);
        this.weight = input.graph.weights.map(str => {
            return parseInt(str);
        });
        this.source = input.graph.source;
        this.sink = input.graph.sink;
        this.adjList = {};
        this.allSteps = {
            bfsdfs: [],
            path: []
        };
        this.capacities = input.dynamic
    }

    constructAdjList() {
        for (var i = 0; i < this.numberOfVertices; i++) {
            this.adjList[i] = [];
        }
        for (i = 0; i < this.numberOfEdges; i++) {
            var obj1 = this.createObject1(this.endingVertices[i], this.capacities.edgesCapacity[this.startingVertices[i]][this.endingVertices[i]]-this.capacities.edgesFlow[this.startingVertices[i]][this.endingVertices[i]]);
            var obj2 = this.createObject1(this.startingVertices[i], this.capacities.edgesCapacity[this.endingVertices[i]][this.startingVertices[i]]-this.capacities.edgesFlow[this.endingVertices[i]][this.startingVertices[i]]);
            // console.log(`object = ${obj.vertex} ${obj.weight}`);
            this.adjList[this.startingVertices[i]].push(obj1);
            this.adjList[this.endingVertices[i]].push(obj2);
        }
        for(i=0;i<this.numberOfVertices;i++){
            console.log(`vertex = ${i}`)
            for(var j=0;j<this.adjList[i].length;j++){
                console.log(this.adjList[i][j].vertex, this.adjList[i][j].weight)
            }
        }
    }

    createObject1(endingVertex, weight) {
        return (
            {
                vertex: endingVertex,
                weight: weight
            }
        );
    }


    bfs() {
        var queue = [];
        var parent = []
        for (var i = 0; i < this.numberOfVertices; i++) {
            parent[i] = -1;
        }
        queue.push(this.source);
        var visited = new Array(this.numberOfVertices);
        for (i = 0; i < this.numberOfVertices; i++) {
            visited[i] = false;
        }
        visited[this.source] = true;
        var flag = 0;
        while (queue.length !== 0) {
            if (flag === 1) break;
            var curr = queue[0];
            // console.log("curr = "+ curr);
            var step = [];
            step.push(curr);
            queue.shift();
            var adjacentNodes = this.adjList[curr];
            // console.log("adjacentNodes = ");
            // for( var k=0;k<adjacentNodes.length;k++){
            //     console.log(`${adjacentNodes[k].vertex}, ${adjacentNodes[k].weight}`);
            // }
            for (i = 0; i < adjacentNodes.length; i++) {
                if (adjacentNodes[i].weight === 0) continue;
                if (adjacentNodes[i].vertex === this.sink) {
                    parent[adjacentNodes[i].vertex] = curr;
                    step.push(this.sink);
                    flag = 1;
                    break;
                }
                if (!visited[adjacentNodes[i].vertex]) {
                    parent[adjacentNodes[i].vertex] = curr;
                    queue.push(adjacentNodes[i].vertex);
                    step.push(adjacentNodes[i].vertex);
                }
            }
            // console.log(`bfs step = ${step}`)
            this.allSteps.bfsdfs.push(step);

        }
        var currVertex = this.sink;
        while (currVertex !== -1) {
            this.allSteps.path.push(currVertex);
            currVertex = parent[currVertex];
        }
        if(flag===1) return 1;
        else return 0
    }

    dfs(currNode){
        var parent = []
        var visited=[]
        for (var i = 0; i < this.numberOfVertices; i++) {
            parent[i] = -1;
            visited[i]=false
        }

        this.dfshelper(currNode, visited, parent);
        var currVertex = this.sink;
        while (currVertex !== -1) {
            this.allSteps.path.push(currVertex);
            currVertex = parent[currVertex];
        }
    }
    dfshelper(currNode, visited, parent){
        this.allSteps.bfsdfs.push(currNode)
        visited[currNode]=true
        var neighbours= this.adjList[currNode]
        for(var i=0;i<neighbours.length;i++){
            if(neighbours[i].weight!==0 && visited[neighbours[i].vertex]===false){
                parent[neighbours[i].vertex]=currNode;
                this.dfshelper(neighbours[i].vertex,visited, parent)
                this.allSteps.bfsdfs.push(currNode)
            }
        }

    }

}

export default Graph;