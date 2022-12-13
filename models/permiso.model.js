const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Permiso = dbConection.define("permiso", {
    idPermiso: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombrePermiso: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Permiso;