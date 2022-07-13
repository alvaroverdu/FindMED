const { response } = require('express');
const { infoToken } = require('../helpers/infotoken');

const Sintoma = require('../models/sintomas');

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const obtenerSintomas = async(req, res = response) => {
    // Paginación
    const desde = Number(req.query.desde) || 0;
    const hasta = req.query.hasta || '';
    let registropp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;
    const texto = req.query.texto;
    const busqueda = req.query.busqueda;
    let textoBusqueda = '';
    if (texto) {
        textoBusqueda = new RegExp(texto, 'i');
        //console.log('texto', texto, ' textoBusqueda', textoBusqueda);
    }
    if (hasta === 'todos') {
        registropp = 1000;
    }
    //await sleep(2000);
    try {
        let sintomas, total;
        if (id) {
            [sintomas, total] = await Promise.all([
                Sintoma.findById(id),
                Sintoma.countDocuments()
            ]);
        } else {
            if (busqueda) {
                [sintomas, total] = await Promise.all([
                    Sintoma.find({ nombre: new RegExp(busqueda,'i')}),
                    Sintoma.countDocuments()
                ]);
            }else{
                if (texto) {
                    [sintomas, total] = await Promise.all([
                        Sintoma.find({ $or: [{ nombre: textoBusqueda }] }).skip(desde).limit(registropp),
                        Sintoma.countDocuments({ $or: [{ nombre: textoBusqueda }] })
                    ]);
                } else {
                    [sintomas, total] = await Promise.all([
                        Sintoma.find({}).skip(desde).limit(registropp),
                        Sintoma.countDocuments()
                    ]);
                }
            }
            
        }
        res.json({
            ok: true,
            msg: 'obtenerSintomas',
            sintomas,
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
            msg: 'Error al obtener sintomas'
        });
    }
}

const obtenerSintomasBusqueda = async(req, res = repsonse) => {

    // Paginación
    const texto = req.query.texto;
    let textoBusqueda = '';
    if (texto) {
        textoBusqueda = new RegExp(texto, 'i');
        //console.log('texto', texto, ' textoBusqueda', textoBusqueda);
    }
    //await sleep(2000);
    try {
        let sintomas, total;
            [sintomas, total] = await Promise.all([
                Sintoma.find({ nombre: '/' + textoBusqueda + '/' }),
                Sintoma.countDocuments()
            ]);
        res.json({
            ok: true,
            msg: 'obtenerSintomas',
            sintomas,
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
            msg: 'Error al obtener sintomas'
        });
    }
}

/*
post / 
--> sintoma registrado
*/
const crearSintoma = async(req, res = response) => {

    const { nombre, descripcion } = req.body;


    try {
        // Solo el administrador puede hacer esta acción
        const token = req.header('x-token');
        if (!(infoToken(token).rol === 'ROL_ADMIN')) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para crear sintomas',
            });
        }

        // Comrprobar que no existe un usuario con ese email registrado
        const existeSintoma = await Sintoma.findOne({ nombre });

        if (existeSintoma) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe un sintoma con el mismo nombre'
            });
        }

        const sintoma = new Sintoma(req.body);

        // Almacenar en BD
        await sintoma.save();

        res.json({
            ok: true,
            msg: 'Sintoma creado',
            sintoma,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando sintoma'
        });
    }
}

const actualizarSintoma = async(req, res = response) => {

    const { nombre } = req.body;
    const uid = req.params.id;

    try {
        // Solo el administrador puede hacer esta acción
        const token = req.header('x-token');
        if (!(infoToken(token).rol === 'ROL_ADMIN')) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para actualizar sintomas',
            });
        }
        // Comrprobar que no existe un usuario con ese email registrado
        const existeSintoma = await Sintoma.findById(uid);

        if (!existeSintoma) {
            return res.status(400).json({
                ok: false,
                msg: 'El sintoma no existe'
            });
        }

        const sintoma = await Sintoma.findByIdAndUpdate(uid, req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Sintoma actualizado',
            sintoma
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando sintoma'
        });
    }
}

const borrarSintoma = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // Solo el administrador puede hacer esta acción
        const token = req.header('x-token');
        if (!(infoToken(token).rol === 'ROL_ADMIN')) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para eliminar sintomas',
            });
        }

        // Comprobamos si existe el usuario que queremos borrar
        const existeSintoma = await Sintoma.findById(uid);
        if (!existeSintoma) {
            return res.status(400).json({
                ok: true,
                msg: 'El sintoma no existe'
            });
        }
        // Lo eliminamos y devolvemos el sintoma recien eliminado
        const resultado = await Sintoma.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Sintoma eliminado',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error borrando sintoma'
        });

    }
}



module.exports = { obtenerSintomas, crearSintoma, actualizarSintoma, borrarSintoma,obtenerSintomasBusqueda }