"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultVertex = exports.Graph = exports.DefaultMatMap = void 0;
var DefaultVertex = /** @class */ (function () {
    function DefaultVertex(lab) {
        this.label = lab;
        this.wasVisited = false;
    }
    return DefaultVertex;
}());
exports.DefaultVertex = DefaultVertex;
var DefaultMatMap = /** @class */ (function () {
    function DefaultMatMap() {
        this.edgeMap = {};
    }
    DefaultMatMap.prototype.put = function (start, end) {
        if (!this.edgeMap[start]) {
            this.edgeMap[start] = [];
        }
        this.edgeMap[start].push(end);
    };
    DefaultMatMap.prototype.getOthers = function (node) {
        return this.edgeMap[node];
    };
    return DefaultMatMap;
}());
exports.DefaultMatMap = DefaultMatMap;
var Graph = /** @class */ (function () {
    function Graph() {
        this.vertexList = [];
        this.theStack = [];
    }
    Graph.prototype.addVertex = function (vertex) {
        vertex.index = this.vertexList.length;
        this.vertexList.push(vertex);
    };
    Graph.prototype.addEdge = function (start, end) {
        this._mapMap.put(start, end);
    };
    Object.defineProperty(Graph.prototype, "mapMap", {
        set: function (m) {
            this._mapMap = m;
        },
        enumerable: false,
        configurable: true
    });
    Graph.prototype.peek = function () {
        return this.theStack[this.theStack.length - 1];
    };
    Graph.prototype.getUnvisitedVertex = function (node) {
        var _this = this;
        console.assert(this._mapMap != undefined, "必须设置图的边对象");
        var mats = this._mapMap.getOthers(node);
        if (!mats)
            return -1;
        var val = mats.filter(function (e) {
            return _this.vertexList[e].wasVisited == false;
        });
        if (!val.length)
            return -1;
        return val[0];
    };
    Graph.prototype.dcf = function (visit) {
        this.vertexList[0].wasVisited = true;
        visit(this.vertexList[0]);
        this.theStack.push(0);
        while (this.theStack.length > 0) {
            var v = this.getUnvisitedVertex(this.peek());
            if (v == -1) {
                this.theStack.pop();
            }
            else {
                this.vertexList[v].wasVisited = true;
                visit(this.vertexList[v]);
                this.theStack.push(v);
            }
        }
        this.vertexList.forEach(function (e) { return e.wasVisited = false; });
    };
    return Graph;
}());
exports.Graph = Graph;
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
