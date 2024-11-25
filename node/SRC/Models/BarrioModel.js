import db from "../config/dbConfig.js";
import { DataTypes }  from "sequelize";

const BarModel=db.define('barrio',{
    idBarrio:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        field: 'idBarrio',
    },
    nombre:{
        type:DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre',
    },
  
},{
        tableName:'usuario',
        timestamps: false,   
});

export default BarModel;