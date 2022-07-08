const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        require: true,
        default: 'ROL_USUARIO'
    },
    edad: {
        type: Number,
    },
    ubicacion: {
        type: String,
    },
    enfermedades: [{
        nombre:String,
        descripcion:String,
        tratamiento:String,
        sintomas: [{
            nombre:String,
            descripcion:String
        }]
    }],
    alta: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { collection: 'usuarios' });


UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);