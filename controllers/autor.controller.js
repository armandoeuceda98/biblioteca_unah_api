const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const LibroAutor = require('../models/libro_autor.model');
const Autor = db.autor;

const autorGet = async (req = request, res = response) => {

    try {
        const autor = await Autor.findAll();
        return res.status(200).send({
            autor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const autorPost = async (req = request, res) => {
    const { nombreAutor, claveAutor } = req.body
    try {
        const autor = await Autor.create({
            nombreAutor: nombreAutor,
            claveAutor: claveAutor
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            autor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const autorPut = async (req = request, res) => {
    const { nombreAutor, claveAutor, idAutor } = req.body
    try {
        const autor = await Autor.update({
            nombreAutor: nombreAutor,
            claveAutor: claveAutor
        }, {
            where: {
                idAutor: idAutor
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            autor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const autorDelete = async (req, res) => {
    const { idAutor } = req.body
    try {
        const librosAutor = await LibroAutor.count({
            where: {
                idAutor: idAutor
            }
        });
        
        let tieneLibros = 0;
        if (librosAutor > 0) {
            tieneLibros = 1;
        } else {
            tieneLibros = 0;
            const autor = await Autor.destroy({
                where: {
                    idAutor: idAutor
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
    autorGet,
    autorPost,
    autorPut,
    autorDelete
}