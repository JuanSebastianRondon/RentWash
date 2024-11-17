//var mysql = require("mysql");
import {Sequelize} from 'sequelize'

const db = new Sequelize('rentalavadoras','Juanse','12345678',{
    host:'127.0.0.1',
    dialect:'mysql',
    port:'3306'
});

export default db;

//const { Sequelize } = require('sequelize');

/*
const router =express.Router();

router.get('/',function(req,res){
 res.send('Funciona')
});

module.exports=router;
var conexion = mysql.createConnection({
    host:"127.0.0.1",
    database:"rentalavadoras",
    user:"Juanse",
    password:"12345678",
    port:'3306',
    authPlugins: {
        mysql_native_password: () =>
            require('mysql/lib/protocol/auth/mysql_native_password')
    }
});

conexion.connect(function(err){
    if(err){
        throw err;
    }
    else{
        console.log("Conectado a la base de datos");
    }
});
*/
