const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Audilog = dbConection.define("audilog", {
    idAudilog: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idTransaccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Audilog;