// import {client} from "pg";

// const connection = new client ({
//     host:"localhost",
//     port:"5432",
//     username:"postgres",
//     password:"2004",
//     database:"Major"
// });

// connection.connect().then(() => {console.log("db Connected ")});
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Major', 'postgres', '2004', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Set to console.log to see raw SQL queries
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connection has been established successfully.');
        
        // "force: false" ensures we don't wipe data on restart. 
        // Set to "true" ONLY if you want to reset tables during testing.
        await sequelize.sync({ force: false }); 
        console.log('✅ Database synced successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

export { sequelize, connectDB };