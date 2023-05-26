const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    contact: {
      type: String,
      required: [true, "Please add a contact"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TouristGuide",
      required: [true, "Please add a Tourist"],
    },
    touristName: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Please add a Date"],
    },
    minor: {
      type: Array,
    },
    adult: {
      type: Array,
    },
    TourGuide: {
      type: Object,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
