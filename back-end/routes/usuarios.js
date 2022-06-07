/*
Ruta base: /api/usuarios
*/

const { Router } = require('express');
const {getUsuarios,crearUsuarios,actualizarUsuarios,borrarUsuarios} = require('../controllers/usuarios') 
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarRol } = require('../middleware/validar-rol');


const router = Router();

router.get('/' , getUsuarios);

router.post('/', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('password', 'El argumento password es obligatorio').not().isEmpty(),
    validarCampos,
    validarRol
  
], crearUsuarios);

router.put('/:id', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
    validarRol
    
], actualizarUsuarios);

router.delete('/:id', [
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos
], borrarUsuarios);

module.exports = router;