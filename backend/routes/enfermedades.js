/*
Ruta base: /api/grupos
*/
const { Router } = require('express');
const { obtenerEnfermedades, crearEnfermedad, actualizarEnfermedad, borrarEnfermedad } = require('../controllers/enfermedades');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
    // Campos opcionales que si vienen los validamos desde e id
    check('id', 'El id de la enfermedad debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    check('texto', 'El texto de búsqueda debe ser un texto').optional().trim(),
    validarCampos,
], obtenerEnfermedades);
router.post('/', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    validarCampos,
], crearEnfermedad);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], actualizarEnfermedad);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarEnfermedad);

module.exports = router;