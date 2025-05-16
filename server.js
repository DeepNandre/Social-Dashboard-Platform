import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import llmRouter from './src/api/llmService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes - This is critical! Make sure the path matches what frontend expects
app.use('/api', llmRouter);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);
}).on('error', (err) => {
  console.error('Server error:', err);
});
