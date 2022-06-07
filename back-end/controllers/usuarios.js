const Usuario = require('../models/usuarios');
const { validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');



const getUsuarios = async (req,res)=> {

    const usuarios = await Usuario.find({});

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios
    });

}

const crearUsuarios = async (req,res = response)=> {

    const { email, password, rol} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email: email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            });
        }

        const salt = bcrypt.genSaltSync();
        const cpassword = bcrypt.hashSync(password, salt);

        const usuario = new Usuario(req.body);
        usuario.password = cpassword;

        await usuario.save();

        res.json({
            ok: true,
            msg: 'Usuario creado',
            usuario
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

    const { password, email, ...object } = req.body;
    const uid= req.params.id;
    
    try {

        const existeEmail = await Usuario.findOne({email: email});    
        
        if(existeEmail){
            if(existeEmail.uid != uid){
                const valor = existeEmail.uid;

                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                });
            }
        }

        object.email = email;

        const usuario = await Usuario.findByIdAndUpdate(uid,object,{new: true});

        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario
        });
    
    } catch (error){
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando usuario'
        });
    }

}

const borrarUsuarios = async (req,res = response)=> {

    const uid = req.params.id;

    try {
        const existeUsuario = await Usuario.findById(uid);
        if(!existeUsuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        const resultado = await Usuario.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Eliminar usuarios',
            resultado
        });

    } catch (error){
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error eliminando usuario'
        });
    }

}


module.exports = {
    getUsuarios,crearUsuarios,actualizarUsuarios,borrarUsuarios
}