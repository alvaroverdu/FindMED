/*
Ruta base: /api/cursos
*/

const { Router } = require('express');
const { obtenerCentros, crearCentro,actualizarCentro,borrarCentro} = require('../controllers/centros');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
    // Campos opcionales que si vienen los validamos desde e id
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    check('ubicacion', 'El argumento ubicacion es obligatorio').not().isEmpty().trim(),
    check('id', 'El id del curso debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    check('texto', 'El texto debe ser válido').optional().trim(),
    validarCampos
], obtenerCentros);
router.post('/', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    check('ubicacion', 'El argumento ubicacion es obligatorio').not().isEmpty().trim(),
    check('activo', 'El argumento activo es obligatorio y debe ser true/false').isBoolean(),
    validarCampos,
], crearCentro);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    check('ubicacion', 'El argumento ubicacion es obligatorio').not().isEmpty().trim(),
    check('activo', 'El argumento activo es obligatorio y debe ser true/false').isBoolean(),
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], actualizarCentro);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarCentro);

module.exports = router;