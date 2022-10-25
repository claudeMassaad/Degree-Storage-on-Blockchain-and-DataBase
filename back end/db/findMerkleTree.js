    const { MerkleTree } = require("merkletreejs");
    const Web3 = require("web3");
    const keccak256 = require("keccak256");
    const web3 = new Web3("http://localhost:8545");


    let leafNodeToId = new Map(); 
    let merkleTrees = new Map();
    let idToMerkleRoot = [];
    let id = 0;

    /*
        pushes the merkleRoot to the idToMerkleRoot array which 
        sets the value of merkleRoot to respective ids
        [merkleRoot,merkleRoot, merkleRoot]
            id1        id2        id3
    */

    function pushToidToMerkleRoot(merkleRoot, length) {
    for (let i = 0; i < length; i++) {
        idToMerkleRoot.push(merkleRoot);
    }
    }

    /*
        sets a unique id to each node as its value
        inserts the key value pair into the NodeToId hashmap
        [
            {key:hashedNode value: uniqueId}
        ]
    */

    function pushToleafNodeToId(leafNodes, length, id) {
    for (let i = 0; i < length; i++) {
        leafNodeToId.set(leafNodes[i].toString("hex"), id);
        id += 1;
    }
    }

    /*
        adds leafNodes to LeafNodes to id hashMap
        adds merkleRoots to merkleRoot to id array
        incremenets the id
        by using the following algorithm we are able to retreive the merkleTree object a leafNode
        belongs to in O(1)

        <HashMap>
        leafNode --> 1          ---> id:1 
        leafNode2 --> 2
        
        <array>
        [merkleRoot1,merkleRoo1,merkleRoot2]; id:1 --> merkleRoot1

        <HashMap>
        merkleRoot1 -->  merkleRoot Object

        retreiving id from leafNode --> O(1) hashMap
        retreiving merkleRoot from id --> O(1) array
        retreving merkleTree from merkleRoot --> O(1) hashMap
    */

    function createMerkleTree(Nodes) {
    let leafNodes = Nodes.map((addr) => keccak256(addr));
    let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    let merkleRoot = merkleTree.getHexRoot();
    merkleTrees.set(merkleRoot, merkleTree);
    let leafNodesLength = leafNodes.length;

    //stored the merkleRoot in the index
    pushToidToMerkleRoot(merkleRoot, leafNodesLength);

    // stores the leaf nodes in the mapping
    pushToleafNodeToId(leafNodes, leafNodesLength, id);

    id += leafNodesLength;

    return merkleTree;
    }

    function getMerkleRoot(leafNode) {
    let root =
        idToMerkleRoot[leafNodeToId.get(keccak256(leafNode).toString("hex"))];
    if (root == undefined) return -1;
    return root;
    }

    function getMerkleTree(leafNode) {
        let root = getMerkleRoot(leafNode);
        if (root == -1) throw new Error("leaf does not exist");
        return merkleTrees.get(getMerkleRoot(leafNode));
    }
    
module.exports = {
    createMerkleTree,
};