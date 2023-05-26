const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

//controllers
const userController = require("../controllers/userController");

//account
router.get("/getuser", protect, userController.getUser);
router.get("/getreviews", userController.getAllReview);
router.get("/getaverage", userController.getAverageRating);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/postreview", protect, userController.createReview);

//booking
router.post("/addbook", protect, userController.addBooking);
router.get("/userbooking", protect, userController.getUserBooking);
router.get("/gettouristguide", protect, userController.getAllTouristGuide);

module.exports = router;
