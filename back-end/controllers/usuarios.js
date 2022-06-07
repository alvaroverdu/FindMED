const Usuario = require('../models/usuarios');


const getUsuarios = async (req,res)=> {

    const usuarios = await Usuario.find({});

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios
    });

}

const crearUsuarios = async (req,res)=> {

    const usuarios = await Usuario.find({});

    res.json({
        ok: true,
        msg: 'crearUsuarios'
    });

}


module.exports = {
    getUsuarios,crearUsuarios
}