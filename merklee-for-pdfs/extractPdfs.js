const crypto = require("crypto");
const sha256 = require("crypto-js/sha256");
const fs = require("fs");

const path = require("path");
const dirPath = "./pdfs";
let pdfFiles = fs.readdirSync(dirPath);
let pdfFilesLength = pdfFiles.length;
let hashesArray = [];


function hashPdfFunction(callback){
  hashesArray = [];
  fs.readdir(path.resolve(__dirname, "./pdfs"), (err, files) => {

  if (err) throw err;
    for (let file of files) {
      const fileBuffer = fs.readFileSync(`./pdfs/${file}`, {
        encoding: "utf8",
      });
      const hashSum = crypto.createHash("sha256");
      hashSum.update(fileBuffer);
      
      const hex = hashSum.digest("hex");
      hashesArray.push(hex);
    }
    callback(hashesArray);
  });
}
module.exports = {hashPdfFunction};