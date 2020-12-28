import { Tree } from './SimpleTree'

let theTree = new Tree()
theTree.insert(50, 1.5)
theTree.insert(25, 1.7)
theTree.insert(75, 1.9)

let found = theTree.find(25)
if (found != null)
    console.log("Found the node with key 25")
else
    console.log("Could not find node with key 25")