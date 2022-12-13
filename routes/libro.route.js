'Ruta: /api/libro';

const { Router } = require('express');
const { libroGet, libroPut, libroPost, libroDelete, libroGetId, datosLibroGet, libroGetNombre, libroGetAutor, libroGetEditorial } = require('../controllers/libro.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/',[validarJWT],[isPermisos(12)], libroGet);

router.get('/getId', [validarJWT],[isPermisos(12)], libroGetId);

router.post('/getNombre', [
    validarJWT,
    check('tituloLibro', 'El titulo de Libro es obligatorio.').notEmpty(),
    check('tituloLibro', 'El titulo de Libro es cadena de caracteres.').isString(),
    ],[isPermisos(12)], libroGetNombre);

router.post('/getAutor', [
    validarJWT,
    check('nombreAutor', 'El nombre de Autor es obligatorio.').notEmpty(),
    check('nombreAutor', 'El nombre de Autor es cadena de caracteres.').isString(),
    ],[isPermisos(12)], libroGetAutor);

router.post('/getEditorial', [
    validarJWT,
    check('nombreEditorial', 'El nombre de Editorial es obligatorio.').notEmpty(),
    check('nombreEditorial', 'El nombre de Editorial es cadena de caracteres.').isString(),
    ],[isPermisos(12)], libroGetEditorial);

router.get('/datosLibroGet', [validarJWT],[isPermisos(12)], datosLibroGet);

router.post('/', [
    validarJWT, [isPermisos(6)],
    check('tituloLibro', 'El titulo de Libro es obligatorio.').notEmpty(),
    check('tituloLibro', 'El titulo de Libro es cadena de caracteres.').isString(), 
    check('idColeccion', 'El id de Libro es obligatorio.').notEmpty(),
    check('idColeccion', 'El id de Libro es entero.').isInt(),
    check('idEdicion', 'El id de Libro es obligatorio.').notEmpty(),
    check('idEdicion', 'El id de Libro es entero.').isInt(),
    check('ISBN13', 'El ISBN13 de Libro es obligatorio.').notEmpty(),
    check('ISBN13', 'El ISBN13 de Libro es cadena de caracteres.').isString(),
    check('ISBN16', 'El ISBN16 de Libro es cadena de caracteres.').isString().optional(),
    check('año', 'El año de Libro es obligatorio.').notEmpty(),
    check('año', 'El año de Libro es entero.').isInt(),
    check('idIdioma', 'El idIdioma de Libro es obligatorio.').notEmpty(),
    check('idIdioma', 'El idIdioma de Libro es entero.').isInt(),
    validarCampos], libroPost);

router.put('/', [
    validarJWT, [isPermisos(6)],
    check('idLibro', 'El id de Libro es obligatorio.').notEmpty(),
    check('idLibro', 'El id de Libro es entero.').isInt(),
    check('tituloLibro', 'El titulo de Libro es obligatorio.').notEmpty(),
    check('tituloLibro', 'El titulo de Libro es cadena de caracteres.').isString(), 
    check('idColeccion', 'El id de Libro es obligatorio.').notEmpty(),
    check('idColeccion', 'El id de Libro es entero.').isInt(),
    check('idEdicion', 'El id de Libro es obligatorio.').notEmpty(),
    check('idEdicion', 'El id de Libro es entero.').isInt(),
    check('ISBN13', 'El ISBN13 de Libro es obligatorio.').notEmpty(),
    check('ISBN13', 'El ISBN13 de Libro es cadena de caracteres.').isString(),
    check('ISBN16', 'El ISBN16 de Libro es cadena de caracteres.').isString().optional(),
    check('año', 'El año de Libro es obligatorio.').notEmpty(),
    check('año', 'El año de Libro es entero.').isInt(),
    check('idIdioma', 'El idIdioma de Libro es obligatorio.').notEmpty(),
    check('idIdioma', 'El idIdioma de Libro es entero.').isInt(),
    validarCampos], libroPut);
    
router.delete('/', [
    validarJWT, [isPermisos(6)],
    check('idLibro', 'El id de Libro es obligatorio.').notEmpty(),
    check('idLibro', 'El id de Libro es entero.').isInt(),
    validarCampos], libroDelete);


module.exports = router;