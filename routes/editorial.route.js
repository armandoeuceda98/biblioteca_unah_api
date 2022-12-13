'Ruta: /api/editorial';

const { Router } = require('express');
const { editorialGet, editorialPut, editorialPost, editorialDelete } = require('../controllers/editorial.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(4)], editorialGet);
router.post('/', [
    validarJWT, [isPermisos(4)],
    check('nombreEditorial', 'El nombre del Editorial es obligatorio.').notEmpty(),
    check('nombreEditorial', 'El nombre del Editorial es cadena de caracteres.').isString(),
    validarCampos], editorialPost);
router.put('/', [
    validarJWT, [isPermisos(4)],
    check('idEditorial', 'El id del Editorial es obligatorio.').notEmpty(),
    check('idEditorial', 'El id del Editorial es entero.').isInt(),
    check('nombreEditorial', 'El nombre del Editorial es obligatorio.').notEmpty(),
    check('nombreEditorial', 'El nombre del Editorial es cadena de caracteres.').isString(),
    validarCampos], editorialPut);
router.delete('/', [
    validarJWT, [isPermisos(4)],
    check('idEditorial', 'El id del Editorial es obligatorio.').notEmpty(),
    check('idEditorial', 'El id del Editorial es entero.').isInt(),
    validarCampos], editorialDelete);

module.exports = router;