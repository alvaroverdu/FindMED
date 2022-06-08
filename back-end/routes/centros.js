/*
Ruta base: /api/centros
*/

const { Router } = require('express');
const { obtenerCentros, crearCentro, actualizarCentro, borrarCentro } = require('../controllers/centros');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, obtenerCentros);

router.post('/', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCentro);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], actualizarCentro);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarCentro);

module.exports = router;