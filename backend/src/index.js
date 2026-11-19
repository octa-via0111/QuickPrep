import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import recipeRoutes from './routes/recipeRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import substitutionRoutes from './routes/substitutionRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*', // Allows frontend PWA from any origin in dev / prod
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'QuickPrep API Server is healthy and running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Main API Endpoints
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/substitutions', substitutionRoutes);
app.use('/api/cooking-history', historyRoutes);

// Fallback error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  QuickPrep REST API Server Aktif di Port ${PORT}`);
  console.log(`  http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

export default app;
