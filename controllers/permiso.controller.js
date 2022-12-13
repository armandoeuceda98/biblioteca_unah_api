const { request, response } = require('express');

const db = require('../models/biblioteca/index');
const RolPermiso = require('../models/rol_permiso.model');
const Permiso = db.permiso;

const permisoGet = async (req = request, res = response) => {

    try {
        const permiso = await Permiso.findAll();

        return res.status(200).send({
            permiso
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const permisoPost = async (req = request, res) => {
    const { nombrePermiso } = req.body
    try {
        const permiso = await Permiso.create({
            nombrePermiso: nombrePermiso
        });

        return res.status(200).send({
            message: "Registrado con éxito.",
            permiso
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const permisoPut = async (req = request, res) => {
    const { idPermiso, nombrePermiso } = req.body
    try {
        const permiso = await Permiso.update({
            nombrePermiso: nombrePermiso
        }, {
            where: {
                idPermiso: idPermiso
            }
        });

        return res.status(200).send({
            message: "Actualizado con éxito.",
            permiso
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

const permisoDelete = async (req, res) => {
    const { idPermiso } = req.body
    try {
        const permisosRol = await RolPermiso.count({
            where: {
                idPermiso: idPermiso
            }
        });
        
        let tieneRol = 0;
        if (permisosRol > 0) {
            tieneRol = 1;
        } else {
            tieneRol = 0;
            const permiso = await Permiso.destroy({
                where: {
                    idPermiso: idPermiso
                }
            });
        }

        return res.status(200).send({
            tieneRol
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

module.exports = {
    permisoGet,
    permisoPost,
    permisoPut,
    permisoDelete
}