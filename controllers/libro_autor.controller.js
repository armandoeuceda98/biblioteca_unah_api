const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const LibroAutor = db.libroAutor;

const libroAutorGet = async (req = request, res = response) => {

    try {
        const libroAutor = await LibroAutor.findAll({
        });

        return res.status(200).send({
            libroAutor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroAutorPost = async (req = request, res) => {
    const { idAutor, idLibro } = req.body
    try {
        const libroAutor = await LibroAutor.create({
            idAutor: idAutor,
            idLibro: idLibro
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            libroAutor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroAutorDelete = async (req, res) => {
    const { id } = req.body
    try {
        const libroAutor = await LibroAutor.findOne({
            where: {
                id: id
            }   
        });

        libroAutor.destroy();
        
        return res.status(200).send({
            message: "Eliminado con éxito.",
            libroAutor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    libroAutorGet,
    libroAutorPost,
    libroAutorDelete
}