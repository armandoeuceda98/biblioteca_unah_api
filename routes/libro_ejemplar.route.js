'Ruta: /api/libroEjemplar';

const { Router } = require('express');
const { libroEjemplarGet, libroEjemplarPut, libroEjemplarPost, libroEjemplarDelete, libroEjemplarGetId } = require('../controllers/libro_ejemplar.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { isPermisos } = require('../middlewares/permisos.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/', [validarJWT],[isPermisos(7)], libroEjemplarGet);
router.get('/getId', [validarJWT],[isPermisos(7)], libroEjemplarGetId)
router.post('/', [
    validarJWT,[isPermisos(7)],
    check('idLibro', 'El id de LibroEjemplar es obligatorio.').notEmpty(),
    check('idLibro', 'El id de LibroEjemplar es entero.').isInt(),
    check('estado', 'El estado de LibroEjemplar es obligatorio.').notEmpty(),
    check('codigoBarras', 'El codigoBarras de LibroEjemplar es obligatorio.').notEmpty(),
    check('codigoBarras', 'El codigoBarras de LibroEjemplar es cadena de caracteres.').isString(),
    check('idEstante', 'El idEstante de LibroEjemplar es obligatorio.').notEmpty(),
    check('idEstante', 'El idEstante de LibroEjemplar es entero.').isInt(),
    check('observaciones', 'Las observaciones de LibroEjemplar es cadena de caracteres.').isString().optional(),
    check('repisa', 'El repisa de LibroEjemplar es obligatorio.').notEmpty(),
    check('repisa', 'El repisa de LibroEjemplar es entero.').isInt(),
    check('ladoEstante', 'El ladoEstante de LibroEjemplar es obligatorio.').notEmpty(),
    check('ladoEstante', 'El ladoEstante de LibroEjemplar es entero.').isString(),
    check('asignaturaTopografica', 'El asignaturaTopografica de LibroEjemplar es obligatorio.').notEmpty(),
    check('asignaturaTopografica', 'El asignaturaTopografica de LibroEjemplar es cadena de caracteres.').isString(),
    check('valorDolares', 'El valorDolares de LibroEjemplar es obligatorio.').notEmpty(),
    check('valorDolares', 'El valorDolares de LibroEjemplar es cadena de decimal.').isDecimal(),
    check('valorLempiras', 'El valorLempiras de LibroEjemplar es cadena de decimal.').isDecimal().optional(),
    validarCampos], libroEjemplarPost);
router.put('/', [
    validarJWT,[isPermisos(7)],
    check('idLibroEjemplar', 'El id de LibroEjemplar es obligatorio.').notEmpty(),
    check('idLibroEjemplar', 'El id de LibroEjemplar es entero.').isInt(),
    check('idLibro', 'El id de LibroEjemplar es obligatorio.').notEmpty(),
    check('idLibro', 'El id de LibroEjemplar es entero.').isInt(),
    check('estado', 'El estado de LibroEjemplar es obligatorio.').notEmpty(),
    check('codigoBarras', 'El codigoBarras de LibroEjemplar es obligatorio.').notEmpty(),
    check('codigoBarras', 'El codigoBarras de LibroEjemplar es cadena de caracteres.').isString(),
    check('idEstante', 'El idEstante de LibroEjemplar es obligatorio.').notEmpty(),
    check('idEstante', 'El idEstante de LibroEjemplar es entero.').isInt(),
    check('observaciones', 'Las observaciones de LibroEjemplar es obligatorio.').notEmpty(),
    check('observaciones', 'Las observaciones de LibroEjemplar es cadena de caracteres.').isString(),
    check('repisa', 'El repisa de LibroEjemplar es obligatorio.').notEmpty(),
    check('repisa', 'El repisa de LibroEjemplar es entero.').isInt(),
    check('ladoEstante', 'El ladoEstante de LibroEjemplar es obligatorio.').notEmpty(),
    check('ladoEstante', 'El ladoEstante de LibroEjemplar es entero.').isString(),
    check('asignaturaTopografica', 'El asignaturaTopografica de LibroEjemplar es obligatorio.').notEmpty(),
    check('asignaturaTopografica', 'El asignaturaTopografica de LibroEjemplar es cadena de caracteres.').isString(),
    check('valorDolares', 'El valorDolares de LibroEjemplar es obligatorio.').notEmpty(),
    check('valorDolares', 'El valorDolares de LibroEjemplar es cadena de decimal.').isDecimal(),
    check('valorLempiras', 'El valorLempiras de LibroEjemplar es cadena de decimal.').isDecimal().optional(),
    validarCampos], libroEjemplarPut);
router.delete('/', [
    validarJWT,[isPermisos(7)],
    check('idLibroEjemplar', 'El id de LibroEjemplar es obligatorio.').notEmpty(),
    check('idLibroEjemplar', 'El id de LibroEjemplar es entero.').isInt(),
    validarCampos], libroEjemplarDelete);

module.exports = router;