'Ruta: /api/permiso';

const { Router } = require('express');
const { permisoGet, permisoPut, permisoPost, permisoDelete } = require('../controllers/permiso.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT], permisoGet);
router.post('/', [
    validarJWT, 
    check('nombrePermiso', 'El nombre de Permiso es obligatorio.').notEmpty(),
    check('nombrePermiso', 'El nombre de Permiso es cadena de caracteres.').isString(),
    validarCampos, ], permisoPost);
router.put('/', [
    validarJWT, 
    check('idPermiso', 'El id de Permiso es obligatorio.').notEmpty(),
    check('idPermiso', 'El id de Permiso es entero.').isInt(),
    check('nombrePermiso', 'El nombre de Permiso es obligatorio.').notEmpty(),
    check('nombrePermiso', 'El nombre de Permiso es cadena de caracteres.').isString(),
    validarCampos, ], permisoPut);
router.delete('/', [
    validarJWT, 
    check('idPermiso', 'El id de Permiso es obligatorio.').notEmpty(),
    check('idPermiso', 'El id de Permiso es entero.').isInt(),
    validarCampos, ], permisoDelete);

module.exports = router;