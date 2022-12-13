const { request, response } = require('express');
const { Sequelize } = require('sequelize');

const db = require('../models/biblioteca/index');
const LibroEjemplar = db.libroEjemplar;
const Libro = db.libro;

const cantidadLibrosBiblioteca = async (req, res) => {
    try {
        const libroEjemplar = await LibroEjemplar.count({
            where: {
                isDeleted: 0
            }
        });
        return res.status(200).send({
            message: "Petición exitosa.",
            cantidadLibrosBiblioteca: libroEjemplar
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const cantidadLibrosColecciones = async (req, res) => {
    try {
        const cantLibroColecciones = await LibroEjemplar.count({
            where: {
                isDeleted: 0
            },
        })

        return res.status(200).json({
            cantLibroColecciones
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const cantidadLibrosColeccionById = async (req, res) => {
    const idColeccion = req.body.idColeccion;
    try {
        const cantLibroColeccion = await LibroEjemplar.count({
            where: {
                isDeleted: 0
            },
            include: {
                model: Libro,
                where: {
                    idColeccion: idColeccion
                }
            },
        })

        return res.status(200).json({
            cantLibroColeccion
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const valorLibrosColeccion = async (req, res) => {
    try {
        const valorLibroColecciones = await LibroEjemplar.findAll({
            where: {
                isDeleted: 0
            },
            attributes: [[Sequelize.fn("SUM", Sequelize.col("valorDolares")), 'valor']],

        })

        if (!valorLibroColecciones[0].dataValues.valor) {
            valorLibroColecciones[0].dataValues.valor = 0;
        }

        return res.status(200).json({
            valor: valorLibroColecciones[0].dataValues.valor
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const valorLibrosColeccionById = async (req, res) => {
    const idColeccion = req.body.idColeccion;
    try {
        const valorLibroColeccion = await LibroEjemplar.findAll({
            where: {
                isDeleted: 0
            },
            attributes: [[Sequelize.fn("SUM", Sequelize.col("valorDolares")), 'valor']],
            include: {
                attributes: [],
                model: Libro,
                where: {
                    idColeccion: idColeccion
                }
            },
        })

        if (!valorLibroColeccion[0].dataValues.valor) {
            valorLibroColeccion[0].dataValues.valor = 0;
        }

        return res.status(200).json({
            valor: valorLibroColeccion[0].dataValues.valor
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const cantidadLibrosEstante = async (req, res) => {
    try {
        let mysql = require('mysql2');
        let connection = mysql.createConnection({
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            port: process.env.DB_PORT,
        });
        let sql = 'CALL SP_GetCantidadEjemplaresEstante()';

        connection.query(sql, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results[0]);
            const resultados = results[0]
            return res.status(200).send({
                message: "Petición exitosa.",
                resultados
            });
        });
        connection.end();

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const cantidadLibrosEstanteById = async (req, res) => {
    const idEstante = req.body.idEstante;
    try {
        const cantLibroEstanteA = await LibroEjemplar.count({
            where: { idEstante: idEstante, ladoEstante: 'A', isDeleted: 0 }
        })

        const cantLibroEstanteB = await LibroEjemplar.count({
            where: { idEstante: idEstante, ladoEstante: 'B', isDeleted: 0 }
        })

        return res.status(200).json({
            cantLibroEstanteA,
            cantLibroEstanteB,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const valorLibrosEstantes = async (req = request, res = response) => {
    const idEstante = req.body.idEstante;

    try {
        const valorLibroEstante = await LibroEjemplar.findAll({
            attributes: [[Sequelize.fn("SUM", Sequelize.col("valorDolares")), 'valor']],
            where: { idEstante: idEstante, ladoEstante: 'A', isDeleted: 0 }
        });

        const valorLibroEstanteB = await LibroEjemplar.findAll({
            attributes: [[Sequelize.fn("SUM", Sequelize.col("valorDolares")), 'valor']],
            where: { idEstante: idEstante, ladoEstante: 'B', isDeleted: 0 }
        });

        if (!valorLibroEstante[0].dataValues.valor) {
            valorLibroEstante[0].dataValues.valor = 0;
        }

        if (!valorLibroEstanteB[0].dataValues.valor) {
            valorLibroEstanteB[0].dataValues.valor = 0;
        }

        total = valorLibroEstante[0].dataValues.valor + valorLibroEstanteB[0].dataValues.valor;

        return res.status(200).json({
            valorA: valorLibroEstante[0].dataValues.valor,
            valorB: valorLibroEstanteB[0].dataValues.valor,
            valorTotal: total
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno"
        })
    }
}

module.exports = {
    cantidadLibrosBiblioteca,
    cantidadLibrosColecciones,
    cantidadLibrosColeccionById,
    valorLibrosColeccion,
    valorLibrosColeccionById,
    cantidadLibrosEstante,
    cantidadLibrosEstanteById,
    valorLibrosEstantes
}