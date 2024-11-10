var mysql = require("mysql");

var conexion = mysql.createConnection({
    host:"127.0.0.1",
    database:"rentalavadoras",
    user:"Proyectos",
    password:"12345678",
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
        console.log("LA HICISTE CAPO");
    }
});

conexion.end();
