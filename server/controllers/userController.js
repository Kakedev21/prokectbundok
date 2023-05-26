const User = require("../models/Usermodel");
const Booking = require("../models/Bookingmodel");
const TouristGuide = require("../models/TouristGuide.model");
const Tourist = require("../models/TouristModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Review = require("../models/ReviewModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isBooked: false,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isBooked: newUser.isBooked,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("something went wrong");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      throw new Error("user already exist");
    }
    res.status(400);
    throw new Error("something went wrong please try again");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isBooked: user.isBooked,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { _id, username, isBooked } = req.user;

  if (req.user) {
    res.status(200);
    res.json({
      _id,
      username,
      isBooked,
    });
  }
});

const addBooking = asyncHandler(async (req, res) => {
  const booking = req.body;
  const user = await User.findById(req.user._id);
  const tourist = await TouristGuide.findById(booking.tourGuide);

  const newBooking = new Booking({
    user: req.user._id,
    name: booking.name,
    contact: booking.contact,
    address: booking.address,
    email: booking.email,
    tourist: tourist,
    date: booking.date,
    minor: booking.minor,
    adult: booking.adult,
    touristName: booking.touristName,
    status: "Pending",
  });

  try {
    user.isBooked = true;
    //save the user to TouristGuide clientList
    tourist.clientList.unshift({
      user: req.user._id,
      name: booking.name,
      contact: booking.contact,
      date: booking.date,
      isDone: "Pending",
    });
    tourist.newclientCount = tourist.newclientCount + 1;
    await tourist.save();
    await user.save();
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getUserBooking = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.find({ user: req.user._id });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong please try again");
  }
});

//get touristGuide isAvailable
const getAvailable = asyncHandler(async (req, res) => {
  try {
    const touristGuide = await TouristGuide.find({ isAvailable: true });
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

//get all tourist Guide Profile
const getAllTouristGuide = asyncHandler(async (req, res) => {
  try {
    const touristGuide = await TouristGuide.find();
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

//change password
const changePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const user = await User.findById(req.user._id);

  if (user && (await bcrypt.compare(password, user.password))) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json("Password changed");
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
});

//forgot password
const forgotPassword = asyncHandler(async (req, res) => {});

const createReview = asyncHandler(async (req, res) => {
  try {
    const review = req.body;

    const newReview = new Review({
      user: req.user._id,
      name: req.user.username,
      rating: review.rating,
      images: review.images,
      comment: review.comment,
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(409);
    throw new Error("something went wrong please try again");
  }
});

//get all review
const getAllReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(review);
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong please try again");
  }
});

//get total avergae rating
const getAverageRating = asyncHandler(async (req, res) => {
  try {
    const review = await Review.find();
    const totalRating = review.reduce((acc, item) => acc + item.rating, 0);
    const averageRating = totalRating / review.length;
    res.status(200).json(averageRating);
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong please try again");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  addBooking,
  getUserBooking,
  getAvailable,
  getAllTouristGuide,
  createReview,
  getAllReview,
  getAverageRating,
};
