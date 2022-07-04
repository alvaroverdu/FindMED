const { response } = require('express');

const Enfermedad= require('../models/enfermedades');
const Sintoma= require('../models/sintomas');


const { infoToken } = require('../helpers/infotoken');

const obtenerEnfermedades = async(req, res = repsonse) => {

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
        let enfermedades, total;
        if (id) {
            [enfermedades, total] = await Promise.all([
                Enfermedad.findById(id),
                Enfermedad.countDocuments()
            ]);
        } else {
            if (texto) {
                [enfermedades, total] = await Promise.all([
                    Enfermedad.find({ $or: [{ nombre: textoBusqueda }] }).skip(desde).limit(registropp),
                    Enfermedad.countDocuments({ $or: [{ nombre: textoBusqueda }] })
                ]);
            } else {
                [enfermedades, total] = await Promise.all([
                    Enfermedad.find({}).skip(desde).limit(registropp),
                    Enfermedad.countDocuments()
                ]);
            }
        }
        res.json({
            ok: true,
            msg: 'obtenerEnfermedades',
            enfermedades,
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
            msg: 'Error al obtener enfermedades'
        });
    }
}


const crearEnfermedad = async(req, res = response) => {

    const { nombre, sintomas } = req.body;

    // Solo puede crear usuarios un admin
    const token = req.header('x-token');
    // lo puede actualizar un administrador o el propio usuario del token
    if (!(infoToken(token).rol === 'ROL_ADMIN')) {
        return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para crear enfermedades',
        });
    }

    try {

        // Comrprobar que no existe un gurpo en ese mismo curso con ese nombre
        const existeEnfermedad = await Enfermedad.findOne({ nombre });
        if (existeEnfermedad) {
            return res.status(400).json({
                ok: false,
                msg: 'La enfermedad ya existe en le mismo curso'
            });
        }

        // Comprobamos la lista de alumnos que nos envían que existan
        let listasintomasinsertar = [];
        // Si nos ha llegado lista de alumnos comprobar que existen y limpiar campos raros
        if (sintomas) {
            await Promise.all(sintomas.map(async(sintoma) => {
                const existeSintoma = await Sintoma.findById(sintoma);
                if (!existeSintoma) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Uno de los sintomas no existe'
                    });
                }
                listasintomasinsertar.push(existeSintoma);
            }));
            
        }

        const enfermedad = new Enfermedad(req.body);
        enfermedad.sintomas = listasintomasinsertar;

        // Almacenar en BD
        await enfermedad.save();

        res.json({
            ok: true,
            msg: 'Enfermedad creada',
            enfermedad,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando enfermedad'
        });
    }
}

const actualizarEnfermedad = async(req, res) => {

    const { nombre, sintomas } = req.body;
    const uid = req.params.id;

    // Solo puede crear usuarios un admin
    const token = req.header('x-token');
    // lo puede actualizar un administrador o el propio usuario del token
    if (!(infoToken(token).rol === 'ROL_ADMIN')) {
        return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para actualizar enfermedades',
        });
    }

    try {

        const existeEnfermedad = await Enfermedad.findById(uid);
        if (!existeEnfermedad) {
            return res.status(400).json({
                ok: false,
                msg: 'La enfermedad no existe'
            });
        }

       // Comprobamos la lista de alumnos que nos envían que existan
       let listasintomasinsertar = [];
       // Si nos ha llegado lista de alumnos comprobar que existen y limpiar campos raros
       if (sintomas) {
           await Promise.all(sintomas.map(async(sintoma) => {
               const existeSintoma = await Sintoma.findById(sintoma);
               if (!existeSintoma) {
                   return res.status(400).json({
                       ok: false,
                       msg: 'Uno de los sintomas no existe'
                   });
               }
               listasintomasinsertar.push(existeSintoma);
           }));
           
       }


       let object = req.body;
       object.sintomas = listasintomasinsertar;

        const enfermedad = await Enfermedad.findByIdAndUpdate(uid, object, { new: true });
        res.json({
            ok: true,
            msg: 'Enfermedad actualizada',
            enfermedad
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando enfermedad'
        });
    }
}

const borrarEnfermedad = async(req, res = response) => {

    const uid = req.params.id;

    // Solo puede crear usuarios un admin
    const token = req.header('x-token');
    // lo puede actualizar un administrador o el propio usuario del token
    if (!(infoToken(token).rol === 'ROL_ADMIN')) {
        return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para eliminar enfermedades',
        });
    }

    try {
        // Comprobamos si existe la enfermedad que queremos borrar
        const existeEnfermedad = await Enfermedad.findById(uid);
        if (!existeEnfermedad) {
            return res.status(400).json({
                ok: true,
                msg: 'La enfermedad no existe'
            });
        }
        // Lo eliminamos y devolvemos el usuaurio recien eliminado
        const resultado = await Enfermedad.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Enfermedad eliminada',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error eliminando enfermedad'
        });

    }
}

module.exports = { obtenerEnfermedades, crearEnfermedad, actualizarEnfermedad, borrarEnfermedad }