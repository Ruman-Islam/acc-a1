const express = require('express');
const userInfoController = require('../../controllers/userInfo.controller');
const validator = require('../../middlewares/userValidator');
const router = express.Router();


// GET A RANDOM USER
router.get("/random", userInfoController.getRandomUser);

// GET ALL USER
router.get("/all", userInfoController.getAllUsers);

// ADD NEW USER
router.post("/save", validator.addNewUser, userInfoController.addNewUser);

// UPDATE A USER
router.patch("/update/:id", validator.updateUser, userInfoController.updateUser);

// BULK UPDATE
router.patch("/bulk-update", validator.bulkUpdate, userInfoController.bulkUpdate);

// DELETE A USER
router.delete("/delete/:id", validator.updateUser, userInfoController.deleteUser);


module.exports = router;