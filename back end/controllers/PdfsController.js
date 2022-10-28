const asyncHandler = require('express-async-handler');
const MerkleTree = require('../models/merkleTreeModel');

const postPDF = asyncHandler(async (req,res)=>{
  const {layers} = req.body;
  if(!layers){
   res.status(400);
   throw new Error('Please send hashedPDFS');
}
  const length = layers.length;
  const leafs = layers[0];
  const merkleTree = layers;
  const merkleRoot = layers[length - 1];   
   const merkleTreeObject = await MerkleTree.create({
      leafs:leafs,
      merkleTree:merkleTree,
      merkleRoot:merkleRoot,
  });
  if(!merkleTreeObject){
   res.status(400);
   throw new Error('mongoData Format is incorrect');
  }
  res.status(200).json(merkleTree);
});

const validatePDF = asyncHandler(async(req,res)=>{
   const {hashedPdf} = req.body;
   if(!hashedPdf){
      res.status(400);
      throw new Error('Please send a Hased PDF');
   }
   const pdfExists = await MerkleTree.findOne({leafs:hashedPdf});
   if(!pdfExists){
      res.status(400);
      throw new Error('Could not find a match for that pdf');
   }
   res.status(200).json(pdfExists.merkleRoot);
});

module.exports = {
    postPDF,
    validatePDF
}