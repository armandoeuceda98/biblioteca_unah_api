const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const LibroAutor = dbConection.define("libroAutor", {
    idAutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idLibro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LibroAutor;