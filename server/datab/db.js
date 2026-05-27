import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'Major',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '2004',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const connectDB = async () => {
  await sequelize.authenticate();
  console.log('✅ PostgreSQL Connection has been established successfully.');
};

export { sequelize, connectDB };
