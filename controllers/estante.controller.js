const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const LibroEjemplar = require('../models/libro_ejemplar.model');
const Estante = db.estante;

const estanteGet = async (req = request, res = response) => {

    try {
        const estante = await Estante.findAll();

        return res.status(200).send({
            estante
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const estantePost = async (req = request, res) => {
    const { codigoEstante, codigoInventario } = req.body
    try {
        const estante = await Estante.create({
            codigoEstante: codigoEstante,
            codigoInventario: codigoInventario
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            estante
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const estantePut = async (req = request, res) => {
    const { idEstante, codigoEstante, codigoInventario } = req.body
    try {
        const estante = await Estante.update({
            codigoEstante: codigoEstante,
            codigoInventario: codigoInventario
        }, {
            where: {
                idEstante: idEstante
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            estante
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const estanteDelete = async (req, res) => {
    const { idEstante } = req.body
    try {
        const libros = await LibroEjemplar.count({
            where: {
                idEstante: idEstante
            }
        });

        let existenLibros = 0;

        if (libros > 0) {
            existenLibros = 1;
        } else {
            const estante = await Estante.destroy({
                where: {
                    idEstante: idEstante
                }
            });
        }

        return res.status(200).send({
            existenLibros
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    estanteGet,
    estantePost,
    estantePut,
    estanteDelete
}