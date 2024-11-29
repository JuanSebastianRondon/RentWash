import db from "../config/dbConfig.js";
import { DataTypes }  from "sequelize";
//
const ProdModel=db.define('Producto',{
    idProducto:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreProducto:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    precio:{
        type:DataTypes.DOUBLE,
        allowNull: false,
    },
    Disponibilidad:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
    },
    ruta_imagen:{
        type:DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
  
},{
        tableName:'Producto'
});

export default ProdModel;