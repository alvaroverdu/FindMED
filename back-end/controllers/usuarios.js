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

    const {email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email: email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            });
        }

        res.json({
            ok: true,
            msg: 'crearUsuarios'
        });
    

    } catch (error){
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando usuario'
        });
    }
   
}

const actualizarUsuarios = async (req,res)=> {

    res.json({
        ok: true,
        msg: 'actualizarUsuarios'
    });

}

const borrarUsuarios = async (req,res)=> {

    res.json({
        ok: true,
        msg: 'borrarUsuarios'
    });

}


module.exports = {
    getUsuarios,crearUsuarios,actualizarUsuarios,borrarUsuarios
}