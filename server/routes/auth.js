import { Router } from 'express';
import { register, login, getUserProfile, getUserProfileById, updateUserProfile, uploadProfilePicture } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/user/:userId', getUserProfileById);

// Protected routes
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.post('/profile/picture', auth, uploadSingle, handleUploadError, uploadProfilePicture);

export default router; 