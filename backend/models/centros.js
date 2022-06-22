const { Schema, model } = require('mongoose');

const CentroSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    especialidad: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true
    },
    enfermedades: [{
        enfermedad: {
            type: Schema.Types.ObjectId,
            ref: 'Enfermedad'
        }
    }]

}, { collection: 'centros' });

CentroSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Centro', CentroSchema);