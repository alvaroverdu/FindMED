const { Schema, model } = require('mongoose');
const CentroSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    especialidad: {
        type: String
    },
    ubicacion: {
        type: String
    },
    ubicacion_usuario: {
        type: String
    },
    id_enfermedades: {
        type: String
    },
    nombre_enfermedades: {
        type: String
    },
}, { collection: 'centros' });

CentroSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Centro', CentroSchema);