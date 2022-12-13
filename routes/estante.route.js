'Ruta: /api/estante';

const { Router } = require('express');
const { estanteGet, estantePut, estantePost, estanteDelete } = require('../controllers/estante.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(8)], estanteGet);
router.post('/', [
    validarJWT, [isPermisos(8)],
    check('codigoEstante', 'El codigo del Estante es obligatorio.').notEmpty(),
    check('codigoEstante', 'El codigo del Estante es cadena de caracteres.').isString(),
    check('codigoInventario', 'La codigoInventario del Estante es obligatorio.').notEmpty(),
    check('codigoInventario', 'La codigoInventario del Estante es cadena de caracteres.').isString(),
    validarCampos], estantePost);
router.put('/', [
    validarJWT, [isPermisos(8)],
    check('idEstante', 'El id del Estante es obligatorio.').notEmpty(),
    check('idEstante', 'El id del Estante es entero.').isInt(),
    check('codigoEstante', 'El codigo del Estante es obligatorio.').notEmpty(),
    check('codigoEstante', 'El codigo del Estante es cadena de caracteres.').isString(),
    check('codigoInventario', 'La codigoInventario del Estante es obligatorio.').notEmpty(),
    check('codigoInventario', 'La codigoInventario del Estante es cadena de caracteres.').isString(),
    validarCampos], estantePut);
router.delete('/', [
    validarJWT, [isPermisos(8)],
    check('idEstante', 'El id del Estante es obligatorio.').notEmpty(),
    check('idEstante', 'El id del Estante es entero.').isInt(),
    validarCampos], estanteDelete);

module.exports = router;