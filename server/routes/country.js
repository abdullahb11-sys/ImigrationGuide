import { Router } from 'express';
import { getCountryComparison } from '../controllers/countryController.js';

const router = Router();

router.get('/compare', getCountryComparison);

export default router; 