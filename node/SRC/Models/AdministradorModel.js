import db from "../config/dbConfig.js";
import { DataTypes }  from "sequelize";

const AdminModel=db.define('Administrador',{
    cedula:{type:DataTypes.STRING},
    nombre:{type:DataTypes.STRING},
    apellido:{type:DataTypes.STRING},
    telefono:{type:DataTypes.STRING},
    correo:{type:DataTypes.STRING},
    Contraseña:{type:DataTypes.STRING}
});

export default AdminModel;