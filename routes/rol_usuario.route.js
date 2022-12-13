// No usar
'Ruta: /api/rolUsuario';

const { Router } = require('express');
const { rolUsuarioGet, rolUsuarioPost, rolUsuarioDelete } = require('../controllers/rol_usuario.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT], rolUsuarioGet);
router.post('/', [
    validarJWT, 
    check('idRol', 'El idRol de RolUsuario es obligatorio.').notEmpty(),
    check('idRol', 'El idRol de RolUsuario es entero.').isInt(), 
    check('idUsuario', 'El idUsuario de RolUsuario es obligatorio.').notEmpty(),
    check('idUsuario', 'El idUsuario de RolUsuario es entero.').isInt(),
    validarCampos], rolUsuarioPost);
router.delete('/', [
    validarJWT, 
    check('id', 'El id de RolUsuario es obligatorio.').notEmpty(),
    check('id', 'El id de RolUsuario es entero.').isInt(),
    validarCampos], rolUsuarioDelete);

module.exports = router;