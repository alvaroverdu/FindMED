const Usuario = require('../models/usuarios');
const { validationResult } = require('express-validator');


const getUsuarios = async (req,res)=> {

    const usuarios = await Usuario.find({});

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios
    });

}

const crearUsuarios = async (req,res)=> {

    const erroresVal = validationResult(req);

    if(!erroresVal.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: erroresVal.mapped()
        });
    }

    res.json({
        ok: true,
        msg: 'crearUsuarios'
    });

}


module.exports = {
    getUsuarios,crearUsuarios
}