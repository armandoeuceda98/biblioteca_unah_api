const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Autor = dbConection.define("autor", {
    idAutor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreAutor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    claveAutor: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Autor;