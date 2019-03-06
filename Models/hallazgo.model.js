const mongoose = require('mongoose');

var hallazgoSchema = new mongoose.Schema({
    gemba_walkID: {
        type: Number,
        required: 'Gemba_walkID can\'t be empty'
    },
    archivo: {
        type: String,
        required: 'Archivo can\'t be empty',
        unique: true
    },
    tipo: {
        type: String,
        required: 'Tipo can\'t be empty'
    }
});
mongoose.model('Hallazgo', hallazgoSchema);