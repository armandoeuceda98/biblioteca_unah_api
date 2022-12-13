const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Estante = dbConection.define("estante", {
    idEstante: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigoEstante: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoInventario: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Estante;