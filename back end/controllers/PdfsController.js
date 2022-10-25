const asyncHandler = require('express-async-handler');
const MerkleTree = require('../models/merkleTreeModel');

const postPDF = asyncHandler(async (req,res)=>{
   const {layers} = req.body;
   if(!layers){
    res.status(400);
    throw new Error('Please send hashed PDFs data');
   }

   const merkleTree = layers;
   
   const length = layers.length;
   const merkleRoot = layers[length-1];  

   const newMerkleTree = await MerkleTree.create({
   merkleTree:merkleTree,
   merkleRoot:merkleRoot
});
   if(!newMerkleTree){
    res.status(400);
    throw new Error("Could not Create a new File");
   }
   res.status(200).json(newMerkleTree);
});

const validatePDF = asyncHandler(async(req,res)=>{
   const {hashedPdf} = req.body;
   if(!hashedPdf){
      res.status(400);
      throw new Error('Please send a Hased PDF');
   }
   //try to look inside only one place at least.

   const pdfExists = await MerkleTree.findOne({hashedPdf});
   if(!pdfExists){
      res.status(400);
      throw new Error('Could not find a match for that pdf');
   }
   res.status(200).json(pdfExists.merkleRoot);
})

module.exports = {
    postPDF,
    validatePDF
}