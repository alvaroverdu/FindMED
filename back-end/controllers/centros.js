
const { response } = require('express');
const Centro = require('../models/centros');

const obtenerCentros = async(req, res = response) => {
    // Paginación
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    try {
        const [centros, total] = await Promise.all([
            Centro.find({}).skip(desde).limit(registropp),
            Centro.countDocuments()
        ]);
        res.status(400).json({
            ok: true,
            msg: 'obtenerCentros',
            centros,
            page: {
                desde,
                registropp,
                total
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error al obtener centros'
        });
    }
}

const crearCentro = async(req, res = response) => {
    const nombre = String(req.body.nombre).trim();
    try {
        // Comrprobar que no existe un usuario con ese email registrado
        const existeCentro = await Centro.findOne({ nombre: nombre });
        if (existeCentro) {
            return res.status(400).json({
                ok: false,
                msg: 'El centro ya existe'
            });
        }
        const centro = new Centro(req.body);
        centro.nombre = nombre;
        // Almacenar en BD
        await centro.save();
        res.json({
            ok: true,
            msg: 'Centro creado',
            centro,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando centro'
        });
    }
}

const actualizarCentro = async(req, res) => {
    const nombre = String(req.body.nombre).trim();
    const object = req.body;
    const uid = req.params.id;
    try {
        // Si han enviado el nombre, comprobar que no exista otro en BD con el mismo nombre
        if (nombre) {
            const existeCentro = await Centro.findOne({ nombre });
            if (existeCentro) {
                if (existeCentro._id != uid) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El centro ya existe'
                    });
                }
            }
            object.nombre = nombre;
        }
        const centro = await Centro.findByIdAndUpdate(uid, object, { new: true });
        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            centro
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando centro'
        });
    }
}

const borrarCentro = async(req, res = response) => {
    const uid = req.params.id;
    try {
        // Comprobamos si existe el usuario que queremos borrar
        const existeCentro = await Centro.findById(uid);
        if (!existeCentro) {
            return res.status(400).json({
                ok: true,
                msg: 'El centro no existe'
            });
        }
        // Lo eliminamos y devolvemos el usuaurio recien eliminado
        const resultado = await Centro.findByIdAndRemove(uid);
        res.json({
            ok: true,
            msg: 'Centro eliminado',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando centro'
        });
    }
}

module.exports = { obtenerCentros, crearCentro, actualizarCentro, borrarCentro }