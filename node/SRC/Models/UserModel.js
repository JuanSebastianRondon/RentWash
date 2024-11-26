import db from "../config/dbConfig.js";
import { DataTypes }  from "sequelize";

const ModelUser=db.define('usuario',{
    cedula:{
        type:DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        field: 'cedula',
    },
    nombre:{
        type:DataTypes.STRING(20),
        allowNull: false,
        field: 'nombre',
    },
    apellido:{
        type:DataTypes.STRING(20),
        allowNull: false,
        field: 'apellido',
    },
    telefono:{
        type:DataTypes.STRING(11),
        allowNull: false,
        field: 'telefono',

    },
    correo:{
        type:DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        field: 'correo',
    },
    IdBarrio:{
        type:DataTypes.INTEGER,
        allowNull: false,
        field: 'IdBarrio',
    },
    Contraseña:{
        type:DataTypes.STRING(30),
        allowNull: false,
        field: 'Contraseña',
    },
},{
        tableName:'usuario',
        timestamps: false,   
});

export default ModelUser;