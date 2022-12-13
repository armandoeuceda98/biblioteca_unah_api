'Ruta: /api/libroEditorial';

const { Router } = require('express');
const { libroEditorialGet, libroEditorialPost, libroEditorialDelete } = require('../controllers/libro_editorial.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT], libroEditorialGet);
router.post('/', [
    validarJWT, 
    check('idLibro', 'El id de Libro es obligatorio.').notEmpty(),
    check('idLibro', 'El id de Libro es entero.').isInt(),
    check('idEditorial', 'El id de Editorial es obligatorio.').notEmpty(),
    check('idEditorial', 'El id de Editorial es entero.').isInt(),
    validarCampos], libroEditorialPost);
router.delete('/', [
    validarJWT, 
    check('id', 'El id de LibroEditorial es obligatorio.').notEmpty(),
    check('id', 'El id de LibroEditorial es entero.').isInt(),
    validarCampos], libroEditorialDelete);

module.exports = router;