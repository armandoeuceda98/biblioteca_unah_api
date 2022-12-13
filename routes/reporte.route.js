'Ruta: /api/reporte';

const { Router } = require('express');
const { cantidadLibrosBiblioteca, cantidadLibrosColecciones, valorLibrosColeccion, cantidadLibrosEstante,
    cantidadLibrosColeccionById, valorLibrosColeccionById, cantidadLibrosEstanteById, valorLibrosEstantes } = require('../controllers/reporte.controller');
const { validarJWT } = require('../middlewares/validarJWT.middleware');
const { validarCampos } = require('../middlewares/validarcampos.middleware');
const { check } = require('express-validator');

const router = Router();

router.get('/getCantidadLibrosBiblioteca', [validarJWT], cantidadLibrosBiblioteca);
router.get('/getCantidadLibrosColeccion', [validarJWT], cantidadLibrosColecciones);

router.post('/getCantidadLibrosColeccionById', [
    validarJWT,
    check('idColeccion', 'El id de Coleccion es obligatorio.').notEmpty(),
    check('idColeccion', 'El id de Coleccion es entero.').isInt(),
    validarCampos], cantidadLibrosColeccionById);

router.get('/getValorLibrosColeccion', [validarJWT], valorLibrosColeccion);
router.post('/getValorLibrosColeccionById', [
    validarJWT,
    check('idColeccion', 'El id de Coleccion es obligatorio.').notEmpty(),
    check('idColeccion', 'El id de Coleccion es entero.').isInt(),
    validarCampos], valorLibrosColeccionById);
router.get('/getCantidadLibrosEstante', [validarJWT], cantidadLibrosEstante);
router.post('/getCantidadLibrosEstanteById', [
    validarJWT,
    check('idEstante', 'El id de Estante es obligatorio.').notEmpty(),
    check('idEstante', 'El id de Estante es entero.').isInt(),
    validarCampos], cantidadLibrosEstanteById);

router.post('/getValorLibrosEstanteById', [
    validarJWT,
    check('idEstante', 'El id de Estante es obligatorio.').notEmpty(),
    check('idEstante', 'El id de Estante es entero.').isInt(),
    validarCampos], valorLibrosEstantes);

module.exports = router;