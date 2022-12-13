const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const LibroEditorial = db.libroEditorial;

const libroEditorialGet = async (req = request, res = response) => {

    try {
        const libroEditorial = await LibroEditorial.findAll({
        });

        return res.status(200).send({
            libroEditorial
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroEditorialPost = async (req = request, res) => {
    const { idLibro, idEditorial } = req.body
    try {
        const libroEditorial = await LibroEditorial.create({
            idLibro: idLibro,
            idEditorial: idEditorial
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            libroEditorial
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroEditorialDelete = async (req, res) => {
    const { id } = req.body
    try {
        const libroEditorial = await LibroEditorial.findOne({
            where: {
                id: id
            }   
        });

        libroEditorial.destroy();

        return res.status(200).send({
            message: "Eliminado con éxito.",
            libroEditorial
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    libroEditorialGet,
    libroEditorialPost,
    libroEditorialDelete
}