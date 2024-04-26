const express = require('express');
const { updatePassword, updateUserDetails } = require('../controllers/userController');

const router = express.Router();

router.route('/:id').patch(updateUserDetails);
router.route('/update-password/:id').patch(updatePassword);



module.exports = router;