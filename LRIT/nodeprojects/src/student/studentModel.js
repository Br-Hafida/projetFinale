var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const etatEnum = ['Nouveau', 'En cours', 'Soutenu', 'Archivé'];

var studentSchema = new Schema({

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
    cne: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    these: {
        type: String,
        required: true
    },
    datedebut: {
        type: Date,
        required: true
    },
    etat: {
        type: String,
        enum: etatEnum,
        required: true
    },
    duree: {
        type: String, // Changement du type en String pour stocker la durée formatée
        required: true
    },     
    role: {
        type: String,
        required: true
    },
    dateBirth: {
        type: Date
    },
    age: {
        type: Number
    },
    tele: {
        type: String
    }

});

module.exports = mongoose.model('student', studentSchema);