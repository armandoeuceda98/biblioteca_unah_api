const { request, response } = require('express');
const Autor = require('../models/autor.model');
const { Op, where } = require("sequelize");
const { editorial, libroEditorial, libroEjemplar } = require('../models/biblioteca/index');

const db = require('../models/biblioteca/index');
const LibroAutor = require('../models/libro_autor.model');
const Audilog = require('../models/audilog.model');
const Libro = db.libro;
const Idioma = db.idioma;
const Coleccion = db.coleccion;
const Edicion = db.edicion;
const Editorial = db.editorial;
const LibroEditorial = db.libroEditorial;
const LibroEjemplar = db.libroEjemplar;
const Estante = db.estante;

const libroGet = async (req = request, res = response) => {

    try {
        const libro = await Libro.findAll({
            where: {
                isDeleted: false
            },
            include: [
                {
                    model: Edicion
                },
                {
                    model: Idioma
                },
                {
                    model: Coleccion
                },
                {
                    model: Editorial,

                },
                {
                    model: Autor
                }
            ]
        });

        return res.status(200).send({
            libros: libro
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
const datosLibroGet = async (req = request, res = response) => {

    try {
        const edicion = await Edicion.findAll();
        const coleccion = await Coleccion.findAll();
        const idioma = await Idioma.findAll();
        const editorial = await Editorial.findAll();
        const autores = await Autor.findAll();

        return res.status(200).send({
            edicion: edicion,
            coleccion: coleccion,
            idioma: idioma,
            editorial: editorial,
            autores: autores
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroGetId = async (req = request, res = response) => {

    const { idLibro } = req.body
    try {
        const libro = await Libro.find({
            where: {
                isDeleted: false,
                idLibro: idLibro
            },
            include: [
                {
                    model: Edicion
                },
                {
                    model: Idioma
                },
                {
                    model: Coleccion
                },
                {
                    model: Editorial,

                },
                {
                    model: Autor
                }
            ]
        });
        if (!libro) {
            return res.status(404).json({
                msg: "El libro no existe"
            })
        }

        return res.status(200).send({
            libros: libro
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroGetNombre = async (req = request, res = response) => {

    const { tituloLibro } = req.body
    try {
        const libro = await Libro.findAll({
            where: {
                isDeleted: false,
                tituloLibro: {
                    [Op.like]: `%${tituloLibro}%`
                }
            },
            include: [
                {
                    model: Edicion
                },
                {
                    model: Idioma
                },
                {
                    model: Coleccion
                },
                {
                    model: Editorial,

                },
                {
                    model: Autor
                },
                {
                    model: LibroEjemplar,
                    include: [
                        {
                            model: Estante
                        }
                    ]
                }
            ]
        });
        if (libro.length === 0) {
            return res.status(404).json({
                msg: "Lista vacía"
            })
        }
        return res.status(200).send({
            libros: libro
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroGetAutor = async (req = request, res = response) => {

    const { nombreAutor } = req.body
    try {
        const libro = await Libro.findAll({
            include: [
                {
                    model: Edicion
                },
                {
                    model: Idioma
                },
                {
                    model: Coleccion
                },
                {
                    model: Editorial,

                },
                {
                    model: Autor,
                    where: {
                        nombreAutor: {
                            [Op.like]: `%${nombreAutor}%`
                        }
                    }
                },
                {
                    model: LibroEjemplar,
                    include: [
                        {
                            model: Estante
                        }
                    ]
                }
            ]
        });
        if (libro.length === 0) {
            return res.status(404).json({
                msg: "Lista vacía"
            })
        }
        return res.status(200).send({
            libros: libro
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroGetEditorial = async (req = request, res = response) => {

    const { nombreEditorial } = req.body
    try {
        const libro = await Libro.findAll({
            where: {
                isDeleted: false,
            },
            include: [
                {
                    model: Edicion
                },
                {
                    model: Idioma
                },
                {
                    model: Coleccion
                },
                {
                    model: Editorial,
                    where: {
                        nombreEditorial: {
                            [Op.like]: nombreEditorial
                        }
                    }
                },
                {
                    model: Autor,
                }
            ]
        });
        if (!libro) {
            return res.status(404).json({
                msg: "El libro no existe"
            })
        }
        return res.status(200).send({
            libros: libro
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroPost = async (req = request, res) => {
    const uid = req.uid;
    const { tituloLibro, idColeccion, idEdicion, ISBN13, ISBN16, año, idIdioma, idAutores, idEditoriales } = req.body
    try {
        const libro = await Libro.create({
            tituloLibro: tituloLibro,
            idColeccion: idColeccion,
            idEdicion: idEdicion,
            ISBN13: ISBN13,
            ISBN16: ISBN16,
            año: año,
            idIdioma: idIdioma,
        });

        idAutores.forEach(async element => {
            const nuevoLibroAutor = await LibroAutor.create({
                idAutor: element,
                idLibro: libro.idLibro
            });
        });

        idEditoriales.forEach(async element => {
            const nuevoLibroEditorial = await LibroEditorial.create({
                idEditorial: element,
                idLibro: libro.idLibro
            });
        });

        const nuevoAudilog = await Audilog.create({
            descripcion: 'Creación de libro con id: ' + libro.idLibro,
            idUsuario: uid,
            idTransaccion: 1
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            libro,
            nuevoAudilog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroPut = async (req = request, res) => {
    const uid = req.uid;
    const { idLibro, tituloLibro, idColeccion, idEdicion, ISBN13, ISBN16, año, idIdioma, idAutores, idEditoriales } = req.body
    try {
        const libro = await Libro.update({
            tituloLibro: tituloLibro,
            idColeccion: idColeccion,
            idEdicion: idEdicion,
            ISBN13: ISBN13,
            ISBN16: ISBN16,
            año: año,
            idIdioma: idIdioma,
        }, {
            where: {
                idLibro: idLibro
            }
        });

        const autorsDelete = await LibroAutor.destroy({
            where: {
                idLibro: idLibro
            }
        });

        const editorialsDelete = await LibroEditorial.destroy({
            where: {
                idLibro: idLibro
            }
        });

        if (autorsDelete && editorialsDelete) {

            idAutores.forEach(async element => {
                const nuevoLibroAutor = await LibroAutor.create({
                    idAutor: element,
                    idLibro: idLibro
                },
                );
            });

            idEditoriales.forEach(async element => {
                const nuevoLibroEditorial = await LibroEditorial.create({
                    idEditorial: element,
                    idLibro: idLibro
                });
            });

        }

        const nuevoAudilog = await Audilog.create({
            descripcion: 'Actualización de libro con id: ' + idLibro,
            idUsuario: uid,
            idTransaccion: 2
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            libro,
            nuevoAudilog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const libroDelete = async (req, res) => {
    const uid = req.uid;
    const { idLibro } = req.body
    try {
        const libro = await Libro.update({
            isDeleted: 1,
        }, {
            where: {
                idLibro: idLibro
            }
        });

        const libroEjemplar = await LibroEjemplar.update({
            isDeleted: 1,
        }, {
            where: {
                idLibro: idLibro
            }
        });

        const nuevoAudilog = await Audilog.create({
            descripcion: 'Eliminación de libro con id: ' + idLibro + ' y todos sus ejemplares.',
            idUsuario: uid,
            idTransaccion: 3
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            libro,
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
    libroGet,
    libroPost,
    libroPut,
    libroDelete,
    libroGetId,
    datosLibroGet,
    libroGetNombre,
    libroGetAutor,
    libroGetEditorial
}