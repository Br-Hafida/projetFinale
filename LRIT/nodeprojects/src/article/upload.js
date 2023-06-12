const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      if (
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/pdf'
      ) {
        cb(null, true);
      } else {
        console.log('only msword & pdf');
        cb(null, false);
      }
    }
  });

  module.exports = upload;