// server/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser, updateProfile } from '../controllers/userController.js';
import { getProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/users/register - Register a new user
router.post('/register', registerUser);

// POST /api/users/login - Log in an existing user
router.post('/login', loginUser);

// Route for fetching user profile, protected by authentication middleware
router.get('/profile', protect, getProfile);

// Route for updating user profile, protected by authentication middleware
router.put('/profile', protect, updateProfile);

// Logout route
router.post('/logout', logoutUser);

export default router;



