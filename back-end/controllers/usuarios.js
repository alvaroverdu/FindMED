const { response } = require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');

/*
get / 
<-- desde? el salto para buscar en la lista de usuarios
    id? un identificador concreto, solo busca a este
--> devuleve todos los usuarios
*/
const obtenerUsuarios = async(req, res) => {

    // Recibimos el desde

    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);

    // Obtenemos el ID de usuario por si quiere buscar solo un usuario
    const id = req.query.id;


    /* const usuarios = await Usuario.find({}, 'nombre email rol').skip(desde).limit(registropp);
    const total = await Usuario.countDocuments(); */
    try {

        let usuarios, total;
        if (id) {
            if (!validator.isMongoId(id)) {
                return res.json({
                    ok: false,
                    msg: 'El id de usuario debe ser válido'
                });
            }

            [usuarios, total] = await Promise.all([
                Usuario.findById(id),
                Usuario.countDocuments()
            ]);

        } else {
            [usuarios, total] = await Promise.all([
                Usuario.find({}).skip(desde).limit(registropp).populate('centro'),
                Usuario.countDocuments()
            ]);
        }

        res.json({
            ok: true,
            msg: 'getUsuarios',
            usuarios,
            page: {
                desde,
                registropp,
                total
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error obteniedo usuarios'
        });
    }


}

/*
post / 
<-- nombre, apellidos, email, password, rol?
--> usuario registrado
*/
const crearUsuario = async(req, res = response) => {

    const { email, password, rol } = req.body;

    try {

        // Comrprobar que no existe un usuario con ese email registrado
        const exiteEmail = await Usuario.findOne({ email: email });

        if (exiteEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            });
        }

        // Cifrar la contraseña, obtenemos el salt y ciframos
        const salt = bcrypt.genSaltSync();
        const cpassword = bcrypt.hashSync(password, salt);

        const usuario = new Usuario(req.body);
        usuario.password = cpassword;

        // Almacenar en BD
        await usuario.save();

        res.json({
            ok: true,
            msg: 'crearUsuarios',
            usuario: usuario,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando usuario'
        });
    }
}

/*
post /:id
<-- nombre, apellidos, email, rol   
--> usuario actualizado
*/

const actualizarUsuario = async(req, res = response) => {

    // Asegurarnos de que aunque venga el password no se va a actualizar, la modificaciñon del password es otra llamada
    // Comprobar que si cambia el email no existe ya en BD, si no existe puede cambiarlo
    const { password, email, ...object } = req.body;
    const uid = req.params.id;

    try {

        // Comprobar si está intentando cambiar el email, que no coincida con alguno que ya esté en BD
        // Obtenemos si hay un usuaruio en BD con el email que nos llega en post
        const existeEmail = await Usuario.findOne({ email: email });

        if (existeEmail) {
            // Si existe un usuario con ese email
            // Comprobamos que sea el suyo, el UID ha de ser igual, si no el email est en uso
            if (existeEmail._id != uid) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                });
            }
        }
        // llegadoa aquí el email o es el mismo o no está en BD
        object.email = email;
        // al haber extraido password del req.body nunca se va a enviar en este put
        const usuario = await Usuario.findByIdAndUpdate(uid, object, { new: true });

        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario: usuario
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando usuario'
        });
    }

}

/*
delete /:id
--> OK si ha podido borrar
*/
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // Comprobamos si existe el usuario que queremos borrar
        const existeUsuario = await Usuario.findById(uid);
        if (!existeUsuario) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }
        // Lo eliminamos y devolvemos el usuaurio recien eliminado
        const resultado = await Usuario.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: true,
            msg: 'Error borrando usuario'
        });
    }
}


module.exports = { obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }