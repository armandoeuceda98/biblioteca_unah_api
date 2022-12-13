//No utilizar
const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const RolUsuario = dbConection.define("rolUsuario", {
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = RolUsuario;