import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { requestLogger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { auth } from './middlewares/auth.js';
import { connectDB, sequelize } from './datab/db.js';

// Load models so they register with the shared sequelize instance
import './models/model1.js';

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(requestLogger);

// Basic root route
app.get('/', (req, res) => res.send('Backend server is running'));

// Health check
app.get('/api/ping', (req, res) => res.json({ ok: true, now: Date.now() }));

app.get('/api/db-health', async (req, res) => {
  try {
    await sequelize.authenticate();
    const [rows] = await sequelize.query('SELECT 1 AS ok');
    res.json({
      connected: true,
      database: process.env.DB_NAME || 'Major',
      check: rows[0],
    });
  } catch (err) {
    res.status(503).json({ connected: false, error: err.message });
  }
});

// Example protected route
app.get('/api/secure', auth, (req, res) => {
  res.json({ message: 'You reached a protected endpoint' });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: false });
    console.log('✅ Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

start();
