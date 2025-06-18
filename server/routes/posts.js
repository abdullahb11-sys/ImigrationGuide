import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  getPost, 
  updatePost, 
  deletePost, 
  toggleLike, 
  addComment, 
  deleteComment,
  getUserPosts 
} from '../controllers/postController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/user/:userId', getUserPosts);

// Protected routes
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, toggleLike);
router.post('/:id/comments', auth, addComment);
router.delete('/:id/comments/:commentId', auth, deleteComment);

export default router; 