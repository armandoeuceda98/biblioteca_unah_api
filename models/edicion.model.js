const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Edicion = dbConection.define("edicion", {
    idEdicion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreEdicion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Edicion;