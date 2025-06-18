import express from 'express';
import { getImmigrationNews } from '../controllers/newsController.js';

const router = express.Router();

router.get('/immigration-news', getImmigrationNews);

export default router; 