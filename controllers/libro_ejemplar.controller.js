const { request, response } = require('express');
const Audilog = require('../models/audilog.model');

const db = require('../models/biblioteca/index');
const Coleccion = require('../models/coleccion.model');
const Libro = require('../models/libro.model');
const LibroEjemplar = db.libroEjemplar;
const Estante = db.estante;

const libroEjemplarGet = async (req = request, res = response) => {

    try {
        const libroEjemplar = await LibroEjemplar.findAll({
            where: {
                isDeleted: false
            }
        });

        return res.status(200).send({
            libroEjemplar
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
const libroEjemplarGetId = async (req = request, res = response) => {

    const { idLibro } = req.query;
    try {
        const libroEjemplar = await LibroEjemplar.findAll({
            where: {
                isDeleted: false,
                idLibro: idLibro
            },
            include: Estante
        });

        if (!libroEjemplar) {
            return res.status(404).json({
                msg: "El libro no existe"
            })
        }
        return res.status(200).send({
            libroEjemplar
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroEjemplarPost = async (req = request, res) => {
    const uid = req.uid;
    const { idLibro, estado, codigoBarras, idEstante, observaciones,
        ladoEstante, repisa, asignaturaTopografica, valorDolares, valorLempiras } = req.body

    try {
        const libroEjemplar = await LibroEjemplar.create({
            idLibro: idLibro,
            estado: estado,
            codigoBarras: codigoBarras,
            idEstante: idEstante,
            ladoEstante: ladoEstante,
            idUsuario: uid,
            observaciones: observaciones,
            repisa: repisa,
            asignaturaTopografica: asignaturaTopografica,
            valorDolares: valorDolares,
            valorLempiras: valorLempiras
        });

        const nuevoAudilog = await Audilog.create({
            descripcion: 'Creación de nuevo ejemplar de libro con id: ' + libroEjemplar.idLibroEjemplar,
            idUsuario: uid,
            idTransaccion: 1
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            libroEjemplar,
            nuevoAudilog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroEjemplarPut = async (req = request, res) => {
    const uid = req.uid;
    const { idLibroEjemplar, idLibro, estado, codigoBarras, idEstante, observaciones, repisa, asignaturaTopografica, valorDolares, valorLempiras } = req.body
    try {
        const libroEjemplar = await LibroEjemplar.update({
            idLibro: idLibro,
            estado: estado,
            codigoBarras: codigoBarras,
            idEstante: idEstante,
            idUsuario: uid,
            observaciones: observaciones,
            repisa: repisa,
            valorDolares: valorDolares,
            valorLempiras: valorLempiras,
            asignaturaTopografica: asignaturaTopografica,
        }, {
            where: {
                idLibroEjemplar: idLibroEjemplar
            }
        });

        const nuevoAudilog = await Audilog.create({
            descripcion: 'Actualización ejemplar de libro con id: ' + idLibroEjemplar,
            idUsuario: uid,
            idTransaccion: 2
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            libroEjemplar,
            nuevoAudilog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroEjemplarDelete = async (req, res) => {
    const uid = req.uid;
    const { idLibroEjemplar } = req.body
    try {
        const libroEjemplar = await LibroEjemplar.update({
            isDeleted: 1
        }, {
            where: {
                idLibroEjemplar: idLibroEjemplar
            }
        });

        const nuevoAudilog = await Audilog.create({
            descripcion: 'Eliminación ejemplar de libro con id: ' + idLibroEjemplar,
            idUsuario: uid,
            idTransaccion: 3
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            libroEjemplar,
            nuevoAudilog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    libroEjemplarGet,
    libroEjemplarPost,
    libroEjemplarPut,
    libroEjemplarDelete,
    libroEjemplarGetId,
}