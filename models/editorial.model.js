const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Editorial = dbConection.define("editorial", {
    idEditorial: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreEditorial: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Editorial;