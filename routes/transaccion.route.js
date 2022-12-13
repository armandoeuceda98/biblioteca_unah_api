'Ruta: /api/transaccion';

const { Router } = require('express');
const { transaccionGet, transaccionPut, transaccionPost, transaccionDelete } = require('../controllers/transaccion.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(11)], transaccionGet);
router.post('/', [
    validarJWT, [isPermisos(11)],
    check('nombreTransaccion', 'El nombre de Transaccion es obligatorio.').notEmpty(),
    check('nombreTransaccion', 'El nombre de Transaccion es cadena de caracteres.').isString(), 
    validarCampos], transaccionPost);
router.put('/', [
    validarJWT, [isPermisos(11)],
    check('idTransaccion', 'El id de Transaccion es obligatorio.').notEmpty(),
    check('idTransaccion', 'El id de Transaccion es entero.').isInt(),
    check('nombreTransaccion', 'El nombre de Transaccion es obligatorio.').notEmpty(),
    check('nombreTransaccion', 'El nombre de Transaccion es cadena de caracteres.').isString(), 
    validarCampos], transaccionPut);
router.delete('/', [
    validarJWT, [isPermisos(11)],
    check('idTransaccion', 'El id de Transaccion es obligatorio.').notEmpty(),
    check('idTransaccion', 'El id de Transaccion es entero.').isInt(),
    validarCampos], transaccionDelete);

module.exports = router;