const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const RolPermiso = require('../models/rol_permiso.model');
const Usuario = require('../models/usuario.model');
const Rol = db.rol;

const rolGet = async (req = request, res = response) => {

    try {
        const rol = await Rol.findAll();

        return res.status(200).send({
            rol
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolPost = async (req = request, res) => {
    const { nombreRol } = req.body
    try {
        const rol = await Rol.create({
            nombreRol: nombreRol
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            rol
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolPut = async (req = request, res) => {
    const { idRol, nombreRol} = req.body
    try {
        const rol = await Rol.update({
            nombreRol: nombreRol
        }, {
            where: {
                idRol: idRol
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            rol
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolDelete = async (req, res) => {
    const { idRol } = req.body
    try {
        const usuarios = await Usuario.count({
            where: {
                idRol: idRol
            }
        });

        let existenUsuarios = 0;

        if (usuarios > 0) {
            existenUsuarios = 1;
        } else {
            const rolPermisos = await RolPermiso.destroy({
                where: {
                    idRol: idRol
                }
            });
            const estante = await Rol.destroy({
                where: {
                    idRol: idRol
                }
            });
        }

        return res.status(200).send({
            existenUsuarios
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    rolGet,
    rolPost,
    rolPut,
    rolDelete
}