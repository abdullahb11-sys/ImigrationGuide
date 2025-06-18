import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import countryRoutes from './routes/country.js';
import jobsEducationRoutes from './routes/jobsEducation.js';
import newsRoutes from './routes/news.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

// Load environment variables
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/jobs-education', jobsEducationRoutes);
app.use('/api/news', newsRoutes);

// MongoDB connection string - use environment variable or fallback to local database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/imi_guide';

// MongoDB connection with error handling
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Only start the server after successful database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if database connection fails
  }); 