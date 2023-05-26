const express = require("express");
const router = express.Router();

const adminContoller = require("../controllers/adminController");
const { adminProtect } = require("../middlewares/authMiddleware");

//user
router.get("/getadmin", adminProtect, adminContoller.getAdmin);
router.get("/getusers", adminContoller.getUsers);
router.get("/getadmins", adminContoller.getAdmins);
router.get("/gettourguides", adminContoller.getTourGuides);
router.post("/addadmin", adminContoller.addAdmin);
router.post("/adminlogin", adminContoller.adminLogin);
router.post("/addtourist", adminContoller.addTourist);

//booking
router.get("/bookingmonth", adminContoller.monthBooking);
router.get("/bookings", adminContoller.getBookings);
router.get("/countbooking", adminContoller.countBookings);
router.get("/todaybooking", adminContoller.getBookingToday);
router.get("/pending", adminContoller.getPending);
router.get("/approve", adminContoller.getApprove);
router.get("/reject", adminContoller.getReject);
router.put("/editbook/:id", adminContoller.editBooking);

//admin

module.exports = router;
