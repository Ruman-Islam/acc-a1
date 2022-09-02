const express = require('express');
const userInfoController = require('../../controllers/userInfo.controller');
const router = express.Router();


// GET ALL USER
router.get('/all', userInfoController.getAllUsers);

// GET A RANDOM USER
router.get('/random', userInfoController.getRandomUser);


module.exports = router;