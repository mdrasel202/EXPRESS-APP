const express = require('express');
const router = express.Router();
const {
  insertUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.post('/users', insertUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
