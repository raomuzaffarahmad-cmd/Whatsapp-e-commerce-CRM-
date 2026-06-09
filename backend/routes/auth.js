const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getCurrentUser);
router.put('/update-profile', authenticate, authController.updateProfile);
router.post('/change-password', authenticate, authController.changePassword);
router.post('/refresh-token', authController.refreshToken);

// Admin routes
router.get('/users', authenticate, authorize(['Admin', 'Manager']), authController.getAllUsers);
router.post('/users', authenticate, authorize(['Admin']), authController.createUser);
router.put('/users/:id', authenticate, authorize(['Admin']), authController.updateUser);
router.delete('/users/:id', authenticate, authorize(['Admin']), authController.deleteUser);

module.exports = router;
