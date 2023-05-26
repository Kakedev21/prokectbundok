const asynchandler = require("express-async-handler");
const Tourist = require("../models/TouristModel");
const TouristGuide = require("../models/TouristGuide.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Bookingmodel");

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//login tourist
// POST /api/tourist/login
// Public
const loginTourist = asynchandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const tourist = await Tourist.findOne({ username });

  if (tourist && (await bcrypt.compare(password, tourist.password))) {
    res.json({
      _id: tourist._id,
      username: tourist.username,
      token: generateToken(tourist._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

//create tourist profile
const createTouristProfile = asynchandler(async (req, res) => {
  try {
    const profile = req.body;
    const tourist = await Tourist.findById(req.tourist._id);

    const newProfile = await TouristGuide.create({
      tourist: tourist,
      fullName: profile.fullName,
      contact: profile.contact,
      profile: profile.profile,
      desc: profile.desc,
      availability: profile.availability,
      isAvailable: profile.isAvailable,
      address: profile.address,
      email: profile.email,
    });

    if (newProfile) {
      res.status(201).json(newProfile);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//add new Date
const addDate = asynchandler(async (req, res) => {
  try {
    const profile = await TouristGuide.findOne({ tourist: req.tourist._id });
    if (profile) {
      profile.availability = req.body.selectedDates;
      await profile.save();
      res.status(201).json(profile);
    } else {
      res.status(400);
      throw new Error("Profile not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

//get tourist guide profile
const getTouristGuideProfile = asynchandler(async (req, res) => {
  try {
    const profile = await TouristGuide.findById(req.params.id);
    if (profile) {
      res.status(201).json(profile);
    } else {
      res.status(400);
      throw new Error("Profile not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

//get touristGuide
const getTouristGuide = asynchandler(async (req, res) => {
  try {
    const touristGuide = await TouristGuide.find({ tourist: req.tourist._id });
    if (touristGuide) {
      res.status(201).json(touristGuide);
    } else {
      res.status(400);
      throw new Error("Profile not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

const getTouristBookings = asynchandler(async (req, res) => {
  try {
    const bookings = await Booking.find({ tourist: req.tourist._id });
    if (bookings) {
      res.status(201).json(bookings);
    } else {
      res.status(400);
      throw new Error("Profile not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

//get TourGuide clientList
const getTourGuideClientList = asynchandler(async (req, res) => {
  try {
    const tourist = await TouristGuide.findOne({
      tourist: req.tourist._id,
    });
    if (!tourist) {
      res.status(400);
      throw new Error("Tourist guide not found");
    }
    const clientList = tourist.clientList;
    if (clientList) {
      res.status(200).json(clientList);
    } else {
      res.status(400);
      throw new Error("Client list not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

//get tourist guide schedule
const getTouristGuideSchedule = asynchandler(async (req, res) => {
  try {
    const tourist = await TouristGuide.findOne({
      tourist: req.tourist._id,
    });
    if (!tourist) {
      res.status(400);
      throw new Error("Tourist guide not found");
    }
    const clientList = tourist.availability;
    if (clientList) {
      res.status(200).json(clientList);
    } else {
      res.status(400);
      throw new Error("Client list not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

//update touristGuide profile
const updateTouristGuideProfile = asynchandler(async (req, res) => {
  try {
    const profile = await TouristGuide.findById(req.params.id);
    if (profile) {
      profile.fullName = req.body.fullName || profile.fullName;
      profile.contact = req.body.contact || profile.contact;
      profile.profile = req.body.profile || profile.profile;
      profile.desc = req.body.desc || profile.desc;
      profile.availability = req.body.availability || profile.availability;
      profile.isAvailable = req.body.isAvailable || profile.isAvailable;
      profile.address = req.body.address || profile.address;
      profile.email = req.body.email || profile.email;

      const updatedProfile = await profile.save();
      res.status(201).json(updatedProfile);
    } else {
      res.status(400);
      throw new Error("Profile not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong");
  }
});

module.exports = {
  loginTourist,
  createTouristProfile,
  getTouristGuideProfile,
  getTouristGuide,
  addDate,
  getTouristBookings,
  getTourGuideClientList,
  getTouristGuideSchedule,
};
