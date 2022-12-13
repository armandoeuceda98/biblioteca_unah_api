const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const RolUsuario = db.rolUsuario;

const rolUsuarioGet = async (req = request, res = response) => {

    try {
        const rolUsuario = await RolUsuario.findAll({
        });

        return res.status(200).send({
            rolUsuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolUsuarioPost = async (req = request, res) => {
    const { idRol, idUsuario } = req.body
    try {
        const rolUsuario = await RolUsuario.create({
            idRol: idRol,
            idUsuario: idUsuario
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            rolUsuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolUsuarioDelete = async (req, res) => {
    const { id } = req.body
    try {
        const rolUsuario = await RolUsuario.findOne({
            where: {
                id: id
            }   
        });

        rolUsuario.destroy();

        return res.status(200).send({
            message: "Eliminado con éxito.",
            rolUsuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    rolUsuarioGet,
    rolUsuarioPost,
    rolUsuarioDelete
}