const { Schema, model } = require('mongoose');

const EnfermedadSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String
    },
    tratamiento: {
        type: String
    },
    sintomas: [{
        sintoma: {
            type: Schema.Types.ObjectId,
            ref: 'Sintoma'
        }
    }]

}, { collection: 'enfermedades' });

EnfermedadSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Enfermedad', EnfermedadSchema);