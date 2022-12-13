const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const Libro = require('../models/libro.model');
const LibroEditorial = require('../models/libro_editorial.model');
const Editorial = db.editorial;

const editorialGet = async (req = request, res = response) => {

    try {
        const editorial = await Editorial.findAll();

        return res.status(200).send({
            editorial
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const editorialPost = async (req = request, res) => {
    const { nombreEditorial } = req.body
    try {
        const editorial = await Editorial.create({
            nombreEditorial: nombreEditorial
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            editorial
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const editorialPut = async (req = request, res) => {
    const { nombreEditorial, idEditorial } = req.body
    try {
        const editorial = await Editorial.update({
            nombreEditorial: nombreEditorial
        }, {
            where: {
                idEditorial: idEditorial
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            editorial
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const editorialDelete = async (req, res) => {
    const { idEditorial } = req.body
    try {
        const librosEditorial = await LibroEditorial.count({
            where: {
                idEditorial: idEditorial
            }
        });
        
        let tieneLibros = 0;
        if (librosEditorial > 0) {
            tieneLibros = 1;
        } else {
            tieneLibros = 0;
            const editorial = await Editorial.destroy({
                where: {
                    idEditorial: idEditorial
                }
            });
        }

        return res.status(200).send({
            tieneLibros
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    editorialGet,
    editorialPost,
    editorialPut,
    editorialDelete
}