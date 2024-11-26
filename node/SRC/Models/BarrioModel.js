import { DataTypes } from 'sequelize';
import db from '../config/dbConfig.js';

const BarModel = db.define('Barrio', {
    idBarrio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latMin: { // Latitud mínima
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    latMax: { // Latitud máxima
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lonMin: { // Longitud mínima
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lonMax: { // Longitud máxima
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

export default BarModel;
