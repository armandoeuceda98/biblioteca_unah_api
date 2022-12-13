const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const RolPermiso = dbConection.define("rolPermiso", {
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPermiso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = RolPermiso;