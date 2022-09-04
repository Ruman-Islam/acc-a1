const express = require('express');
const userInfoController = require('../../controllers/userInfo.controller');
const router = express.Router();


// GET A RANDOM USER
router.get("/random", userInfoController.getRandomUser);

// GET ALL USER
router.get("/all", userInfoController.getAllUsers);

// ADD NEW USER
router.post("/save", userInfoController.addNewUser);

// UPDATE A USER
router.patch("/update/:id", userInfoController.updateUser);

// BULK UPDATE
router.patch("/bulk-update", userInfoController.bulkUpdate);

// DELETE A USER
router.delete("/delete/:id", userInfoController.deleteUser);


module.exports = router;