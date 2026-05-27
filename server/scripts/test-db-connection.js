import 'dotenv/config';
import { sequelize } from '../datab/db.js';

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection successful.');

    const [info] = await sequelize.query(
      'SELECT current_database() AS database, current_user AS user, version() AS version'
    );
    console.log('Connection info:', info[0]);

    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('Tables:', tables.length ? tables : '(none yet — run server once to sync)');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

run();
