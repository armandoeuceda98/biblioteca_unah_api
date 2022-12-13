'Ruta: /api/idioma';

const { Router } = require('express');
const { idiomaGet, idiomaPut, idiomaPost, idiomaDelete } = require('../controllers/idioma.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(3)], idiomaGet);
router.post('/', [
    validarJWT, [isPermisos(3)],
    check('nombreIdioma', 'El nombre del Idioma es obligatorio.').notEmpty(),
    check('nombreIdioma', 'El nombre del Idioma es cadena de caracteres.').isString(),
    validarCampos], idiomaPost);
router.put('/', [
    validarJWT, [isPermisos(3)],
    check('idIdioma', 'El id del Idioma es obligatorio.').notEmpty(),
    check('idIdioma', 'El id del Idioma es entero.').isInt(),
    check('nombreIdioma', 'El nombre del Idioma es obligatorio.').notEmpty(),
    check('nombreIdioma', 'El nombre del Idioma es cadena de caracteres.').isString(),
    validarCampos], idiomaPut);
router.delete('/', [
    validarJWT, [isPermisos(3)],
    check('idIdioma', 'El id del Idioma es obligatorio.').notEmpty(),
    check('idIdioma', 'El id del Idioma es entero.').isInt(),
    validarCampos], idiomaDelete);

module.exports = router;