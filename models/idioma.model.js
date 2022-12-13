const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Idioma = dbConection.define("idioma", {
    idIdioma: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreIdioma: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Idioma;