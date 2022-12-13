'Ruta: /api/coleccion';

const { Router } = require('express');
const { coleccionGet, coleccionPut, coleccionPost, coleccionDelete } = require('../controllers/coleccion.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(1)], coleccionGet);
router.post('/', [
    validarJWT,[isPermisos(1)],
    check('nombreColeccion', 'El nombre de la colección es obligatorio.').notEmpty(), 
    validarCampos], coleccionPost);
router.put('/', [
    validarJWT,[isPermisos(1)],
    check('idColeccion', 'El id de colección es obligatorio.').notEmpty(),
    check('idColeccion', 'El id de colección es entero.').isInt(),
    check('nombreColeccion', 'El nombre de la colección es obligatorio.').notEmpty(), 
    validarCampos], coleccionPut);
router.delete('/', [
    validarJWT,[isPermisos(1)],
    check('idColeccion', 'El id de colección es obligatorio.').notEmpty(),
    check('idColeccion', 'El id de colección es entero.').isInt(),
    validarCampos], coleccionDelete);

module.exports = router;