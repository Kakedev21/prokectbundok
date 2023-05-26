const express = require("express");
const router = express.Router();

const { touristProtect } = require("../middlewares/authMiddleware");

//controllers
const touristController = require("../controllers/touristController");

//account
router.get(
  "/gettourist",
  touristProtect,
  touristController.getTouristGuideProfile
);
router.get(
  "/gettouristguide",
  touristProtect,
  touristController.getTouristGuide
);
router.get(
  "/gettouristbookings",
  touristProtect,
  touristController.getTouristBookings
);
router.get(
  "/gettourguideclientlist",
  touristProtect,
  touristController.getTourGuideClientList
);
router.get(
  "/touristSchedule",
  touristProtect,
  touristController.getTouristGuideSchedule
);

router.post("/logintourist", touristController.loginTourist);
router.post("/adddate", touristProtect, touristController.addDate);

router.post(
  "/touristprofile",
  touristProtect,
  touristController.createTouristProfile
);

module.exports = router;
