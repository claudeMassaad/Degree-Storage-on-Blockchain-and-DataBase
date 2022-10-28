const mongoose = require('mongoose');

const merkleTreeSchema = mongoose.Schema({
    leafs:[{
        type:{type:String},
        data:[{type:String}]
    }],
    merkleTree:[[
        {
            type:{type:String},
            data:[{type:String}],
        }
    ]],
    merkleRoot:[{
       type:{type:String},
       data:[{type:String}]
    }]
},{
    timestamps:true,
},
);

module.exports = mongoose.model("MerkleTree",merkleTreeSchema);