const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const Libro = require('../models/libro.model');
const Edicion = db.edicion;

const edicionGet = async (req = request, res = response) => {

    try {
        const edicion = await Edicion.findAll();

        return res.status(200).send({
            edicion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const edicionPost = async (req = request, res) => {
    const { nombreEdicion } = req.body
    try {
        const edicion = await Edicion.create({
            nombreEdicion: nombreEdicion
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            edicion
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

const edicionPut = async (req = request, res) => {
    const { nombreEdicion, idEdicion } = req.body
    try {
        const edicion = await Edicion.update({
            nombreEdicion: nombreEdicion
        }, {
            where: {
                idEdicion: idEdicion
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            edicion
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

const edicionDelete = async (req, res) => {
    const { idEdicion } = req.body
    try {
        const libros = await Libro.count({
            where: {
                idEdicion: idEdicion
            }
        });

        let existenLibros = 0;

        if (libros > 0) {
            existenLibros = 1;
        } else {
            const edicion = await Edicion.destroy({
                where: {
                    idEdicion: idEdicion
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
    edicionGet,
    edicionPost,
    edicionPut,
    edicionDelete
}