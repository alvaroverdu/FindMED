/*
Ruta base: /api/usuarios
*/

const { Router } = require('express');
const {getUsuarios,crearUsuarios} = require('../controllers/usuarios') 
const { check } = require('express-validator');


const router = Router();

router.get('/' , getUsuarios);

router.post('/', [
    check('nombre','El argumento nombre es obligatorio').notEmpty(),
    check('password','El argumento password es obligatorio').notEmpty(),
    check('email','El argumento email es obligatorio').notEmpty()

    ], crearUsuarios);

module.exports = router;