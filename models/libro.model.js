const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Libro = dbConection.define("libro", {
    idLibro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tituloLibro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idColeccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEdicion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ISBN13: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ISBN16: {
        type: DataTypes.STRING
    },
    año: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idIdioma: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Libro;