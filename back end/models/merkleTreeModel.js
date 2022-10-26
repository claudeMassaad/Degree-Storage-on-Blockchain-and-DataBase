const mongoose = require('mongoose');

const merkleTreeSchema = mongoose.Schema({
    leafs:[{
        type:String,
        required:[true,'Please Send Leaf nodes'],
    }],
    merkleTree: [
        [{
        type:String,
        required:[true,'Please Send A MekleTree'],
    }],
],
    merkleRoot:[{
        type:String,
        required:[true,'Please Send a MerkleRoot'],
    }]
},{
    timestamps:true,
},
);

module.exports = mongoose.model("MerkleTree",merkleTreeSchema);