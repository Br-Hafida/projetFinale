var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var specialiteEnum = ['PES', 'PS', 'PH', 'Archivé'];

var professeurSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cni: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    specialite: {
        type: String,
        enum: specialiteEnum,
        required: true
    },     
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Professeur', professeurSchema);