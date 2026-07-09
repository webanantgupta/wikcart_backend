const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/vendor-admin-signup', authController.signup);
router.post('/vendor-admin-login', authController.login);
router.post('/google', authController.googleAuth);

module.exports = router;