var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fichier: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Article', articleSchema);