const mongoose = require('mongoose');

const merkleTreeSchema = mongoose.Schema({
    merkleTree: [
        [{
        type:String,
        required:[true,'Please Send A MekleTree'],
    }]
],
    merkleRoot:[{
        type:String,
        required:[true,'Please Send a MerkleRoot'],
    }]
},{
    timestamps:true,
},
{
    typeKey: '$type', 
}
);

module.exports = mongoose.model("MerkleTree",merkleTreeSchema);