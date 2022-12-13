'Ruta: /api/usuario';

const { Router } = require('express');
const { usuarioGet, usuarioPut } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');

const { check } = require('express-validator');

const router = Router();


router.get('/', [validarJWT], [isPermisos(10)], usuarioGet);

router.put('/',[
    validarJWT,
    validarCampos,
    check('idUsuario', 'El id de Usuario es obligatorio.').notEmpty(),
    check('idUsuario', 'El id de Usuario es entero.').isInt(),
    check('idRol', 'El id de Rol es obligatorio.').notEmpty(),
    check('idRol', 'El id de Rol es entero.').isInt(),
    check('password', 'El password de Usuario es obligatorio.').notEmpty(),
    check('password', 'El password de Usuario es cadena de caracteres.').isString(),
    ] ,[isPermisos(10)], usuarioPut);

module.exports = router;