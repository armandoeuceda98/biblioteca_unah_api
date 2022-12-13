'Ruta: /api/rol';

const { Router } = require('express');
const { rolGet, rolPut, rolPost, rolDelete } = require('../controllers/rol.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(9)], rolGet);
router.post('/', [
    validarJWT, [isPermisos(9)],
    check('nombreRol', 'El nombre de Rol es obligatorio.').notEmpty(),
    check('nombreRol', 'El nombre de Rol es cadena de caracteres.').isString(), 
    validarCampos], rolPost);
router.put('/', [
    validarJWT,[isPermisos(9)],
    check('idRol', 'El id de Rol es obligatorio.').notEmpty(),
    check('idRol', 'El id de Rol es entero.').isInt(), 
    check('nombreRol', 'El nombre de Rol es obligatorio.').notEmpty(),
    check('nombreRol', 'El nombre de Rol es cadena de caracteres.').isString(), 
    validarCampos], rolPut);
router.delete('/', [
    validarJWT, [isPermisos(9)],
    check('idRol', 'El id de Rol es obligatorio.').notEmpty(),
    check('idRol', 'El id de Rol es entero.').isInt(), 
    validarCampos], rolDelete);

module.exports = router;