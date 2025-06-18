import { Router } from 'express';
import { register, login, getUserProfile, getUserProfileById, updateUserProfile, uploadProfilePicture } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/user/:userId', getUserProfileById);

// Protected routes
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.post('/profile/picture', auth, upload.single('profilePicture'), uploadProfilePicture);

export default router; 