const multer = require("multer");
const path = require("path");

module.exports = class UploadService {
 constructor() {
   this.storage = multer.diskStorage({
     destination: "./uploads",
     filename: (req, file, callback) => {
       const fileName = this.getUniqueName(file.originalname);
       callback(null, fileName);
     }
   });

   this.multerHandler = multer({
     storage: this.storage
   }).single("file");
 }

 getUniqueName(fileName) {
    return Date.now() + "_" + fileName;
  }
 
  upload(req, res) {
    return new Promise((resolve, reject) => {
      this.multerHandler(req, res, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
 
}
 