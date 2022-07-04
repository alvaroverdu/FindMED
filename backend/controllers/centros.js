const { response } = require('express');
const { infoToken } = require('../helpers/infotoken');

const Centro = require('../models/centros');
const Enfermedad = require('../models/enfermedades');

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


const obtenerCentros = async(req, res = repsonse) => {

    // Paginación
    const desde = Number(req.query.desde) || 0;
    const hasta = req.query.hasta || '';
    let registropp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;
    const texto = req.query.texto;
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
        let centros, total;
        if (id) {
            [centros, total] = await Promise.all([
                Centro.findById(id),
                Centro.countDocuments()
            ]);
        } else {
            if (texto) {
                [centros, total] = await Promise.all([
                    Centro.find({ $or: [{ nombre: textoBusqueda }, { especialidad: textoBusqueda }] }).skip(desde).limit(registropp),
                    Centro.countDocuments({ $or: [{ nombre: textoBusqueda }, { especialidad: textoBusqueda }] })
                ]);
            } else {
                [centros, total] = await Promise.all([
                    Centro.find({}).skip(desde).limit(registropp),
                    Centro.countDocuments()
                ]);
            }
        }
        res.json({
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

/*
post / 
--> centro registrado
*/
const crearCentro = async(req, res = response) => {

    const { nombre, enfermedades } = req.body;


    try {
        // Solo el administrador puede hacer esta acción
        const token = req.header('x-token');
        if (!(infoToken(token).rol === 'ROL_ADMIN')) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para crear centros',
            });
        }

        // Comrprobar que no existe un usuario con ese email registrado
        const existeCentro = await Centro.findOne({ nombre });

        if (existeCentro) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe un centro con el mismo nombre'
            });
        }

        // Comprobamos la lista de alumnos que nos envían que existan
        let listaenfermedadesinsertar = [];
        // Si nos ha llegado lista de alumnos comprobar que existen y limpiar campos raros
        if (enfermedades) {
            await Promise.all(enfermedades.map(async(enfermedad) => {
                const existeEnfermedad = await Enfermedad.findById(enfermedad);
                if (!existeEnfermedad) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Una de las enfermedades no existe'
                    });
                }
                listaenfermedadesinsertar.push(existeEnfermedad);
            }));
            
        }
        
        const centro = new Centro(req.body);
        centro.enfermedades = listaenfermedadesinsertar;


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

const actualizarCentro = async(req, res = response) => {

    const { nombre, especialidad } = req.body;
    const uid = req.params.id;

    try {
        // Solo el administrador puede hacer esta acción
        const token = req.header('x-token');
        if (!(infoToken(token).rol === 'ROL_ADMIN')) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para actualizar centros',
            });
        }
        // Comrprobar que no existe un usuario con ese email registrado
        const existeCentro = await Centro.findById(uid);

        if (!existeCentro) {
            return res.status(400).json({
                ok: false,
                msg: 'El centro no existe'
            });
        }

        // Comrprobar que no existe un usuario con ese email registrado
        const existeCentron = await Centro.findOne({ nombre });

        if (existeCentron && (existeCentron._id != uid)) {
            return res.status(400).json({
                ok: false,
                msg: 'No se puede cambiar el nombre porque ya existe un centro con el mismo nombre'
            });
        }

        const centro = await Centro.findByIdAndUpdate(uid, req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Centro actualizado',
            centro
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando centro'
        });
    }
}

const borrarCentro = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // Solo el administrador puede hacer esta acción
        const token = req.header('x-token');
        if (!(infoToken(token).rol === 'ROL_ADMIN')) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para eliminar centros',
            });
        }

        // Comprobamos si existe el usuario que queremos borrar
        const existeCentro = await Centro.findById(uid);
        if (!existeCentro) {
            return res.status(400).json({
                ok: true,
                msg: 'El centro no existe'
            });
        }
        // Lo eliminamos y devolvemos el centro recien eliminado
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
            msg: 'Error borrando centro'
        });

    }
}



module.exports = { obtenerCentros, crearCentro, actualizarCentro, borrarCentro }