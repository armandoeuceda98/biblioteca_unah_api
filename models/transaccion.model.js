const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Transaccion = dbConection.define("transaccion", {
    idTransaccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreTransaccion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Transaccion;