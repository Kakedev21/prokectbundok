import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBooking } from "../features/userSlice";

const UsersBooking = () => {
  const dispatch = useDispatch();

  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    dispatch(getUserBooking());
  }, []);

  const { userBooking } = useSelector((state) => state.user);

  return (
    <div className="mx-auto max-w-md h-screen bg-[#75C184] rounded-md shadow-md p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#E1E1E1]">My Booking</h1>
      {userBooking.length > 0 ? (
        <div className="space-y-4">
          {userBooking.map((booking) => (
            <div key={booking.id} className="bg-white rounded-md shadow-md p-4">
              <p className="font-bold">
                Date of Booking: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 ">
                Date of Enquiring:{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-500">Status: {booking.status}</p>
              <button
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => handleCancelBookingClick(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}

      {showBookingForm && (
        <div className="bg-white rounded-md shadow-md p-4 mt-4">
          <h2 className="text-lg font-bold mb-4">Booking Form</h2>
          {/* TODO: Implement booking form component */}
          <p>The booking form will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default UsersBooking;
