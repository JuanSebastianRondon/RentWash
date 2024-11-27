import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/dbConfig.js';
import BarModel from './BarrioModel.js';

const ModelUser = db.define('Usuario', {
    cedula: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    IdBarrio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Contraseña: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
}, {

    timestamps: false,
    // Encriptar la contraseña antes de crear o actualizar el usuario
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.Contraseña = await bcrypt.hash(user.Contraseña, salt);
        },
        beforeUpdate: async (user) => {
            if (user.changed('Contraseña')) {
                const salt = await bcrypt.genSalt(10);
                user.Contraseña = await bcrypt.hash(user.Contraseña, salt);
            }
        }
    }
});
ModelUser.belongsTo(BarModel, { foreignKey: 'IdBarrio', targetKey: 'idBarrio' });


export default ModelUser;
