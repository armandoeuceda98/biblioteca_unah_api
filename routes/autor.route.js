'Ruta: /api/autor';

const { Router } = require('express');
const { autorGet, autorPut, autorPost, autorDelete} = require('../controllers/autor.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(5)], autorGet);
router.post('/', [
    validarJWT, [isPermisos(5)],
    check('nombreAutor', 'El nombre del autor es obligatorio.').notEmpty(), 
    check('nombreAutor', 'El nombre del autor debe ser texto.').isString(), 
    check('claveAutor', 'La clave del autor es obligatorio.').notEmpty(), 
    validarCampos], autorPost);
router.put('/', [
    validarJWT, [isPermisos(5)],
    check('idAutor', 'El id del autor es obligatorio.').notEmpty(),
    check('idAutor', 'El id del autor es entero.').isInt(),
    check('nombreAutor', 'El nombre del autor es obligatorio.').notEmpty(), 
    check('nombreAutor', 'El nombre del autor debe ser texto.').isString(), 
    check('claveAutor', 'La clave del autor es obligatorio.').notEmpty(), 
    validarCampos], autorPut);
router.delete('/', [
    validarJWT, [isPermisos(5)],
    check('idAutor', 'El id del autor es obligatorio.').notEmpty(),
    check('idAutor', 'El id del autor es entero.').isInt(),
    validarCampos], autorDelete);

module.exports = router;