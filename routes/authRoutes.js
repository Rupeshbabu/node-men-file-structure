const express = require('express');
const { signUp, signIn, forgotPwd, resetPwd } = require('../controllers/authController');
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgot-pwd/:id", forgotPwd);
router.post("/reset-pwd/:id", resetPwd);


module.exports = router;