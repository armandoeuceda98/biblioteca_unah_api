'Ruta: /api/edicion';

const { Router } = require('express');
const { edicionGet, edicionPut, edicionPost, edicionDelete } = require('../controllers/edicion.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(2)], edicionGet);
router.post('/', [
    validarJWT, [isPermisos(2)],
    check('nombreEdicion', 'El nombre del edición es cadena de caracteres.').isString(),
    validarCampos], edicionPost);
router.put('/', [
    validarJWT, [isPermisos(2)],
    check('idEdicion', 'El id de la edición es obligatorio.').notEmpty(), 
    check('idEdicion', 'El id de la edición es entero.').isInt(), 
    check('nombreEdicion', 'El nombre de la edición es obligatorio.').notEmpty(), 
    check('nombreEdicion', 'El nombre del edición es cadena de caracteres.').isString(),
    validarCampos], edicionPut);
router.delete('/', [
    validarJWT, [isPermisos(2)],
    check('idEdicion', 'El id de la edición es obligatorio.').notEmpty(), 
    check('idEdicion', 'El id de la edición es entero.').isInt(), 
    validarCampos], edicionDelete);

module.exports = router;