const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const LibroEditorial = dbConection.define("libroEditorial", {
    idLibro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idEditorial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LibroEditorial;