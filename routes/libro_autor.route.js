'Ruta: /api/libroAutor';

const { Router } = require('express');
const { libroAutorGet, libroAutorPost, libroAutorDelete } = require('../controllers/libro_autor.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT], libroAutorGet);
router.post('/', [
    validarJWT, 
    check('idLibro', 'El id de Libro es obligatorio.').notEmpty(),
    check('idLibro', 'El id de Libro es entero.').isInt(),
    check('idAutor', 'El id de Autor es obligatorio.').notEmpty(),
    check('idAutor', 'El id de Autor es entero.').isInt(),
    validarCampos], libroAutorPost);
router.delete('/', [
    validarJWT, 
    check('id', 'El id de LibroAutor es obligatorio.').notEmpty(),
    check('id', 'El id de LibroAutor es entero.').isInt(),
    validarCampos], libroAutorDelete);

module.exports = router;