const { request, response } = require('express');
const { ValidationError } = require('sequelize');

const db = require('../models/biblioteca/index');
const Libro = require('../models/libro.model');
const Coleccion = db.coleccion;

const coleccionGet = async (req = request, res = response) => {

    try {
        const coleccion = await Coleccion.findAll();

        return res.status(200).send({
            coleccion
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status).send({
            message: "Ocurrio un error" + error
        });
    }
}

const coleccionPost = async (req = request, res) => {
    const { nombreColeccion } = req.body
    try {
        const coleccion = await Coleccion.create({
            nombreColeccion: nombreColeccion
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            coleccion
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(409).send({
                message: "Ocurrio un error: 409, " + error
            });
        } else {
            console.log("error " + error);
            return res.status(500).send({
                message: "Ocurrio un error" + error
            });
        }
    }
}

const coleccionPut = async (req = request, res) => {
    const { nombreColeccion, idColeccion } = req.body
    try {
        const coleccion = await Coleccion.update({
            nombreColeccion:nombreColeccion
        }, {
            where: {
                idColeccion: idColeccion
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            coleccion
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(409).send({
                message: "Ocurrio un error: 409, " + error
            });
        } else {
            console.log("error " + error);
            return res.status(500).send({
                message: "Ocurrio un error" + error
            });
        }
    }
}

const coleccionDelete = async (req, res) => {
    const { idColeccion } = req.body
    try {
        const libros = await Libro.count({
            where: {
                idColeccion: idColeccion
            }
        });

        let existenLibros = 0;

        if (libros > 0) {
            existenLibros = 1;
        } else {
            const coleccion = await Coleccion.destroy({
                where: {
                    idColeccion: idColeccion
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
    coleccionGet,
    coleccionPost,
    coleccionPut,
    coleccionDelete
}