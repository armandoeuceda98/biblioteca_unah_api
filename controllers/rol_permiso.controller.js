const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const RolPermiso = db.rolPermiso;

const rolPermisoGet = async (req = request, res = response) => {

    try {
        const rolPermiso = await RolPermiso.findAll({
        });

        return res.status(200).send({
            rolPermiso
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolPermisoPost = async (req = request, res) => {
    const { idRol, idPermiso } = req.body
    try {
        const rolPermiso = await RolPermiso.create({
            idRol: idRol,
            idPermiso: idPermiso
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            rolPermiso
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const rolPermisoDelete = async (req, res) => {
    const { id } = req.body
    try {
        const rolPermiso = await RolPermiso.findOne({
            where: {
                id: id
            }   
        });

        rolPermiso.destroy();

        return res.status(200).send({
            message: "Eliminado con éxito.",
            rolPermiso
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    rolPermisoGet,
    rolPermisoPost,
    rolPermisoDelete
}