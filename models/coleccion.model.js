const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Coleccion = dbConection.define("coleccion", {
    idColeccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreColeccion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Coleccion;
