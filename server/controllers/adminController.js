const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/Adminmodel");
const Booking = require("../models/Bookingmodel");
const TourGuide = require("../models/TouristGuide.model");
const User = require("../models/Usermodel");
const tourist = require("../models/TouristModel");

//generate jwt
const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const addAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide username and password");
  }

  const existingAdmin = await Admin.findOne({ username });

  if (existingAdmin) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create admin
  const admin = await Admin.create({
    username,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201);
    res.json({
      id: admin._id,
      username: admin.username,
      token: generateJwt(admin._id),
    });
  } else {
    res.status(500);
    throw new Error("Error creating admin please try again");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const admin = await Admin.findOne({ username });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200);
    res.json({
      id: admin._id,
      username: admin.username,
      token: generateJwt(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const { id, username } = req.admin;

  res.status(200).json({
    id,
    username,
  });
});

//bookings
const getBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500);
    throw new Error("error fetching the bookings");
  }
});

const editBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  let returnData = {
    id: null,
    status: "",
  };
  if (booking) {
    returnData.id = booking._id;
    returnData.status = booking.status;
    const tourGuide = await TourGuide.findOne({
      "clientList.user": booking.user,
    });
    if (!tourGuide) {
      res.status(404);
      throw new Error("Tour guide not found");
    }

    const clientIndex = tourGuide.clientList.findIndex(
      (client) => client.user.toString() === booking.user.toString()
    );
    if (clientIndex === -1) {
      res.status(404);
      throw new Error("Client not found");
    }

    tourGuide.clientList[clientIndex].bookingStatus = status;
    await tourGuide.save();
    res.json(returnData);
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

const monthBooking = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  const months = [
    {
      month: "Jan",
      booked: 0,
    },
    {
      month: "Feb",
      booked: 0,
    },
    {
      month: "Mar",
      booked: 0,
    },
    {
      month: "Aprl",
      booked: 0,
    },
    {
      month: "May",
      booked: 0,
    },
    {
      month: "Jun",
      booked: 0,
    },
    {
      month: "Jul",
      booked: 0,
    },
    {
      month: "Aug",
      booked: 0,
    },
    {
      month: "Sept",
      booked: 0,
    },
    {
      month: "Oct",
      booked: 0,
    },
    {
      month: "Nov",
      booked: 0,
    },
    {
      month: "Dec",
      booked: 0,
    },
  ];

  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const date = new Date(booking.createdAt);
    const month = date.getMonth();
    months[month].booked++;
  }

  res.status(200).json(months);
});

const countBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).json(bookings.length);
});

const getBookingToday = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const todayBookings = bookings.filter((booking) => {
    const date = new Date(booking.createdAt);
    const dateDate = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    if (
      dateDate === todayDate &&
      dateMonth === todayMonth &&
      dateYear === todayYear
    ) {
      return booking;
    }
  });

  res.status(200).json(todayBookings.length);
});

const getApprove = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ status: "Approved" });
  res.status(200).json(booking.length);
});

const getReject = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ status: "Rejected" });
  res.status(200).json(booking.length);
});
const getPending = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ status: "Pending" });
  res.status(200).json(booking.length);
});

//get all user newest first
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(users);
});

//get all admin
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: -1 });
  res.status(200).json(admins);
});

//get all tour guide
const getTourGuides = asyncHandler(async (req, res) => {
  const tourGuides = await tourist.find().sort({ createdAt: -1 });
  res.status(200).json(tourGuides);
});

//remove user
const removeUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//remove admin
const removeAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findByIdAndDelete(id);
  if (admin) {
    res.status(200).json({ message: "Admin removed" });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

//remove tour guide
const removeTourGuide = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tourGuide = await tourist.findByIdAndDelete(id);
  if (tourGuide) {
    res.status(200).json({ message: "Tour guide removed" });
  } else {
    res.status(404);
    throw new Error("Tour guide not found");
  }
});

const addTourist = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  //check if username already exists
  const touristExist = await tourist.findOne({ username });
  if (touristExist) {
    res.status(400);
    throw new Error("Username already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create tourist
  const newTourist = await tourist.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newTourist) {
    res.status(201).json({
      _id: tourist._id,
      username: tourist.username,
      email: tourist.email,
      // token: generateToken(tourist._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid tourist data");
  }
});

module.exports = {
  adminLogin,
  getAdmin,
  addAdmin,
  getBookings,
  editBooking,
  monthBooking,
  countBookings,
  getBookingToday,
  getApprove,
  getReject,
  getPending,
  getUsers,
  getAdmins,
  getTourGuides,
  addTourist,
};
