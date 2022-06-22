const { Schema, model } = require('mongoose');

const SintomaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true,
        unique: true
    }
}, { collection: 'sintomas' });

SintomaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Sintoma', SintomaSchema);