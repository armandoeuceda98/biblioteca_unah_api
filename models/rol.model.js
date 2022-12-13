const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Rol = dbConection.define("rol", {
    idRol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreRol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Rol;