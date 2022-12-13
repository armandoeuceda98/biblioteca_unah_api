const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const LibroEjemplar = dbConection.define("libroEjemplar", {
    idLibroEjemplar: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idLibro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM({
            values: ['Disponible', 'Prestado']
        })
    },
    codigoBarras: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idEstante: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repisa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ladoEstante: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    asignaturaTopografica: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorDolares: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    valorLempiras: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LibroEjemplar;