const { request, response } = require('express');
const Audilog = require('../models/audilog.model');

const db = require('../models/biblioteca/index');
const Transaccion = db.transaccion;

const transaccionGet = async (req = request, res = response) => {

    try {
        const transaccion = await Transaccion.findAll();

        return res.status(200).send({
            transaccion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const transaccionPost = async (req = request, res) => {
    const { nombreTransaccion } = req.body
    try {
        const transaccion = await Transaccion.create({
            nombreTransaccion
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            transaccion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const transaccionPut = async (req = request, res) => {
    const { idTransaccion, nombreTransaccion } = req.body
    try {
        const transaccion = await Transaccion.update({
            nombreTransaccion: nombreTransaccion
        }, {
            where: {
                idTransaccion: idTransaccion
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            transaccion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const transaccionDelete = async (req, res) => {
    const { idTransaccion } = req.body
    try {
        const audilog = await Audilog.count({
            where: {
                idTransaccion: idTransaccion
            }
        });

        let existenAudilogs = 0;

        if (audilog > 0) {
            existenAudilogs = 1;
        } else {
            const transaccion = await Transaccion.destroy({
                where: {
                    idTransaccion: idTransaccion
                }
            });
        }

        return res.status(200).send({
            existenAudilogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    transaccionGet,
    transaccionPost,
    transaccionPut,
    transaccionDelete
}