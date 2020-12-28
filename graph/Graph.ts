interface Vertex {
    wasVisited: boolean
    index: number
}


class DefaultVertex implements Vertex {
    public index: number
    public label: string
    public wasVisited: boolean

    constructor(lab: string) {
        this.label = lab

        this.wasVisited = false
    }
}

interface MatMap {

    put(start: number, end: number): void;
    getOthers(node: number): number[];
}
class DefaultMatMap implements MatMap {

    private edgeMap = {}

    public put(start: number, end: number): void {
        if (!this.edgeMap[start]) {
            this.edgeMap[start] = []
        }
        this.edgeMap[start].push(end)
    }

    public getOthers(node: number): number[] {
        return this.edgeMap[node]
    }
}

class Graph {
    public vertexList: Vertex[]
    public theStack: number[]
    private _mapMap: MatMap

    constructor() {
        this.vertexList = []
        this.theStack = []

    }

    public addVertex(vertex: Vertex) {
        vertex.index = this.vertexList.length
        this.vertexList.push(vertex)
    }

    public addEdge(start: number, end: number) {
        this._mapMap.put(start, end)
    }

    public set mapMap(m: MatMap) {
        this._mapMap = m
    }

    private peek(): number {
        return this.theStack[this.theStack.length - 1]
    }

    private getUnvisitedVertex(node: number): number {
        console.assert(this._mapMap != undefined, "必须设置图的边对象")
        let mats = this._mapMap.getOthers(node)
        if (!mats) return -1
        let val = mats.filter(e => {
            return this.vertexList[e].wasVisited == false
        })
        if (!val.length) return -1
        return val[0]
    }

    public dcf(visit: Function) {
        this.vertexList[0].wasVisited = true
        visit(this.vertexList[0])
        this.theStack.push(0)
        while (this.theStack.length > 0) {
            let v = this.getUnvisitedVertex(this.peek())
            if (v == -1) {
                this.theStack.pop()
            } else {
                this.vertexList[v].wasVisited = true
                visit(this.vertexList[v])
                this.theStack.push(v)
            }
        }
        this.vertexList.forEach(e => e.wasVisited = false)
    }
}

export { DefaultMatMap, Graph, MatMap, Vertex, DefaultVertex }
// let g = new Graph()
// g.mapMap=new DefaultMatMap()
// g.addVertex(new DefaultVertex('A'))
// g.addVertex(new DefaultVertex('B'))
// g.addVertex(new DefaultVertex('C'))
// g.addVertex(new DefaultVertex('D'))
// g.addVertex(new DefaultVertex('E'))



// g.addEdge(0,1)
// g.addEdge(1,2)
// g.addEdge(0,3)
// g.addEdge(3,4)

// g.dcf(e=>console.log(e))