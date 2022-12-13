'Ruta: /api/rolPermiso';

const { Router } = require('express');
const { rolPermisoGet, rolPermisoPost, rolPermisoDelete } = require('../controllers/rol_permiso.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT], rolPermisoGet);
router.post('/', [
    validarJWT, 
    check('idRol', 'El idRol de Rol es obligatorio.').notEmpty(),
    check('idRol', 'El idRol de Rol es entero.').isInt(), 
    check('idPermiso', 'El idPermiso de Permiso es obligatorio.').notEmpty(),
    check('idPermiso', 'El idPermiso de Permiso es entero.').isInt(),
    validarCampos], rolPermisoPost);
router.delete('/', [
    validarJWT, 
    check('id', 'El id de RolPermiso es obligatorio.').notEmpty(),
    check('id', 'El id de RolPermiso es entero.').isInt(),
    validarCampos], rolPermisoDelete);

module.exports = router;