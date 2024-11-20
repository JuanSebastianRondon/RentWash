import {Sequelize} from 'sequelize'

const db = new Sequelize('rentalavadoras','Juanse','12345678',{
    host:'127.0.0.1',
    dialect:'mysql',
    port:'3306'
});

export default db;

