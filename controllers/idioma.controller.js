const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const Libro = require('../models/libro.model');
const Idioma = db.idioma;

const idiomaGet = async (req = request, res = response) => {

    try {
        const idioma = await Idioma.findAll();

        return res.status(200).send({
            idioma
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const idiomaPost = async (req = request, res) => {
    const { nombreIdioma } = req.body
    try {
        const idioma = await Idioma.create({
            nombreIdioma: nombreIdioma
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            idioma
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const idiomaPut = async (req = request, res) => {
    const { idIdioma, nombreIdioma } = req.body
    try {
        const idioma = await Idioma.update({
            nombreIdioma: nombreIdioma
        }, {
            where: {
                idIdioma: idIdioma
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            idioma
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const idiomaDelete = async (req, res) => {
    const { idIdioma } = req.body
    try {
        const libros = await Libro.count({
            where: {
                idIdioma: idIdioma
            }
        });

        let existenLibros = 0;

        if (libros > 0) {
            existenLibros = 1;
        } else {
            const idioma = await Idioma.destroy({
                where: {
                    idIdioma: idIdioma
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
    idiomaGet,
    idiomaPost,
    idiomaPut,
    idiomaDelete
}