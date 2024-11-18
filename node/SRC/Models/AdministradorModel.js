import db from "../config/dbConfig.js";
import { DataTypes }  from "sequelize";

const AdminModel=db.define('Administrador',{
    cedula:{
        type:DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    nombre:{
        type:DataTypes.STRING(20),
        allowNull: false,
    },
    apellido:{
        type:DataTypes.STRING(20),
        allowNull: false,
    },
    telefono:{
        type:DataTypes.STRING(11),
        allowNull: false,
    },
    correo:{
        type:DataTypes.STRING(25),
        allowNull: false,
        unique: true,
    },
    Contraseña:{
        type:DataTypes.STRING(30),
        allowNull: false,
    },
},{
        tableName:'Administrador'
    
});

export default AdminModel;