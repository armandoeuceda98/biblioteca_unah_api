const { request, response } = require('express');
const bcrypt = require('bcrypt');

const db = require('../models/biblioteca/index');
const Usuario = db.usuario;

const usuarioGet = async (req = request, res = response) => {

    const usuario = await Usuario.findAll();

    return res.status(200).json({
        usuario
    });
}


const usuarioPut = async (req = request, res) => {
    const { idUsuario, password, idRol   } = req.body
    try {

        const encryptpass = bcrypt.hashSync(password, 8);

        const usuario = await Usuario.update({
            password: encryptpass,
            idRol: idRol
        }, {
            where: {
                idUsuario: idUsuario
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            usuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    usuarioGet,
    usuarioPut,
}

