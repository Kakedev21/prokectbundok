const mongoose = require("mongoose");

const touristGuideSchema = mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tourist",
    },
    fullName: {
      type: String,
      required: [true, "full name required"],
    },
    contact: {
      type: String,
      required: [true, "contact required"],
    },
    profile: {
      type: String,
      required: [true, "profile required"],
    },
    desc: {
      type: String,
    },
    availability: {
      type: Array,
    },
    isAvailable: {
      type: Boolean,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    clientList: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        contact: {
          type: String,
        },
        date: {
          type: Date,
        },
        isDone: {
          type: String,
          default: "Pending",
        },
        bookingStatus: {
          type: String,
        },
      },
      {
        timestamps: true,
      },
    ],
    newclientCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TouristGuide", touristGuideSchema);
